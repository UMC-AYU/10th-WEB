import { THEME, useTheme } from "../../context/ThemeProvider";
import clsx from "clsx";

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  const isLightMode = theme === THEME.LIGHT;
  return (
    <button
      onClick={toggleTheme}
      className={clsx("px-4 py-2 mt-4 rounded-md transition-all", {
        "bg-white text-black": THEME.LIGHT,
        "bg-black text-white": THEME.DARK,
      })}
    >
      {isLightMode ? "🌙 다크 모드" : "🌝 라이트 모드"}
    </button>
  );
};

export default ThemeToggleButton;
