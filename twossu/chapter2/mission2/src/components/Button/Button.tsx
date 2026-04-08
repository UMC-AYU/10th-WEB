import type { ReactNode } from "react";

interface ButtonProps {
  mode: "add" | "complete" | "delete";
  children: ReactNode;
  onClick: () => void;
}

const Button = ({ mode, children, onClick }: ButtonProps) => {
  const baseStyle =
    "w-20 h-12 text-white rounded-xl cursor-pointer hover:opacity-70 transition-opacity duration-200";

  const modeStyles = {
    add: "bg-[#6dc96d]",
    complete: "bg-sky-300",
    delete: "bg-[#fb9797]",
  };

  return (
    <button
      type="button"
      data-mode={mode}
      onClick={onClick}
      className={`${baseStyle} ${modeStyles[mode]}`}
    >
      {children}
    </button>
  );
};

export default Button;
