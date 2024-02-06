import {deleteUser, signOut} from "firebase/auth";
import Navigation from "../navigation";
import {auth, db} from "../services/firebaseConfig";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {BsFillPersonFill} from "react-icons/bs";
import {useNotifications} from "reapop";
import useAuth from "../hooks/useAuth";
import {FC, useState} from "react";
import {
  IoInformationCircleSharp,
  IoLogOut,
  IoRemoveSharp,
} from "react-icons/io5";
import {BsPersonLinesFill} from "react-icons/bs";
import {appConfig} from "../appConfig";
import {PromptModal} from "../components/modals/PromptModal";
import Loading from "../components/Loading";
import {deleteDoc, doc} from "firebase/firestore";

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
      <div className="flex w-full rounded-md p-2 pr-1 pl-3 gap-4 items-center text-zinc-700 dark:text-zinc-200 hover:opacity-90 transition-opacity">
        {icon}
        <div>{name}</div>
      </div>
    </Link>
  );
};

const SettingsOptions: OptionItemProps[] = [
  {
    icon: <IoInformationCircleSharp size={iconSize} />,
    name: "Informacje",
    navigate: "/Information",
    admin: false,
  },
];

const logOutOption = {
  icon: <IoLogOut size={iconSize} />,
  name: "Wyloguj mnie",
  navigate: "./",
  admin: false,
};

const RemoveAccountOption = {
  icon: <IoRemoveSharp size={iconSize} />,
  name: "Usuń konto",
  navigate: "./",
  admin: false,
};

const Settings = () => {
  const navigate = useNavigate();
  const {notify} = useNotifications();
  const {user}: any = useAuth();
  const location = useLocation();
  const [showPromptModal, setShowPromptModal] = useState(false);

  const logOut = async () => {
    await signOut(auth);
    navigate("/");
    notify({
      status: "success",
      title: "Zostałeś wylogowany",
    });
  };

  return (
    <div className="flex flex-col items-center gap-3 h-screen max-h-dvh justify-between w-full bg-white dark:bg-black">
      <div className="flex-col flex items-center justify-center w-full gap-2 mt-10">
        <div className="rounded-full p-8 bg-zinc-200 dark:bg-zinc-950 border-[5px] border-zinc-400 dark:border-zinc-800">
          <BsFillPersonFill size={40} color="white" />
        </div>
        <h2 className="dark:text-white font-semibold">{user?.nick}</h2>
      </div>
      <div className="flex flex-col items-center justify-between w-full pr-4 pl-4 pt-10 flex-grow overflow-auto h-0">
        <div className="flex flex-col gap-2 w-full pl-3 pr-3 overflow-auto h-full">
          <Link to={"/EditUserModal"} state={{previousLocation: location}}>
            <div className="flex w-full rounded-md p-2 pr-1 pl-3 gap-4 items-center text-zinc-700 dark:text-zinc-200 hover:opacity-90 transition-opacity">
              <BsPersonLinesFill size={iconSize} />
              <div>Edytuj profil</div>
            </div>
          </Link>
          {SettingsOptions.map((data, id) => (
            <OptionItem {...data} key={id} />
          ))}
          <div onClick={logOut}>
            <OptionItem {...logOutOption} />
          </div>
          <div onClick={() => setShowPromptModal(true)}>
            <OptionItem {...RemoveAccountOption} />
          </div>
        </div>
        <Link to={"/ReleaseNotes"}>
          <div className="bg-transparent w-full text-green-600/85 text-center text-sm py-2 px-4 hover:border-transparent rounded">
            ScheduleWork v{appConfig.version} - for Prato Verde
          </div>
        </Link>
      </div>

      {showPromptModal && (
        <PromptModal
          text="Czy na pewno chcesz usunąć swoje konto? wszyystkie dane zostaną usunięte."
          title="Zatwierdź"
          setShowPromptModal={setShowPromptModal}
          actions={() => (
            <RemoveAccountActions setShowPromptModal={setShowPromptModal} />
          )}
        />
      )}
      <Navigation type="Settings" />
    </div>
  );
};

export default Settings;

const RemoveAccountActions: FC<{
  setShowPromptModal: (value: boolean) => void;
}> = ({setShowPromptModal}) => {
  const [loading, setLoading] = useState(false);
  const {notify} = useNotifications();
  const {user}: any = useAuth();

  const tryRemoveAccount = () => {
    setLoading(true);
    removeAccount(notify, user.uid);
    setLoading(false);
  };

  if (loading) return <Loading />;

  return (
    <div className="flex items-center gap-3">
      <button
        className="button bg-zinc-700-600 text-white font-bold hover:opacity-80 transition-opacity p-1.5 rounded-md text-sm"
        onClick={() => setShowPromptModal(false)}
      >
        Wyjdź
      </button>
      <button
        className="button bg-red-600 text-white pl-3 pr-3 font-bold hover:opacity-80 transition-opacity p-1.5 rounded-md text-sm"
        onClick={tryRemoveAccount}
      >
        Usuń konto
      </button>
    </div>
  );
};

const removeAccount = (notify: any, userUid: string) => {
  let user = auth.currentUser;

  if (user) {
    deleteUser(user)
      .then(() => {
        notify({
          status: "success",
          title: "Udało się usunąć konto!",
        });
      })
      .then(async () => {
        try {
          await deleteDoc(doc(db, "users", userUid));
          notify({
            status: "success",
            title: "Udało się usunąć dane konta!",
          });
        } catch (error) {
          notify({
            status: "error",
            title: "Coś poszło nie tak!",
          });
        }
      })
      .catch((error) => {
        console.log(error);
        if ((error.code = "auth/requires-recent-login")) {
          notify({
            status: "error",
            title: "Aby usunąć konto, zaloguj się ponownie!",
          });
        } else {
          notify({
            status: "error",
            title: "Coś poszło nie tak, spróbuj ponownie później",
          });
        }
      });
  }
};
