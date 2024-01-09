import {useState} from "react";
import "./../styles/loginStyles.scss";
import {BackButton} from "../components/BackButton";
import logoApp from "../assets/logo.png";
import {BsPersonCheck} from "react-icons/bs";
import {firebaseHandlingErrors, localVerifyLoginData} from "../Utilis/helpers";
import {setUpNotifications, useNotifications} from "reapop";
import {Link, useNavigate} from "react-router-dom";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../services/firebaseConfig";

setUpNotifications({
  defaultProps: {
    position: "bottom-right",
    dismissAfter: 2000,
    dismissible: true,
  },
});

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {notify} = useNotifications();
  const navigate = useNavigate();
  const tryLogin = async () => {
    const {error, status} = localVerifyLoginData(email, password);
    if (status === 200) {
      try {
        const res = await signInWithEmailAndPassword(auth, email, password);
        if (res.user) {
          navigate("/");
          notify({
            message: "Udało się zalogować!",
            status: "success",
            title: "witaj " + email,
          });
        }
      } catch (e: any) {
        firebaseHandlingErrors(notify, e.code);
      }
    } else {
      notify({message: error, status: "error", title: "Błąd logowania"});
    }
  };

  return (
    <div className="login bg-white">
      <BackButton />
      <BsPersonCheck color="var(--baseColor)" size={44} />
      <img alt="logoApp" className="logoApp mt-5" src={logoApp} />
      <h3>Zaloguj się do aplikacji</h3>

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
            fontSize: "15px",
            gap: "5px",
          }}
        >
          Zaloguj się
        </button>

        <p className="footerStart">
          nie masz konta? <Link to={"/Register"}>Zarejestruj się!</Link>
        </p>
      </div>
    </div>
  );
}
