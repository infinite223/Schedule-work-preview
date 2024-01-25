import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {selectedDay} from "../../slices/selectedDaySlice";
import {doc, getDoc, setDoc} from "firebase/firestore";
import {db} from "../../services/firebaseConfig";
import useAuth from "../../hooks/useAuth";
import {shortDayNames} from "../../Utilis/data";
import {useEffect, useState} from "react";
import {useNotifications} from "reapop";
import {selectedGroup} from "../../slices/selectedGroupSlice";
import {setReadsCounter} from "../../slices/readsCounterSlice";

type HoursOption = {
  text: string;
  value: {
    start: string;
    end: string;
  };
};

const hoursOptions = [
  {
    text: "od 12:00 do 22:00",
    value: {start: "12:00", end: "22:00"},
  },
  {
    text: "od 14:00 do 22:00",
    value: {start: "14:00", end: "22:00"},
  },
  {
    text: "od 17:00 do 22:00",
    value: {start: "17:00", end: "22:00"},
  },
];
export const JoinToDay = () => {
  const navigate = useNavigate();
  const {notify} = useNotifications();
  const dispatch = useDispatch();
  const day = useSelector(selectedDay);
  const dayDate =
    day && day?.selectedDay ? new Date(JSON.parse(day?.selectedDay)) : null;
  const group = useSelector(selectedGroup);
  const {user}: any = useAuth();
  const isMyGroup = group.users.find((u: any) => u.uid === user.uid);
  const [selectedOption, setSelectedOption] = useState<HoursOption>(
    hoursOptions[0]
  );

  const joinToDay = async () => {
    if (dayDate && user && isMyGroup) {
      await setDoc(doc(db, "schedule", dayDate.toString()), {
        start: selectedOption.value.start,
        end: selectedOption.value.end,
        userUid: user.uid,
        date: new Date(dayDate),
        groupUid: group.id,
        remove: false,
        createdAt: new Date(),
      });

      dispatch(setReadsCounter(1));
    } else if (!isMyGroup) {
      notify({
        status: "error",
        title: "Nie jesteś przypisany do żadnej grupy",
      });
    }
  };

  useEffect(() => {
    if (!day && !day.selectedDay) {
      notify({
        status: "error",
        title: "Błąd przy wybieraniu dnia",
      });

      navigate("/");
    }
  }, [day]);
  return (
    <div
      className="fixed bg-transparent left-0 top-0 h-dvh w-screen flex flex-col items-center justify-center"
      onClick={(e) => navigate(-1)}
    >
      <div
        className="h-fit w-11/12 sm:w-1/3 gap-2 min-w-3.5 flex flex-col justify-between text-black border border-gray-900 dark:text-white bg-slate-200 dark:bg-gray-950 p-5 rounded-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex gap-5 items-center">
          <div className="border-r-2 border-green-500 p-2 pr-5 flex flex-col">
            <span className="font-bold text-lg">{dayDate?.getDate()}</span>
            <span className="font-light text-sm">
              {shortDayNames[dayDate?.getDay() ? dayDate?.getDay() - 1 : 6]}
            </span>
          </div>

          <h2>Wybierz godziny pracy</h2>
        </div>
        <div className="flex flex-col">
          <p className="text-xs text-gray-400 mb-2">Najczęściej wybierane:</p>
          <div className="flex flex-col gap-1 pb-2 bt-2">
            {hoursOptions.map((option, id) => {
              return (
                <div
                  key={id}
                  onClick={() => setSelectedOption(option)}
                  style={
                    selectedOption === option
                      ? {borderColor: "rgb(34 197 94)"}
                      : {}
                  }
                  className="border-gray-300 dark:border-gray-800 border-b-2 p-1 text-gray-800 cursor-pointer rounded-md hover:border-green-700 dark:text-gray-300"
                >
                  {option.text}
                </div>
              );
            })}
          </div>
        </div>

        <button
          className="button bg-green-700 hover:opacity-80 transition-opacity p-1 rounded-md text-sm"
          onClick={joinToDay}
        >
          Dołącz do tego dnia
        </button>
      </div>
    </div>
  );
};
