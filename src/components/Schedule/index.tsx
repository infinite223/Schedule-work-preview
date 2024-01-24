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
import Loading from "../Loading";
import {useDispatch, useSelector} from "react-redux";
import {setReadsCounter} from "../../slices/readsCounterSlice";
import {selectedGroup} from "../../slices/selectedGroupSlice";

const Schedule = () => {
  const dispatch = useDispatch();
  const group = useSelector(selectedGroup);
  const [scheduleDays, setScheduleDays] = useState<
    {end: string; start: string; userRef: string; date: Timestamp}[]
  >([]);

  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<DateWithUsers>({
    date: new Date(),
    users: [],
  });

  const [selectedMonth, setSelectedMonth] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  );

  useEffect(() => {
    setLoading(true);
    const schedulesRef = collection(db, "schedule");

    const start = new Date(
      selectedMonth.getFullYear(),
      selectedMonth.getMonth(),
      1
    );
    const end = addMonthsToDate(start, 1);

    const scheduleQuery = query(
      schedulesRef,
      where("date", ">", start),
      where("date", "<", end),
      where("groupUid", "==", group.id)
    );

    const unsubscribe = onSnapshot(scheduleQuery, async (snapchot) => {
      console.log("get days from firebase");
      setScheduleDays(
        snapchot.docs.map((doc: any, i) => {
          return doc.data();
        })
      );
      dispatch(setReadsCounter(1));

      setLoading(false);
    });

    if (
      new Date(
        selectedMonth.getFullYear(),
        selectedMonth.getMonth(),
        0
      ).getDate() >= selectedDate.date.getDate()
    ) {
      setSelectedDate({users: selectedDate.users, date: selectedMonth});
    }

    return () => {
      unsubscribe();
    };
  }, [selectedMonth, group]);

  const operationType = scheduleDays.find(
    (day) =>
      formatDateToString(day.date.toDate()) ===
      formatDateToString(selectedDate?.date)
  )
    ? "minus"
    : "plus";

  return (
    <div className="flex flex-col items-center h-dvh justify-between w-ful bg-white dark:bg-black">
      <div className="flex sm:flex-row flex-col w-full sm:flex-ro">
        <div className="flex flex-col sm:w-1/2 items-center w-full pr-4 pl-4 border-b-2 sm:border-b-0 sm:border-r-2 border-gray-400/10 rounded-b-xl pb-2">
          <h1 className="pt-4 pb-3 text-lg pl-2 self-start font-semibold text-gray-500 dark:text-gray-200">
            {group.name}
          </h1>

          <CustomCalendar
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
            data={scheduleDays}
          />
        </div>
        <SelectedDay selectedDate={selectedDate} />
      </div>

      <Navigation type="Schedule" operation={operationType} />
      {loading && <Loading />}
    </div>
  );
};

export default Schedule;
