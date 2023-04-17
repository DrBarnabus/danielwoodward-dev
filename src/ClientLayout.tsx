'use client';

import { useEffect } from 'react';
import { ThemeContext, useTheme } from './hooks';

type Props = {
  children: React.ReactNode;
};

export const ClientLayout = ({ children }: Props) => {
  const [themeState, toggleThemeState, setThemeState] = useTheme();

  useEffect(() => {
    setThemeState('dark');
  }, [setThemeState]);

  return (
    <>
      <ThemeContext.Provider value={{ themeState, toggleThemeState, setThemeState }}>{children}</ThemeContext.Provider>
    </>
  );
};
