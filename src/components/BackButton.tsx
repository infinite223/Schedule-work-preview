import React from "react";
import {IoChevronBackSharp} from "react-icons/io5";
import {useNavigate} from "react-router-dom";
import "../styles/backButtonStyles.scss";
export const BackButton = () => {
  const navigate = useNavigate();

  return (
    <IoChevronBackSharp
      size={20}
      color="black"
      onClick={() => navigate(-1)}
      className="backButton"
    />
  );
};
