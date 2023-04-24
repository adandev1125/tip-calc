import { memo } from "react";

const Button = memo(
  (props: { caption: string; isSelected: boolean; onClick: Function }) => {
    return (
      <button
        className={
          props.isSelected
            ? "bg-buttonActive text-buttonNormal"
            : "bg-buttonNormal text-white"
        }
        onClick={props.onClick.bind(this)}
      >
        {props.caption}
      </button>
    );
  }
);

export default Button;
