import {useState} from "react";
import "./../styles/loginStyles.scss";
import {Link, useNavigate} from "react-router-dom";
import {BackButton} from "../components/BackButton";
import logoApp from "../assets/logo.png";
import {BsPersonAdd} from "react-icons/bs";
import {localVerifyRegisterData} from "../Utilis/helpers";
import {setUpNotifications, useNotifications} from "reapop";

setUpNotifications({
  defaultProps: {
    position: "bottom-right",
    dismissAfter: 2000,
    dismissible: true,
  },
});

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const {notify} = useNotifications();

  const tryRegister = () => {
    const {error, status} = localVerifyRegisterData(email, password);

    if (status === 200) {
    } else {
      notify({message: error, status: "error", title: "Błąd rejestracji"});
    }
  };

  return (
    <div className="login">
      <BackButton />
      <BsPersonAdd color="var(--baseColor)" size={44} />
      <img alt="logoApp" className="logoApp mt-5" src={logoApp} />
      <h3>Zarejestruj się do aplikacji</h3>

      <div className="inputsContainer">
        <input
          placeholder="Podaj email"
          className="basicInput"
          value={email}
          onChange={(text) => setEmail(text.target.value)}
          required
        />
        <input
          placeholder="Podaj hasło"
          className="basicInput"
          value={password}
          onChange={(text) => setPassword(text.target.value)}
          type="password"
          required
        />

        <button
          onClick={tryRegister}
          className="custom-button"
          style={{
            backgroundColor: "var(--baseColor)",
            color: "white",
            fontWeight: "bold",
            boxShadow: "0px 2px 5px var(--baseColor)",
            marginTop: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "15px",
            gap: "5px",
          }}
        >
          Zarejestruj się
        </button>

        <p className="footerStart">
          masz już konto? <Link to={"/Login"}>Zaloguj się!</Link>
        </p>
      </div>
    </div>
  );
}
