import "./Button.css";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  variant: "add" | "complete" | "delete";
}

const Button = ({ variant, text, ...props }: ButtonProps) => {
  const className = `btn btn-${variant}`;

  return (
    <button className={className} {...props}>
      {text}
    </button>
  );
};

export default Button;
