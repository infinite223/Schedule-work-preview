import {useEffect, useState} from "react";
import CustomCalendar from "./CustomCalendar";
import {DateWithUsers, DayData} from "../../Utilis/types";
import Navigation from "../../navigation";
import SelectedDay from "./SelectedDay";
import {
  DocumentData,
  DocumentReference,
  collection,
  deleteDoc,
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
import {setRefreshSelectedDay} from "../../slices/refreshSelectedDaySlice";
import logo from "../../assets/calendar.png";
import useAuth from "../../hooks/useAuth";
import {useNotifications} from "reapop";
import {PromptModal} from "../modals/PromptModal";

const Schedule = () => {
  const dispatch = useDispatch();
  const group = useSelector(selectedGroup);
  const [showPromptModal, setShowPromptModal] = useState(false);
  const [scheduleDays, setScheduleDays] = useState<DayData[]>([]);
  const [scheduleDaysRefs, setScheduleDaysRefs] = useState<
    DocumentReference<DocumentData, DocumentData>[]
  >([]);
  const {user}: any = useAuth();
  const isAdmin = user?.type === "admin";
  const {notify} = useNotifications();
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<DateWithUsers>({
    date: new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
    ),
    users: [],
  });

  const [selectedMonth, setSelectedMonth] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  );

  useEffect(() => {
    if (group && group?.id) {
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
        where("date", ">=", start),
        where("date", "<", end),
        where("groupUid", "==", group.id)
      );

      const unsubscribe = onSnapshot(scheduleQuery, async (snapchot) => {
        setScheduleDays(
          snapchot.docs.map((doc: any, i) => {
            return {...doc.data(), id: doc.id};
          })
        );
        setScheduleDaysRefs(
          snapchot.docs.map((doc, i) => {
            return doc.ref;
          })
        );
        dispatch(setReadsCounter(1));

        setLoading(false);
      });

      dispatch(setRefreshSelectedDay(1));
      return () => {
        unsubscribe();
      };
    }
  }, [selectedMonth, group]);

  const operationType = scheduleDays.find(
    (day) =>
      formatDateToString(day.date.toDate()) ===
        formatDateToString(selectedDate?.date) &&
      !day?.remove &&
      day.userUid === user.uid
  )
    ? "minus"
    : "plus";

  const isBlocked = scheduleDays.find(
    (day) =>
      formatDateToString(day.date.toDate()) ===
        formatDateToString(selectedDate?.date) &&
      day.userUid === user.uid &&
      day.block
  )
    ? true
    : false;

  const tryClearMonth = () => {
    try {
      scheduleDaysRefs.forEach(async (scheduleDayRef) => {
        await deleteDoc(scheduleDayRef);
      });

      notify({
        status: "success",
        title: "Udało się wyczyścić miesiąc.",
      });

      setShowPromptModal(false);
    } catch (error) {
      notify({
        status: "error",
        title: "Coś poszło nie tak, spróbuj później.",
      });
    }
  };

  return (
    <div className="flex flex-col items-center  h-screen max-h-dvh  justify-between w-ful bg-white dark:bg-black">
      <div className="flex sm:flex-row flex-col w-full sm:flex-ro">
        <div className="flex flex-col sm:w-1/2 items-center w-full pr-2 pl-2 border-b-2 sm:border-b-0 sm:border-r-2 border-gray-400/10 rounded-b-xl pb-2">
          <div className="flex items-center justify-between w-full">
            <h1 className="pt-4 pb-3 text-lg pl-2 self-start font-semibold text-zinc-900 dark:text-gray-100">
              {group?.name ? group?.name : "Brak grupy"}
            </h1>
            {isAdmin && (
              <div
                onClick={() => setShowPromptModal(true)}
                className="p-1 pl-3 pr-3 bg-zinc-200 dark:bg-zinc-600 rounded-md text-zinc-700 dark:text-white text-xs cursor-pointer transition-opacity hover:opacity-75"
              >
                Wyczyść miesiąc
              </div>
            )}
            <img src={logo} alt="logo" className="w-[30px] pr-2" />
          </div>
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

      <Navigation
        type="Schedule"
        operation={operationType}
        blocked={isBlocked}
        dayId={selectedDate.users.find((u) => u.userUid === user.uid)?.id}
      />
      {loading && <Loading />}

      {showPromptModal && (
        <PromptModal
          actions={() => (
            <div className="flex items-center gap-3">
              <button
                className="button bg-zinc-700-600 text-zinc-700 dark:text-white font-bold hover:opacity-80 transition-opacity p-1.5 rounded-md text-sm"
                onClick={() => setShowPromptModal(false)}
              >
                Wyjdź
              </button>
              <button
                className="button bg-red-600 text-white pl-3 pr-3 font-bold hover:opacity-80 transition-opacity p-1.5 rounded-md text-sm"
                onClick={tryClearMonth}
              >
                Wyczyść dane
              </button>
            </div>
          )}
          setShowPromptModal={setShowPromptModal}
          text="Czy na pewno chcesz wyczyścić grafik w tym miesiącu?"
          title="Zatwierdź opcje"
        />
      )}
    </div>
  );
};

export default Schedule;
