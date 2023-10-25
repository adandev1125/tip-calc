import NumberInput from "@/components/NumberInput";
import Price from "@/components/Price";
import RateCheck from "@/components/RateCheck";
import { presetTipRates } from "@/constants";
import { faDollar, faUser } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
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

    if (isNaN(bill) || isNaN(peopleNumber) || selectedRate === 0) {
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

    const intValue = parseInt(text);

    setSelectedRate(isNaN(intValue) ? 0 : intValue / 100);
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
    <main className="flex flex-col items-center justify-center p-16 pt-[10vh] space-y-16 h-[100vh]">
      <div className="uppercase text-2xl font-extrabold text-[#446263] tracking-widest">
        Data Links
      </div>

      <div className="container">
        <span className="text-lightText">2023-10-17 Data</span>
        <Link href={"https://drive.google.com/file/d/1NXYYYC0cjvpCoQou7D3bLpVOl-qzm10t/view?usp=drive_link"} target="blank">
          https://drive.google.com/file/d/1NXYYYC0cjvpCoQou7D3bLpVOl-qzm10t/view?usp=drive_link
        </Link>
      </div>
    </main>
  );
}
