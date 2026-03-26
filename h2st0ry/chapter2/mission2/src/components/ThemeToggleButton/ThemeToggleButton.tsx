import { THEME, useTheme } from "../../context/ThemProvider";
import clsx from "clsx";

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  const isLightMode = theme === THEME.LIGHT;
  return (
    <button
      onClick={toggleTheme}
      className={clsx(
        "flex justify-center items-center w-23 px-2 py-1 rounded-md transition-all text-sm whitespace-nowrap",
        {
          "bg-white text-black": !isLightMode,
          "bg-black text-white": isLightMode,
        },
      )}
    >
      {isLightMode ? "🌙 다크 모드" : "🌝 라이트 모드"}
    </button>
  );
};

export default ThemeToggleButton;
