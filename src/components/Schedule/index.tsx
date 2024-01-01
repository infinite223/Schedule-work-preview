import {useEffect, useState} from "react";
import CustomCalendar from "./CustomCalendar";
import {DateWithUsers} from "../../Utilis/types";
import Navigation from "../../navigation";
import SelectedDay from "./SelectedDay";
import {
  Timestamp,
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import {db} from "../../services/firebaseConfig";
import {addMonthsToDate, formatDateToString} from "../../Utilis/functions";
import useAuth from "../../hooks/useAuth";

const Schedule = () => {
  const {user}: any = useAuth();
  const [scheduleDays, setScheduleDays] = useState<
    {users: {nick: string; uid: string; email: string}[]; date: Timestamp}[]
  >([]);
  const [selectedDate, setSelectedDate] = useState<DateWithUsers>({
    date: new Date(),
    users: [],
  });

  useEffect(() => {
    const schedulesRef = collection(db, "schedule");
    let start = new Date(
      `${selectedDate.date.getFullYear()}-${
        selectedDate.date.getMonth() + 1
      }-01`
    );
    let end = addMonthsToDate(start, 1);

    console.log("start", start, "end", end);
    const scheduleQuery = query(
      schedulesRef,
      where("date", ">", start),
      where("date", "<", end)
    );

    const unsubscribe = onSnapshot(scheduleQuery, async (snapchot) => {
      setScheduleDays(
        snapchot.docs.map((doc: any, i) => {
          return doc.data();
        })
      );
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const operationType = scheduleDays.find(
    (day) =>
      formatDateToString(day.date.toDate()) ===
      formatDateToString(selectedDate.date)
  )
    ? "minus"
    : "plus";

  return (
    <div className="flex flex-col items-center h-dvh justify-between w-ful bg-white dark:bg-black">
      <div className="flex flex-col w-full sm:flex-row">
        <div className="flex flex-col  sm:w-1/2 items-center w-full pr-4 pl-4 border-b-2 sm:border-b-0 sm:border-r-2 border-gray-400/10 rounded-b-xl pb-1">
          <h1 className="pt-3 pb-3 pl-2 self-start font-semibold text-gray-500 dark:text-gray-200">
            Kierowcy
          </h1>

          <CustomCalendar
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </div>
        <SelectedDay selectedDate={selectedDate} />
      </div>

      <Navigation type="Schedule" operation={operationType} />
    </div>
  );
};

export default Schedule;
