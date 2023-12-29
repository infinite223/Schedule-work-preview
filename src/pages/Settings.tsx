import {signOut} from "firebase/auth";
import Navigation from "../navigation";
import {auth} from "../services/firebaseConfig";
import {useNavigate} from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();
  const logOut = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center h-dvh justify-between w-full bg-white dark:bg-black">
      <div className="flex flex-col items-center w-full pr-4 pl-4">
        <h1 className="pt-3 pb-3 pl-2 self-start font-semibold text-gray-500 dark:text-gray-200">
          Dodatkowe informacje
        </h1>
      </div>

      <button className="text-white" onClick={logOut}>
        Wyloguj mnie
      </button>
      <Navigation type="Settings" />
    </div>
  );
};

export default Settings;
