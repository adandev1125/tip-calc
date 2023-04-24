/**
 * A Numerical Input component with label in its left side.
 */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, memo, useCallback } from "react";

interface InputProps {
  value?: string;
  icon?: any; // The fixed icon on the left.
  isDouble?: boolean; // Indicates whether to input double or int. Use for validation.
  isError?: boolean; // Indicates whether input has error. Use for display error borders.
  placeholder?: string;
  onChange: Function; // A callback which is called when text is changed successfully.
}

const NumberInput: FC<InputProps> = memo((props: InputProps) => {
  const onChanged = useCallback((event: any) => {
    const text = event.target.value;

    // Initialize RegExp for validating inputs with isDouble flag.
    const validRegExp = props.isDouble ? /^\d+(?:\.\d*)?$/ : /^\d+$/;

    // Checks the input value. If fails, value doesn't change.
    if (text.length > 0 && validRegExp.test(text) === false) {
      return;
    }

    props.onChange(text);
  }, []);

  return (
    <div className="relative flex flex-row items-center">
      <input
        className={
          (props.isError
            ? "border-red-600 focus:border-red-600"
            : "border-inputNormal focus:border-inputNormal") +
          (props.icon === undefined ? "" : " pl-8")
        }
        placeholder={props.placeholder}
        maxLength={30}
        value={props.value}
        onChange={onChanged}
      />
      {props.icon !== undefined && (
        <FontAwesomeIcon
          className="absolute left-2 text-[#a4bcbe]"
          icon={props.icon}
        />
      )}
    </div>
  );
});

NumberInput.defaultProps = {
  placeholder: "",
  isDouble: true,
  isError: false,
};

NumberInput.displayName = 'NumberInput';

export default NumberInput;
