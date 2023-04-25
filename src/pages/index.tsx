import NumberInput from "@/components/NumberInput";
import Price from "@/components/Price";
import RateCheck from "@/components/RateCheck";
import { presetTipRates } from "@/constants";
import { faDollar, faUser } from "@fortawesome/free-solid-svg-icons";
import { useCallback, useEffect, useMemo, useState } from "react";

export default function Home() {
  const [billText, setBillText] = useState("");
  const [peopleNumberText, setPeopleNumberText] = useState("");
  const [customRateText, setCustomRateText] = useState("");
  const [selectedRate, setSelectedRate] = useState(0);
  const [peopleInputError, setPeopleInputError] = useState("");

  const prices = useMemo(() => {
    const bill = parseFloat(billText);
    const peopleNumber = parseFloat(peopleNumberText);

    if (isNaN(bill) || isNaN(peopleNumber)) {
      return {
        tipAmount: 0,
        total: 0,
      };
    }

    const tipAmount = (bill / peopleNumber) * selectedRate;
    return {
      tipAmount,
      total: bill / peopleNumber + tipAmount,
    };
  }, [billText, peopleNumberText, selectedRate]);

  const onBillChanged = useCallback((text: "") => {
    setBillText(text);
  }, []);

  const onTipRateSelected = useCallback((rate: number) => {
    setCustomRateText("");
    setSelectedRate(rate);
  }, []);

  const onCustomRateChanged = useCallback((text: "") => {
    setCustomRateText(text);
    setSelectedRate(parseInt(text) / 100);
  }, []);

  const onNumberOfPeopleChanged = useCallback((text: "") => {
    setPeopleNumberText(text);
  }, []);

  const onReset = useCallback(() => {
    setBillText("");
    setPeopleNumberText("");
    setCustomRateText("");
    setSelectedRate(0);
  }, []);

  useEffect(() => {
    const number = parseInt(peopleNumberText);
    if (number === 0) {
      setPeopleInputError("Can't be zero");
    } else if (number < 0) {
      setPeopleInputError("Must greater than zero");
    } else {
      setPeopleInputError("");
    }
  }, [peopleNumberText]);

  return (
    <main className="flex flex-col items-center justify-center pt-[10vh] space-y-16">
      <div className="uppercase text-2xl font-extrabold text-[#446263] tracking-widest">
        Spli
        <br />
        tter
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 p-6 bg-white shadow-xl rounded-2xl w-full sm:w-[90%] md:w-[80%] lg:w-[60%]">
        <div className="flex flex-col">
          <span className="text-lightText">Bill</span>
          <NumberInput
            value={billText}
            isError={false}
            icon={faDollar}
            onChange={onBillChanged}
            placeholder="0"
          />

          <span className="text-lightText mt-10 mb-2">Select Tip %</span>
          <div className="grid grid-cols-3 gap-2">
            {presetTipRates.map((rate: number) => (
              <RateCheck
                key={rate}
                isSelected={selectedRate === rate}
                caption={rate * 100 + "%"}
                onClick={onTipRateSelected.bind(null, rate)}
              />
            ))}
            <NumberInput
              value={customRateText}
              maxValue={100}
              isDouble={false}
              isError={false}
              onChange={onCustomRateChanged}
              placeholder="Custom"
            />
          </div>

          <div className="mt-10 flex w-full justify-between">
            <span className="text-lightText">Number of People</span>
            <span
              className={
                "text-red-600 transition-all" +
                (peopleInputError.length > 0 ? "opacity-100" : "opacity-0")
              }
            >
              {peopleInputError}
            </span>
          </div>
          <NumberInput
            value={peopleNumberText}
            isDouble={false}
            isError={peopleInputError.length > 0}
            onChange={onNumberOfPeopleChanged}
            icon={faUser}
            placeholder="0"
          />
        </div>

        <div className="flex flex-col w-full h-full bg-[#1b474b] rounded-xl px-8 py-12 justify-between">
          <div>
            <Price caption="Tip Amount" price={prices.tipAmount} />
            <Price caption="Total" price={prices.total} />
          </div>
          <button
            className="w-full bg-buttonActive text-buttonNormal uppercase disabled:opacity-50"
            disabled={prices.tipAmount <= 0 && prices.total <= 0}
            onClick={onReset}
          >
            Reset
          </button>
        </div>
      </div>
    </main>
  );
}
