import React, {FC} from "react";
import {Link, useLocation} from "react-router-dom";

interface NavigateOptionProps {
  name: string;
  type: string;
  icon: JSX.Element;
  style?: React.CSSProperties;
  withShadow?: boolean;
}

export const NavigateOption: FC<NavigateOptionProps> = ({
  icon,
  name,
  type,
  style,
  withShadow,
}) => {
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
        className={`flex flex-col items-center justify-center pr-5 pl-5 hover:opacity-80 transition-opacity ${
          withShadow ? "shadow-md shadow-green-500" : ""
        }`}
        style={style}
      >
        {icon}
      </div>
    </Link>
  );
};
