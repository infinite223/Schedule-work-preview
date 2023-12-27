import React from "react";
import {useNavigate} from "react-router-dom";

export const JoinToDay = () => {
  const navigate = useNavigate();
  return (
    <div
      className="fixed bg-transparent left-0 top-0 h-dvh w-screen flex flex-col items-center justify-center"
      onClick={(e) => navigate(-1)}
    >
      <div
        className="h-1/2 w-2/5 min-w-3.5 bg-slate-200 p-5 rounded-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <h2>JoinToDay</h2>
      </div>
    </div>
  );
};
