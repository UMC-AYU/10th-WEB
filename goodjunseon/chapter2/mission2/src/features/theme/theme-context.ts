import { createContext } from "react";

export enum Theme {
  LIGHT = "LIGHT",
  DARK = "DARK",
}

export interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextValue | undefined>(
  undefined,
);
