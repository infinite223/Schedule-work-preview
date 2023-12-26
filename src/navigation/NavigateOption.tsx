import React, {FC} from "react";
import {useNavigate} from "react-router-dom";
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
  type,
  style,
}) => {
  const navigate = useNavigate();
  return (
    <div
      className="flex flex-col items-center justify-center pr-5 pl-5"
      onClick={() => navigate(type)}
      style={style}
    >
      {icon}
      {/* <div>{name}</div> */}
    </div>
  );
};
