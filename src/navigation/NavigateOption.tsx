import React, {FC} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
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
  const location = useLocation();
  return (
    <Link
      to={type}
      state={
        type === "/JoinToDay" || type === "/RemoveFromDay"
          ? {previousLocation: location}
          : {}
      }
    >
      <div
        className="flex flex-col items-center justify-center pr-5 pl-5"
        style={style}
      >
        {icon}
      </div>
    </Link>
  );
};
