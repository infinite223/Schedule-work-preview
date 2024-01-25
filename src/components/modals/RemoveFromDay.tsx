import React from "react";
import {useNavigate} from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import {useDispatch, useSelector} from "react-redux";
import {selectedDay} from "../../slices/selectedDaySlice";
import {deleteDoc, doc, getDoc, updateDoc, where} from "firebase/firestore";
import {db} from "../../services/firebaseConfig";
import {monthNames} from "../../Utilis/data";
import {useNotifications} from "reapop";

export const RemoveFromDay = () => {
  const navigate = useNavigate();
  const {notify} = useNotifications();
  const dispatch = useDispatch();
  const day = useSelector(selectedDay);
  const dayDate =
    day && day?.selectedDay ? new Date(JSON.parse(day?.selectedDay)) : null;
  const {user}: any = useAuth();

  const removeUserFromDay = async () => {
    if (day && dayDate && user) {
      await updateDoc(doc(db, "schedule", dayDate.toString()), {
        remove: true,
      });

      navigate("/");
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
        {dayDate && (
          <h2>
            Wycofanie obecności z dnia {dayDate?.getDate() + " "}{" "}
            {monthNames[dayDate.getMonth()]}
          </h2>
        )}

        <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
          Twoja obecność po usunięciu będzie widoczna na szaro
        </p>
        <button
          className="button bg-orange-600 text-white font-bold hover:opacity-80 transition-opacity p-1.5 rounded-md text-sm"
          onClick={removeUserFromDay}
        >
          Wycofaj swoją obecność
        </button>
      </div>
    </div>
  );
};
