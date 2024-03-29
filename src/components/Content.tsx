import "./../styles/contentStyles.scss";
import android from "./../assets/android.png";
import {downloadApp} from "../Utilis/downloadApp";
import presentApp from "./../assets/presentApp.png";
import {useNavigate} from "react-router-dom";
import {useNotifications} from "reapop";
import {appConfig} from "../appConfig";

const Content = () => {
  const navigate = useNavigate();
  const {notify} = useNotifications();

  return (
    <div className="content">
      <img alt="presentApp" src={presentApp} className="content__presentApp" />
      <div className="content__description text-black mb-2">
        Aplikacja mobilna do zarządzania harmonogramem pracy pracowników.
        Ułatwiająca zapis pracowników w grafiku pracy. Aplikacja umożliwa
        podział na grupy, szybki podgląd najbliższych dni pracy jak i innych
        wspópracowników.
      </div>

      <div className="buttons-container">
        <button
          onClick={() => navigate("/login")}
          className="custom-button"
          style={{
            backgroundColor: "var(--baseColor)",
            color: "white",
            fontWeight: "bold",
            boxShadow: "0px 2px 5px var(--baseColor)",
            width: "220px",
          }}
        >
          Zaloguj się
        </button>

        <button
          onClick={() => navigate("register")}
          className="custom-button"
          style={{
            backgroundColor: "white",
            color: "black",
            fontWeight: "bold",
            boxShadow: "0px 2px 5px white",
          }}
        >
          Zarejestruj się
        </button>
      </div>

      <div
        className="download-link"
        onClick={() => {
          downloadApp();
          notify({
            dismissAfter: 4000,
            message: "Pobieranie...",
            status: "success",
            title: "Aplikacja mobilna jest w wersji testowej",
          });
        }}
      >
        Pobierz aplikacjie na androida
        <img alt="android" src={android} className="content__button-android" />
      </div>
      <div className="content__version">
        Aktualna wersja: {appConfig.version}
      </div>
    </div>
  );
};

export default Content;
