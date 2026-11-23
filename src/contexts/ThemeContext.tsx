'use client';

import { createContext, useContext, useSyncExternalStore, useCallback, ReactNode } from 'react';
import { flushSync } from 'react-dom';

type Theme = 'dark' | 'light';

interface ThemeToggleOrigin {
  clientX: number;
  clientY: number;
}

interface ThemeContextType {
  theme: Theme;
  toggleTheme: (event?: React.MouseEvent | ThemeToggleOrigin) => void;
}

interface DocumentViewTransition {
  ready: Promise<void>;
  finished: Promise<void>;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  toggleTheme: () => {},
});

const themeListeners = new Set<() => void>();
function notifyThemeListeners() {
  themeListeners.forEach((listener) => listener());
}

function subscribe(callback: () => void) {
  themeListeners.add(callback);
  window.addEventListener('storage', callback);
  return () => {
    themeListeners.delete(callback);
    window.removeEventListener('storage', callback);
  };
}

function getSnapshot(): Theme {
  if (typeof window === 'undefined') return 'dark';
  try {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || saved === 'light') return saved;
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
  } catch {
    // Fallback for restricted storage environments
  }
  return 'dark';
}

function getServerSnapshot(): Theme {
  return 'dark';
}

let transitionTimer: ReturnType<typeof setTimeout> | null = null;

function resolveOrigin(event?: React.MouseEvent | ThemeToggleOrigin): { x: number; y: number } {
  if (typeof window === 'undefined') return { x: 0, y: 0 };

  if (event) {
    const hasCoords =
      typeof event.clientX === 'number' &&
      typeof event.clientY === 'number' &&
      (event.clientX !== 0 || event.clientY !== 0);

    if (hasCoords) {
      return { x: event.clientX, y: event.clientY };
    }

    // Keyboard activation of a button yields (0, 0); radiate from the element center instead
    if ('currentTarget' in event && event.currentTarget instanceof HTMLElement) {
      const rect = event.currentTarget.getBoundingClientRect();
      return {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };
    }
  }

  return {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  };
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const applyTheme = useCallback((newTheme: Theme) => {
    try {
      localStorage.setItem('theme', newTheme);
      document.documentElement.setAttribute('data-theme', newTheme);
    } catch {
      // Storage quota fallback
    }
    notifyThemeListeners();
  }, []);

  const toggleTheme = useCallback(
    (event?: React.MouseEvent | ThemeToggleOrigin) => {
      const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark';

      if (typeof document === 'undefined' || typeof window === 'undefined') {
        applyTheme(nextTheme);
        return;
      }

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const doc = document as Document & {
        startViewTransition?: (updateCallback: () => void) => DocumentViewTransition;
      };

      if (!prefersReducedMotion && typeof doc.startViewTransition === 'function') {
        const { x, y } = resolveOrigin(event);
        const endRadius = Math.hypot(
          Math.max(x, window.innerWidth - x),
          Math.max(y, window.innerHeight - y)
        );

        document.documentElement.classList.add('theme-no-transition');

        try {
          const transition = doc.startViewTransition(() => {
            flushSync(() => {
              applyTheme(nextTheme);
            });
          });

          transition.ready
            .then(() => {
              document.documentElement.animate(
                {
                  clipPath: [
                    `circle(0px at ${x}px ${y}px)`,
                    `circle(${endRadius}px at ${x}px ${y}px)`,
                  ],
                },
                {
                  duration: 450,
                  easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
                  pseudoElement: '::view-transition-new(root)',
                }
              );
            })
            .catch(() => {
              // Ignore aborted transitions
            });

          transition.finished
            .catch(() => {
              // Ignore aborted transitions
            })
            .finally(() => {
              document.documentElement.classList.remove('theme-no-transition');
            });
        } catch {
          document.documentElement.classList.remove('theme-no-transition');
          applyTheme(nextTheme);
        }
      } else if (!prefersReducedMotion) {
        document.documentElement.classList.add('theme-transitioning');
        applyTheme(nextTheme);
        if (transitionTimer) {
          clearTimeout(transitionTimer);
        }
        transitionTimer = setTimeout(() => {
          document.documentElement.classList.remove('theme-transitioning');
          transitionTimer = null;
        }, 400);
      } else {
        applyTheme(nextTheme);
      }
    },
    [theme, applyTheme]
  );

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
