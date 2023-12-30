import React, {FC} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";

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
        className={`flex flex-col items-center justify-center pr-5 pl-5 ${
          withShadow ? "shadow-md shadow-green-300" : ""
        }`}
        style={style}
      >
        {icon}
      </div>
    </Link>
  );
};
