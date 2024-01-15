import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";

const Page404 = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 500);
  }, []);

  return (
    <div className="flex h-dvh items-center justify-center flex-col bg-white dark:bg-black">
      <h2 className="dark:text-white text-black font-bold">
        Taka strona nie istnieje
      </h2>
    </div>
  );
};

export default Page404;
