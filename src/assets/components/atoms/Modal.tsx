import { FC } from "react";
import Button from "./Button";

type TModal = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  title?: string;
  children?: React.ReactNode;
};

const Modal: FC<TModal> = ({
  visible,
  setVisible,
  title = "Modal",
  children,
}) => {
  return (
    visible && (
      <div className="absolute top-0 left-0 z-10 h-full w-full bg-gradient-to-t from-[#0a192f] to-[#0f284e] text-center">
        <div className="grid grid-cols-3 items-center">
          <div />
          <h1 className="text-[#CCD6F6] text-center font-bold text-6xl m-4">
            {title}
          </h1>
          <Button title="Close" onClick={() => setVisible(!visible)} />
        </div>
        {children}
      </div>
    )
  );
};

export default Modal;
