import {signOut} from "firebase/auth";
import Navigation from "../navigation";
import {auth} from "../services/firebaseConfig";
import {Link, useNavigate} from "react-router-dom";
import {BsFillPersonFill} from "react-icons/bs";
import {useNotifications} from "reapop";
import useAuth from "../hooks/useAuth";
import {FC} from "react";
import {FaPeopleCarry} from "react-icons/fa";
import {
  IoInformationCircleSharp,
  IoLogOut,
  IoRemoveSharp,
} from "react-icons/io5";
import {BsPersonLinesFill} from "react-icons/bs";

interface OptionItemProps {
  icon: any;
  name: string;
  navigate: string;
  admin: boolean;
}

const userIsAdmin = true;
const iconSize = 20;
const OptionItem: FC<OptionItemProps> = ({icon, name, navigate, admin}) => {
  if (admin && !userIsAdmin) {
    return <></>;
  }

  return (
    <Link to={navigate}>
      <div className="bg-zinc-900 flex w-full rounded-md p-3 pr-4 pl-4 gap-4 items-center text-zinc-700 dark:text-zinc-200 hover:opacity-90 transition-opacity">
        {icon}
        <div>{name}</div>
      </div>
    </Link>
  );
};

const SettingsOptions: OptionItemProps[] = [
  {
    icon: <BsPersonLinesFill size={iconSize} />,
    name: "Edytuj profil",
    navigate: "./EditProfile",
    admin: false,
  },
  {
    icon: <FaPeopleCarry size={iconSize} />,
    name: "Utwoórz grupe",
    navigate: "./CreateGroup",
    admin: true,
  },
  {
    icon: <IoInformationCircleSharp size={iconSize} />,
    name: "Informacje",
    navigate: "./Information",
    admin: false,
  },
  {
    icon: <IoRemoveSharp size={iconSize} />,
    name: "Usuń konto",
    navigate: "./EditProfile",
    admin: false,
  },
  {
    icon: <IoRemoveSharp size={iconSize} />,
    name: "Usuń konto",
    navigate: "./EditProfile",
    admin: false,
  },
  {
    icon: <IoRemoveSharp size={iconSize} />,
    name: "Usuń konto",
    navigate: "./EditProfile",
    admin: false,
  },
  {
    icon: <IoRemoveSharp size={iconSize} />,
    name: "Usuń konto",
    navigate: "./EditProfile",
    admin: false,
  },
  {
    icon: <IoRemoveSharp size={iconSize} />,
    name: "Usuń konto",
    navigate: "./EditProfile",
    admin: false,
  },
];

const logOutOption = {
  icon: <IoLogOut size={iconSize} />,
  name: "Wyloguj mnie",
  navigate: "./",
  admin: false,
};

const Settings = () => {
  const navigate = useNavigate();
  const {notify} = useNotifications();
  const {user}: any = useAuth();

  const logOut = async () => {
    await signOut(auth);
    navigate("/");
    notify({
      status: "success",
      title: "Zostałeś wylogowany",
    });
  };

  return (
    <div className="flex flex-col items-center h-screen max-h-dvh justify-between w-full bg-white dark:bg-black">
      <div className="relative flex items-center justify-center h-1/4 w-full">
        <div
          className="absolute rounded-full p-8 bg-zinc-800"
          style={{bottom: "-35px"}}
        >
          <BsFillPersonFill size={40} color="white" />
        </div>
      </div>
      <div className="flex flex-col items-center justify-between w-full pr-4 pl-4 pt-10 flex-grow overflow-auto h-0">
        <h2 className="text-white font-semibold">{user?.nick}</h2>
        <div className="flex flex-col gap-2 w-full pl-3 pr-3 overflow-auto h-full">
          {SettingsOptions.map((data) => (
            <OptionItem {...data} />
          ))}
          <div onClick={logOut}>
            <OptionItem {...logOutOption} />
          </div>
        </div>
        <div className="bg-transparent w-full text-green-600/55 text-center text-sm py-2 px-4 hover:border-transparent rounded">
          @ScheduleWork v0.1.0 - for Prato Verde
        </div>
      </div>

      <Navigation type="Settings" />
    </div>
  );
};

export default Settings;
