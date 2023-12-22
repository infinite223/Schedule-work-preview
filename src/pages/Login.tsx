import React, {useState} from "react";
import "./../styles/loginStyles.scss";
import {useNavigate} from "react-router-dom";
import {BackButton} from "../components/BackButton";
import logoApp from "../assets/logo.png";
import {BsPersonCheck} from "react-icons/bs";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const tryLogin = () => {};

  return (
    <div className="login">
      <BackButton />
      <BsPersonCheck color="var(--baseColor)" size={34} />
      <h4>Login</h4>
      <img alt="logoApp" className="logoApp" src={logoApp} />
      <h3>Zaloguj się do aplikacji</h3>

      <div className="inputsContainer">
        <input
          placeholder="Podaj email"
          className="basicInput"
          value={email}
          onChange={(text) => setEmail(text.target.validationMessage)}
        />
        <input
          placeholder="Podaj hasło"
          className="basicInput"
          value={password}
          onChange={(text) => setPassword(text.target.validationMessage)}
        />

        <button
          onClick={tryLogin}
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
            gap: "5px",
          }}
        >
          Zaloguj się
        </button>
      </div>
    </div>
  );
}
