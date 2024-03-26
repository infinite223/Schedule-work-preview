import {IoChevronBackSharp} from "react-icons/io5";
import {useNavigate} from "react-router-dom";
import "../styles/backButtonStyles.scss";
export const BackButton = () => {
  const navigate = useNavigate();

  return (
    <div className="backButton" onClick={() => navigate(-1)}>
      <IoChevronBackSharp size={24} color="black" />
    </div>
  );
};
