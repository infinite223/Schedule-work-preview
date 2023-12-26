import React, {useState} from "react";
import CustomCalendar from "./CustomCalendar";
import {DateWithUsers} from "../../Utilis/types";
import Navigation from "../../navigation";

const Schedule = () => {
  const [selectedDate, setSelectedDate] = useState<DateWithUsers>({
    date: new Date(),
    users: [],
  });

  const operationType = "minus";

  return (
    <div className="flex flex-col items-center h-screen justify-between w-full">
      <div className="flex flex-col items-center w-full pr-4 pl-4">
        <h1 className="pt-5 pb-5 pl-2 text-lg self-start">
          <span className="font-bold uppercase">kierowcy</span>
        </h1>

        <CustomCalendar
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </div>

      <Navigation type="Schedule" operation={operationType} />
    </div>
  );
};

export default Schedule;
