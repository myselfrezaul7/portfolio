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

        if (typeof document !== 'undefined' && 'startViewTransition' in document && typeof (document as unknown as { startViewTransition: unknown }).startViewTransition === 'function') {
            (document as unknown as { startViewTransition: (cb: () => void) => void }).startViewTransition(() => {
                applyTheme(nextTheme);
            });
        } else if (typeof document !== 'undefined') {
            document.documentElement.classList.add('theme-transitioning');
            applyTheme(nextTheme);
            window.setTimeout(() => {
                document.documentElement.classList.remove('theme-transitioning');
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
