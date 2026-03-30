import clsx from "clsx";
import { Theme } from "./theme-context";
import ThemeToggleButton from "./ThemeToggleButton";
import { useTheme } from "./useTheme";

export const Navbar = () => {
  const { theme } = useTheme();
  const isLightMode = theme === Theme.LIGHT;

  return (
    <nav
      className={clsx(
        "p-4 w-full flex justify-end",
        isLightMode ? "bg-white" : "bg-gray-800",
      )}
    >
      <ThemeToggleButton />
    </nav>
  );
};
