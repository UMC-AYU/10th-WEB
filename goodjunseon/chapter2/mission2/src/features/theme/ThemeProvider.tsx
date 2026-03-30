import { useState, type PropsWithChildren } from "react";
import { Theme, ThemeContext } from "./theme-context";

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [theme, setTheme] = useState<Theme>(Theme.LIGHT);

  const toggleTheme = (): void => {
    setTheme(
      (prevTheme): Theme =>
        prevTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT,
    );
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
