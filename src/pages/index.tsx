import Button from "@/components/Button";
import NumberInput from "@/components/NumberInput";
import { useCallback } from "react";

export default function Home() {
  const onBillChanged = useCallback((text: "") => {
    console.log(text);
  }, []);

  return (
    <main className="flex flex-col items-center justify-center w-full h-[100vh] space-y-16">
      <div className="uppercase text-2xl font-extrabold text-[#446263] tracking-widest">
        Spli
        <br />
        tter
      </div>

      <div className="p-6 bg-white shadow-xl rounded-2xl w-[50%]">
        
      </div>
    </main>
  );
}
