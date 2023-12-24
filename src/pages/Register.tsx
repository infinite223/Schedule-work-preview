import React, {useState} from "react";
import "./../styles/loginStyles.scss";
import {useNavigate} from "react-router-dom";
import {BackButton} from "../components/BackButton";
import logoApp from "../assets/logo.png";
import {BsPersonAdd} from "react-icons/bs";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const tryRegister = () => {};
  return (
    <div className="login">
      <BackButton />
      <BsPersonAdd color="var(--baseColor)" size={34} />
      <h4>Rejestracja</h4>
      <img alt="logoApp" className="logoApp" src={logoApp} />
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
          masz już konto? <a href="./Login">Zaloguj się!</a>
        </p>
      </div>
    </div>
  );
}
