type InputProps = {
  label?: string;
  error?: string;
  touched?: Boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

const LoginInput = ({
  label,
  error,
  touched,
  className,
  ...props
}: InputProps) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      <input
        {...props}
        className={`
          bg-neutral-900 border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bf] rounded-sm
          ${className || ""}
        `}
      />

      {error && touched && <div className="text-red-500 text-sm">{error}</div>}
    </div>
  );
};

export default LoginInput;
