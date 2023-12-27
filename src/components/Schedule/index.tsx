import React, {useState} from "react";
import CustomCalendar from "./CustomCalendar";
import {DateWithUsers} from "../../Utilis/types";
import Navigation from "../../navigation";
import SelectedDay from "./SelectedDay";

const Schedule = () => {
  const [selectedDate, setSelectedDate] = useState<DateWithUsers>({
    date: new Date(),
    users: [],
  });

  const operationType = "minus";

  return (
    <div className="flex flex-col items-center h-dvh justify-between w-ful bg-white dark:bg-black">
      <div className="flex flex-col items-center w-full pr-4 pl-4  border-b-2 border-gray-400/10 rounded-b-xl pb-1">
        <h1 className="pt-3 pb-3 pl-2 self-start font-semibold text-gray-500 dark:text-gray-200">
          Kierowcy
        </h1>

        <CustomCalendar
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </div>
      <SelectedDay selectedDate={selectedDate} />

      <Navigation type="Schedule" operation={operationType} />
    </div>
  );
};

export default Schedule;
