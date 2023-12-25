import React, {useState} from "react";
import CustomCalendar from "./CustomCalendar";
import {DateWithUsers} from "../../Utilis/types";

const Schedule = () => {
  const [selectedDate, setSelectedDate] = useState<DateWithUsers>({
    date: new Date(),
    users: [],
  });
  return (
    <div>
      <h1 className="p-5 text-lg">
        Harmonogram <span className="font-bold">kierowcy</span>
      </h1>

      <CustomCalendar
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
    </div>
  );
};

export default Schedule;
