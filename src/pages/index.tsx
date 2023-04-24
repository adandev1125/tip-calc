import RateCheck from "@/components/RateCheck";
import NumberInput from "@/components/NumberInput";
import { useCallback, useState } from "react";
import { presetTipRates } from "@/constants";
import Price from "@/components/Price";

export default function Home() {
  const [selectedRate, setSelectedRate] = useState(0);

  const onBillChanged = useCallback((text: "") => {
    console.log(text);
  }, []);

  const onTipRateClick = useCallback((rate: number) => {
    setSelectedRate(rate);
  }, []);

  const onCustomRateChanged = useCallback((text: "") => {
    setSelectedRate(parseInt(text));
  }, []);

  return (
    <main className="flex flex-col items-center justify-center w-full h-[100vh] space-y-16">
      <div className="uppercase text-2xl font-extrabold text-[#446263] tracking-widest">
        Spli
        <br />
        tter
      </div>

      <div className="grid grid-cols-2 gap-8 p-6 bg-white shadow-xl rounded-2xl w-[50%]">
        <div className="flex flex-col">
          <span className="text-lightText">Bill</span>
          <NumberInput
            isError={false}
            label="$"
            onChange={onBillChanged}
            placeholder="0"
          />

          <span className="text-lightText mt-10 mb-2">Select Tip %</span>
          <div className="grid grid-cols-3 gap-2">
            {presetTipRates.map((rate: number) => (
              <RateCheck
                isSelected={selectedRate === rate}
                caption={rate * 100 + "%"}
                onClick={onTipRateClick.bind(null, rate)}
              />
            ))}
            <NumberInput
              isDouble={false}
              isError={false}
              onChange={onCustomRateChanged}
              placeholder="Custom"
            />
          </div>

          <div className="mt-10 flex w-full justify-between">
            <span className="text-lightText">Number of People</span>
            <span className="text-red-600">Number of People</span>
          </div>
          <NumberInput
            isDouble={false}
            isError={false}
            onChange={onCustomRateChanged}
            label="👨‍⚕️"
            placeholder="0"
          />
        </div>

        <div className="flex flex-col w-full h-full bg-[#1b474b] rounded-xl px-8 py-12 justify-between">
          <div>
            <Price caption="Tip Amount" price={0} />
            <Price caption="Tip Amount" price={0} />
          </div>
          <button className="w-full bg-buttonActive text-buttonNormal uppercase">
            Reset
          </button>
        </div>
      </div>
    </main>
  );
}
