import React, {FC} from "react";
import {JsxElement} from "typescript";

interface NavigateOptionProps {
  name: string;
  type: string;
  icon: JSX.Element;
  style?: React.CSSProperties;
}

export const NavigateOption: FC<NavigateOptionProps> = ({
  icon,
  name,
  style,
}) => {
  return (
    <div
      className="flex flex-col items-center justify-center"
      onClick={() => {}}
      style={style}
    >
      {icon}
      {/* <div>{name}</div> */}
    </div>
  );
};
