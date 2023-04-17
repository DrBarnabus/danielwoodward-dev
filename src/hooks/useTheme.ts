import { type Dispatch, useEffect, useCallback, createContext, useContext } from 'react';
import { useCookie } from './useCookie';
import { useMediaQuery } from './useMediaQuery';

type ThemeState = 'device' | 'light' | 'dark';

type ThemeContextObj = {
  themeState: ThemeState | undefined;
  setThemeState: Dispatch<ThemeState>;
  toggleThemeState: () => void;
};

export const ThemeContext = createContext<ThemeContextObj>({} as ThemeContextObj);

export function useThemeContext() {
  return useContext(ThemeContext);
}

export function useTheme(): [ThemeState, () => void, Dispatch<ThemeState>] {
  const [themeState, updateThemeState] = useCookie<ThemeState>('preferred_theme', 'device', {
    expires: 30,
    secure: true,
    sameSite: 'Lax',
  });

  const prefersColorSchemeDark = useMediaQuery('(prefers-color-scheme: dark)', true);

  useEffect(() => {
    let enabled = false;
    switch (themeState) {
      case 'dark':
        enabled = true;
        break;
      case 'light':
        enabled = false;
        break;
      default:
        enabled = prefersColorSchemeDark;
        break;
    }

    if (typeof window !== 'undefined') {
      window.document.documentElement.classList.toggle('dark', enabled);
    }
  }, [themeState, prefersColorSchemeDark]);

  const toggleThemeState = useCallback(() => {
    if ((themeState === 'device' && prefersColorSchemeDark) || themeState === 'dark') {
      updateThemeState('light');
    } else {
      updateThemeState('dark');
    }
  }, [themeState, updateThemeState, prefersColorSchemeDark]);

  return [themeState, toggleThemeState, updateThemeState];
}
