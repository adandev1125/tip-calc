import { memo } from "react";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
});

const Price = memo((props: { caption: string; price: number }) => (
  <div className="w-full flex flex-row justify-between items-center my-4">
    <span className="text-white">
      <span className="text font-bold">{props.caption}</span>
      <br />
      <span className="opacity-50">/ person</span>
    </span>
    <span className="text-[#5bc2a9] font-bold text-4xl">
      {currencyFormatter.format(props.price)}
    </span>
  </div>
));

Price.displayName = 'Price';

export default Price;
