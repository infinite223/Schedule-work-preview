import {FC, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {selectedGroups} from "../../slices/groupsSlice";
import useAuth from "../../hooks/useAuth";
import {useNavigate} from "react-router-dom";
import {User} from "../../Utilis/types";

interface AssignPersonProps {
  setShowPromptModal: (value: boolean) => void;
}

export const AssignPerson = () => {
  const groups = useSelector(selectedGroups);
  const [users, setUsers] = useState<User[] | null>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const {user}: any = useAuth();
  const isAdmin = user.type === "admin";

  useEffect(() => {
    // get users where groupId is null
    // setLoading(false);
  }, []);

  if (!isAdmin) navigate("/");
  if (!users && !loading) navigate("/");

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
          <h2>Przypisz pracownika do grupy</h2>
          <button
            className="button bg-zinc-700-600 text-white font-bold hover:opacity-80 transition-opacity p-1.5 rounded-md text-sm"
            onClick={() => navigate(-1)}
          >
            Wyjdź
          </button>
        </div>
        <div className="flex flex-col gap-1">
          {users?.map(() => (
            <div></div>
          ))}
        </div>
      </div>
    </div>
  );
};
