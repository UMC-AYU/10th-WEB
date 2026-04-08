interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  variant: "add" | "complete" | "delete" | "theme";
}

const Button = ({ variant, text, className = "", ...props }: ButtonProps) => {
  const baseClassName =
    "cursor-pointer rounded-xl px-4 py-2 text-sm font-bold text-white transition hover:brightness-95";

  const variantClassName = {
    add: "min-w-[100px] bg-emerald-500",
    complete: "min-w-[60px] bg-emerald-500",
    delete: "min-w-[60px] bg-rose-500",
    theme: "min-w-[110px] bg-zinc-800 text-zinc-50",
  }[variant];

  return (
    <button className={`${baseClassName} ${variantClassName} ${className}`} {...props}>
      {text}
    </button>
  );
};

export default Button;
