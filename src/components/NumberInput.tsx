/**
 * A Numerical Input component with label in its left side.
 */

import { memo, useCallback, useState } from "react";

interface InputProps {
  label: string; // The left fixed string.
  isDouble: boolean; // Indicates whether to input double or int. Use for validation.
  isError: boolean; // Indicates whether input has error. Use for display error borders.
  onChange: Function; // A callback which is called when text is changed successfully.
}

const NumberInput = memo((props: InputProps) => {
  const [value, setValue] = useState("");

  const onChanged = useCallback((event: any) => {
    const text = event.target.value;

    // Initialize RegExp for validating inputs with isDouble flag.
    const validRegExp = props.isDouble ? /^\d+(?:\.\d*)?$/ : /^\d+$/;

    // Checks the input value. If fails, value doesn't change.
    if (text.length > 0 && validRegExp.test(text) === false) {
      return;
    }

    setValue(text);
    props.onChange(text);
  }, []);

  return (
    <div className="relative flex flex-row items-center">
      <input
        className={props.isError ? "border-inputError" : "border-inputNormal"}
        maxLength={30}
        value={value}
        onChange={onChanged}
      />
      <span className="absolute left-2 text-gray-300">{props.label}</span>
    </div>
  );
});

export default NumberInput;