'use client';

import { createContext, useContext, useSyncExternalStore, useCallback, ReactNode } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
    theme: 'dark',
    toggleTheme: () => { },
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
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) return 'light';
    } catch {
        // Fallback for restricted storage environments
    }
    return 'dark';
}

function getServerSnapshot(): Theme {
    return 'dark';
}

let transitionTimer: ReturnType<typeof setTimeout> | null = null;

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

    const toggleTheme = useCallback(() => {
        const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark';

        const doc = typeof document !== 'undefined' ? (document as unknown as { startViewTransition?: (updateCallback: () => void) => void }) : null;
        if (doc && typeof doc.startViewTransition === 'function') {
            doc.startViewTransition(() => {
                applyTheme(nextTheme);
            });
        } else if (typeof document !== 'undefined') {
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
    }, [theme, applyTheme]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}
