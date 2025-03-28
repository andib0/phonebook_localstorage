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
      <div className="absolute top-0 left-0 z-10 h-full w-full bg-[#112240] text-center">
        <div className="grid grid-cols-3 items-center align-middle justify-center">
          <div />
          <h1 className="text-[#CCD6F6] text-center font-bold text-4xl m-4">
            {title}
          </h1>
          {/* <h2
            className="px-3 py-1.5 text-sm border-2 border-red-600 text-red-600 rounded hover:scale-105 w-fit h-fit"
            onClick={() => setVisible(!visible)}
          >
            Close
          </h2> */}
          <Button title="Close" onClick={() => setVisible(!visible)} />
        </div>
        {children}
      </div>
    )
  );
};

export default Modal;
