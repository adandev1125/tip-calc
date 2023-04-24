import { memo } from "react";

const Price = memo((props: { caption: string; price: number }) => (
  <div className="w-full flex flex-row justify-between items-center my-4">
    <span className="text-white">
      <span className="text-lg font-bold">{props.caption}</span>
      <br />
      <span className="opacity-50">/ person</span>
    </span>
    <span className="text-[#5bc2a9] font-bold text-4xl">{props.price}</span>
  </div>
));

export default Price;
