import {useNavigate} from "react-router-dom";

import useAuth from "../../hooks/useAuth";
import {motion} from "framer-motion";

export const StartNewUser = () => {
  const navigate = useNavigate();
  const {user}: any = useAuth();

  return (
    <motion.div
      className="fixed bg-white/65 dark:bg-black/65 left-0 top-0 h-dvh w-screen flex flex-col items-center justify-center"
      onClick={(e) => navigate(-1)}
      initial={{opacity: 0}}
      animate={{opacity: 1, transition: {duration: 0.2}}}
      exit={{opacity: 0, transition: {duration: 1.4}}}
    >
      <div
        className="h-fit w-11/12 sm:w-1/3 gap-2 min-w-3.5 flex flex-col justify-between text-black dark:text-white bg-zinc-100 dark:bg-zinc-900 p-5 rounded-md"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-md font-bold mb-1">
          Hej, <span className="text-green-600">{user?.nick}</span>
        </h2>
        <div className="flex flex-col">
          <div className="pb-2 rounded-md">
            Aktualnie jako nowy użytkownik nie jesteś przypisany do żadnej
            grupy, poproś pracodawce lub administratora aplikacji o przypisanie.
          </div>
        </div>

        <button
          className="button bg-green-600 text-white font-bold hover:opacity-80 transition-opacity p-1.5 rounded-md text-sm"
          onClick={(e) => navigate(-1)}
        >
          Okej
        </button>
      </div>
    </motion.div>
  );
};
