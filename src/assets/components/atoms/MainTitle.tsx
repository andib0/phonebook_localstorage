import { FC } from "react";

type TMainTitle = {
  title?: string;
  description?: string;
};

const MainTitle: FC<TMainTitle> = ({
  title = "Main title",
  description = "description",
}) => {
  return (
    <div className="text-center text-[#CCD6F6] text-6xl font-bold m-4">
      {title}
      <p className="text-sm text-[#8892B0] font-bold">{description}</p>
    </div>
  );
};

export default MainTitle;
