import {useEffect, useState} from "react";
import useAuth from "../../hooks/useAuth";
import {useLocation, useNavigate} from "react-router-dom";
import {User} from "../../Utilis/types";
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import {db} from "../../services/firebaseConfig";
import {IoClose} from "react-icons/io5";
import {MdAssignmentAdd} from "react-icons/md";
import {useNotifications} from "reapop";

export const AssignPerson = () => {
  const [users, setUsers] = useState<User[] | null>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const {notify} = useNotifications();
  const location = useLocation();
  const {user}: any = useAuth();
  const isAdmin = user.type === "admin";
  const {groupName, groupId} = location.state.group;

  useEffect(() => {
    const getUsers = async () => {
      const usersRef = collection(db, "users");
      const usersRefeQuery = query(usersRef, where("groupId", "==", false));
      const usersFirebase = await getDocs(usersRefeQuery);
      if (usersFirebase) {
        setUsers(usersFirebase.docs.map((doc: any) => doc.data()));
      }
    };

    getUsers();
  }, []);

  const assignUserToGroup = async (userUid: string) => {
    setLoading(true);
    if (isAdmin) {
      try {
        await updateDoc(doc(db, "users", userUid), {
          groupId,
        });

        await updateDoc(doc(db, "groups", groupId), {
          users: arrayUnion(userUid),
        });

        notify({
          status: "success",
          title: "Pomyślnie przypisano pracownika do grupy",
        });

        navigate(-1);
      } catch (error) {
        notify({
          status: "error",
          title: "Nie udało się dodać pracownika",
        });
      }
    }
    setLoading(false);
  };

  if (!isAdmin) navigate("/");
  if (users?.length === 0 && !loading) {
    navigate("/");
    notify({
      status: "error",
      title: "Brak pracowników do przypisania",
    });
  }

  return (
    <div
      className="fixed bg-white/65 dark:bg-black/65 left-0 top-0 h-dvh w-screen flex flex-col items-center justify-center"
      onClick={(e) => navigate(-1)}
    >
      <div
        className="h-fit w-11/12 sm:w-1/3 gap-2 min-w-3.5 flex flex-col justify-between text-black dark:text-white bg-zinc-100 dark:bg-zinc-900 p-5 rounded-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex w-full items-center justify-between">
          <h2>Przypisz pracownika do grupy {groupName}</h2>
          <button
            className="button bg-zinc-700-600 text-white font-bold hover:opacity-80 transition-opacity rounded-md text-sm"
            onClick={() => navigate(-1)}
          >
            <IoClose size={20} />
          </button>
        </div>
        <div className="flex flex-col gap-1 pt-2 pb-2 text-black dark:text-white">
          {users?.length === 0 ? (
            <h2 className="text-red-500 text-sm">Brak nieprzypisanych osób</h2>
          ) : (
            <h2 className="mb-1 text-sm">Nieprzypisani pracownicy:</h2>
          )}
          {users?.map((_user) => (
            <div className="flex items-center justify-between bg-zinc-100 dark:bg-zinc-800 rounded-md p-2 pr-3 pl-3 hover:opacity-55 cursor-pointer transition-opacity">
              <div className="flex flex-col">
                <h2>{_user.nick}</h2>
                <p className="text-sm text-zinc-800 dark:text-zinc-300">
                  {_user.email}
                </p>
              </div>

              <div className="p-1" onClick={() => assignUserToGroup(_user.uid)}>
                <MdAssignmentAdd className="text-green-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
