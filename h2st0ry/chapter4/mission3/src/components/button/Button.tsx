type ButtonProps = {
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={`
        w-full bg-lime-800 text-white py-3 rounded-md text-lg font-medium
        hover:bg-lime-900 transition-colors cursor-pointer
        disabled:bg-neutral-900 disabled:text-neutral-600
        ${className || ""}
      `}
    >
      {children}
    </button>
  );
};

export default Button;