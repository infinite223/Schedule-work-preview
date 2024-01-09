import React from "react";
import {useNavigate} from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import {useSelector} from "react-redux";
import {selectedDay} from "../../slices/selectedDaySlice";
import {deleteDoc, doc, getDoc, where} from "firebase/firestore";
import {db} from "../../services/firebaseConfig";
import {monthNames} from "../../Utilis/data";

export const RemoveFromDay = () => {
  const navigate = useNavigate();
  const day = useSelector(selectedDay);
  const dayDate = day ? JSON.parse(day?.selectedDay) : null;
  const convertedDayDate = new Date(dayDate);
  const {user}: any = useAuth();

  const removeUserFromDay = async () => {
    // const docRef = doc(db, "schedule")
    // if (dayDate) {
    //   const getUser = await getDoc(doc(db, "users", user.uid));
    //   await deleteDoc(doc(db, "schedule", ));
    // }
  };
  return (
    <div
      className="fixed bg-transparent left-0 top-0 h-dvh w-screen flex flex-col items-center justify-center"
      onClick={(e) => navigate(-1)}
    >
      <div
        className="h-fit w-11/12 sm:w-1/3 gap-2 min-w-3.5 flex flex-col justify-between text-black border border-gray-900 dark:text-white bg-slate-200 dark:bg-gray-950 p-5 rounded-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <h2>
          Wycofanie obecności z dnia {convertedDayDate?.getDate() + " "}{" "}
          {monthNames[convertedDayDate.getMonth()]}
        </h2>

        <p className="text-gray-700 dark:text-gray-300 text-sm">
          Twoja obecność po usunięciu będzie widoczna na szaro
        </p>
        <button
          className="button bg-orange-700 hover:bg-orange-600 p-1 rounded-md text-sm"
          onClick={removeUserFromDay}
        >
          Wycofaj swoją obecność
        </button>
      </div>
    </div>
  );
};
