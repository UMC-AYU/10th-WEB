import clsx from "clsx";
import { Theme } from "./theme-context";
import { useTheme } from "./useTheme";

export default function ThemeContent() {
  const { theme } = useTheme();

  const isLightMode = theme === Theme.LIGHT;

  return (
    <div
      className={clsx(
        "p-4 h-dvh w-full",
        isLightMode ? "bg-white" : "bg-gray-800",
      )}
    >
      <h1
        className={clsx(
          "text-xl font-bold",
          isLightMode ? "text-black" : "text-white",
        )}
      >
        Theme Content
      </h1>
      <p className={clsx("mt-2", isLightMode ? "text-black" : "text-white")}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel
        sapien nec ipsum efficitur tincidunt. Sed at nunc a enim efficitur
        commodo. Nulla facilisi. Curabitur ac ligula a odio efficitur convallis.
        Donec consectetur, nisl in bibendum commodo, sapien justo cursus urna,
        ut blandit turpis nulla vel quam.
      </p>
    </div>
  );
}
