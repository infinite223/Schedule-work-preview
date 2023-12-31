import {signOut} from "firebase/auth";
import Navigation from "../navigation";
import {auth} from "../services/firebaseConfig";
import {useNavigate} from "react-router-dom";
import {BsFillPersonFill} from "react-icons/bs";
import {useNotifications} from "reapop";

const Settings = () => {
  const navigate = useNavigate();
  const {notify} = useNotifications();

  const logOut = async () => {
    await signOut(auth);
    navigate("/");
    notify({
      status: "success",
      title: "Zostałeś wylogowany",
    });
  };

  return (
    <div className="flex flex-col items-center h-dvh justify-between w-full bg-white dark:bg-black">
      <div className="relative flex items-center justify-center h-1/4 w-full bg-green-700/85">
        <div
          className="absolute rounded-full p-8 bg-green-700"
          style={{bottom: "-35px"}}
        >
          <BsFillPersonFill size={50} color="white" />
        </div>
      </div>
      <div className="flex flex-col items-center justify-between h-full w-full pr-4 pl-4">
        <div className="options"></div>
        <button
          onClick={logOut}
          className="bg-transparent w-full text-sm text-red-700 font-semibold hover:text-white py-2 px-4 hover:border-transparent rounded"
        >
          Wyloguj mnie
        </button>
      </div>

      <Navigation type="Settings" />
    </div>
  );
};

export default Settings;
