import type { ButtonProps } from "../../types/todo";

const Button = ({ label, variant, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`render-container__item-button render-container__item-button--${variant}`}
    >
      {label}
    </button>
  );
};

export default Button;
