import type { ReactNode } from "react";
import "./Button.css";

interface ButtonProps {
  mode: "add" | "complete" | "delete";
  children: ReactNode;
  onClick: () => void;
}

const Button = ({ mode, children, onClick }: ButtonProps) => {
  const btn = `btn-${mode}`;

  return (
    <button
      type="button"
      data-mode={mode}
      onClick={onClick}
      className={`btn-base ${btn}`}
    >
      {children}
    </button>
  );
};

export default Button;
