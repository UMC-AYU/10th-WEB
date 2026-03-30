import clsx from "clsx";
import { Theme } from "./theme-context";
import { useTheme } from "./useTheme";

export default function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();

  const isLightMode = theme === Theme.LIGHT;

  return (
    <button
      onClick={toggleTheme}
      className={clsx("px-4 py-2 mt-4 rounded-md transition-all", {
        "bg-black text-gray-200": !isLightMode,
        "bg-white text-gray-800": isLightMode,
      })}
    >
      {isLightMode ? "🌙 다크 모드" : "☀️ 라이트 모드"}
    </button>
  );
}
