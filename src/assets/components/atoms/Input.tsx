import { FC, forwardRef, InputHTMLAttributes } from "react";

type InputProps = {
  id: string;
  label: string;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const Input: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
  ({ id, label, error, className, ...props }, ref) => {
    return (
      <div>
        <label htmlFor={id} className="block font-bold text-[#CCD6F6] text-sm">
          {label}
        </label>
        <input
          id={id}
          ref={ref}
          className={`w-full px-3 py-2 min-w-64 border rounded bg-[#CCD6F6] ${
            error ? "border-red-500" : "border-gray-300"
          } focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            className || ""
          }`}
          {...props}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    );
  }
);

export default Input;
