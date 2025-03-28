import { FC } from "react";

type TButtons = {
  title?: string;
  onClick?: () => void;
  type?: "submit" | "button";
};

const Button: FC<TButtons> = ({ title = "Button", onClick, type }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="border h-fit w-fit border-[#64FFDA] text-[#64FFDA] hover:bg-[#64FFDA] hover:text-[#0a192f] transition-colors duration-200 rounded-lg px-4 py-2 text-sm font-medium"
    >
      {title}
    </button>
  );
};

export default Button;
