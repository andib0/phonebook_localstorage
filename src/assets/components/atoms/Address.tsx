import { FC } from "react";

type TAddress = {
  address?: string;
  city?: string;
  country?: string;
};

const Address: FC<TAddress> = ({ address, city, country }) => {
  return (
    <p className="text-[#8892B0]">
      <span className="text-[#CCD6F6] font-medium">Address:</span> {address},{" "}
      {city}, {country}
    </p>
  );
};

export default Address;
