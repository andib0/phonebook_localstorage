import { FC } from "react";

type TDescriptionList = {
  title?: string;
  list?: string[];
};

const DescriptionList: FC<TDescriptionList> = ({
  title = "title",
  list = [],
}) => {
  return (
    <p className="text-[#8892B0]">
      <span className="text-[#CCD6F6] font-medium">{title}(s):</span>
      <ul className="list-disc list-inside">
        {list.map((e, i) => (
          <li key={i}>{e}</li>
        ))}
      </ul>
    </p>
  );
};

export default DescriptionList;
