import { createContext, useState, useContext, useEffect } from "react";
import type { ReactNode } from "react";

export enum THEME {
  LIGHT = "LIGHT",
  DARK = "DARK",
}

type TTheme = THEME.LIGHT | THEME.DARK;

interface IThemeContext {
  theme: TTheme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<IThemeContext | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<TTheme>(THEME.LIGHT);

  useEffect(() => {
    if (theme === THEME.DARK) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = (): void => {
    setTheme(
      (prevTheme): THEME =>
        prevTheme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT,
    );
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context)
    throw new Error("useTheme은 ThemeProvider 내부에서 사용해야 합니다.");
  return context;
};
