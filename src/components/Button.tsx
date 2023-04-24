import { memo } from "react";

const Button = memo((props: { caption: string; onClick: Function }) => {
  return (
    <button
      className="rounded-md bg-buttonNormal active:bg-buttonActive text-lg text-white active:text-buttonNormal py-2 px-8 transition-all"
      onClick={props.onClick.bind(this)}
    >
      {props.caption}
    </button>
  );
});

export default Button;
