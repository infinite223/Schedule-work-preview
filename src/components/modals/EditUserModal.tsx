import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {doc, setDoc, updateDoc} from "firebase/firestore";
import {db} from "../../services/firebaseConfig";
import useAuth from "../../hooks/useAuth";
import {useState} from "react";
import {useNotifications} from "reapop";
import {setReadsCounter} from "../../slices/readsCounterSlice";

export const EditUserModal = () => {
  const navigate = useNavigate();
  const {notify} = useNotifications();
  const {user}: any = useAuth();
  const [nick, setNick] = useState(user.nick);
  const dispatch = useDispatch();

  const editUser = async () => {
    if (user) {
      try {
        await updateDoc(doc(db, "users", user.uid), {
          nick,
        });

        notify({
          status: "success",
          title: "Udało się zaaktualizować dane profilu.",
        });
        navigate("/");
        window.location.reload();
      } catch (error) {
        notify({
          status: "error",
          title: "Coś poszło nie tak, spróbuj od nowa załadować aplikacje",
        });
      }

      dispatch(setReadsCounter(1));
    } else {
      notify({
        status: "error",
        title: "Coś poszło nie tak, spróbuj później",
      });
    }
  };

  return (
    <div
      className="fixed bg-white/65 dark:bg-black/65 left-0 top-0 h-dvh w-screen flex flex-col items-center justify-center"
      onClick={(e) => navigate(-1)}
    >
      <div
        className="h-fit w-11/12 sm:w-1/3 gap-2 min-w-3.5 flex flex-col justify-between text-black dark:text-white bg-zinc-100 dark:bg-zinc-900 p-5 rounded-md"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-md font-bold mb-1 mt-1">Aktualizuj dane profilu</h2>
        <div className="flex flex-col">
          <p className="text-zinc-600 dark:text-zinc-300 text-sm mb-2">
            Twój nick w aplikacji
          </p>
          <input
            className="bg-zinc-100 dark:bg-zinc-800 border-none outline-none shadow-none pl-4 pt-2 pb-2 mb-1 rounded-md"
            placeholder="Podaj swój nick"
            value={nick}
            onChange={(text) => setNick(text.target.value)}
            type="text"
          />
        </div>

        <button
          className="button bg-green-600 text-white font-bold hover:opacity-80 transition-opacity p-1.5 rounded-md text-sm"
          onClick={editUser}
        >
          Aktualizuj
        </button>
      </div>
    </div>
  );
};
