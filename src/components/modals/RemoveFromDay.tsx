import React from "react";
import {useNavigate} from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import {useSelector} from "react-redux";
import {selectedDay} from "../../slices/selectedDaySlice";

export const RemoveFromDay = () => {
  const navigate = useNavigate();
  const day = useSelector(selectedDay);
  const dayDate = day ? JSON.parse(day?.selectedDay) : null;
  const {user}: any = useAuth();

  return (
    <div
      className="fixed bg-transparent left-0 top-0 h-dvh w-screen flex flex-col items-center justify-center"
      onClick={(e) => navigate(-1)}
    >
      <div
        className="h-fit w-11/12 sm:w-1/3 gap-2 min-w-3.5 flex flex-col justify-between text-black border border-gray-900 dark:text-white bg-slate-200 dark:bg-gray-950 p-5 rounded-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <h2>RemoveFromDay</h2>
      </div>
    </div>
  );
};
