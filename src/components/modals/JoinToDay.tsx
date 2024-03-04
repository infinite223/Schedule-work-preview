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
import {formatDateToString} from "../../Utilis/functions";
import DateTime from "react-datetime";
import "react-datetime/css/react-datetime.css";

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
  const isMyGroup = group?.users?.find((u: any) => u.uid === user.uid);
  const [selectedOption, setSelectedOption] = useState<HoursOption>(
    hoursOptions[0]
  );

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleStartTimeChange = (e: any) => {
    setSelectedOption({text: "", value: {end: "", start: ""}});
    setStartTime(e.target.value);
  };

  const handleEndTimeChange = (e: any) => {
    setEndTime(e.target.value);
  };

  const joinToDay = async () => {
    if (compareTimes()) {
      if (dayDate && user && isMyGroup) {
        try {
          await setDoc(doc(db, "schedule", dayDate.toString() + user.uid), {
            start: startTime,
            end: endTime,
            userUid: user.uid,
            date: new Date(dayDate),
            groupUid: group.id,
            remove: false,
            createdAt: new Date(),
            block: false,
          });
          navigate("/");

          notify({
            status: "success",
            title:
              "Dodano Cię do dnia " + formatDateToString(new Date(dayDate)),
          });
        } catch (error) {
          notify({
            status: "error",
            title: "Coś poszło nie tak, spróbuj od nowa załadować aplikacje",
          });
        }

        dispatch(setReadsCounter(1));
      } else if (!isMyGroup) {
        notify({
          status: "error",
          title: "Nie jesteś przypisany do żadnej grupy",
        });
      }
    }
  };

  const compareTimes = () => {
    const startTimeParts = startTime.split(":");
    const endTimeParts = endTime.split(":");

    const startHour = parseInt(startTimeParts[0], 10);
    const startMinute = parseInt(startTimeParts[1], 10);
    const endHour = parseInt(endTimeParts[0], 10);
    const endMinute = parseInt(endTimeParts[1], 10);

    if (
      startHour > endHour ||
      (startHour === endHour && startMinute > endMinute)
    ) {
      notify({
        status: "error",
        title: "niepoprawne godziny pracy",
      });

      return false;
    } else {
      return true;
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

  useEffect(() => {
    if (selectedOption.text.length > 0) {
      setStartTime(selectedOption.value.start);
      setEndTime(selectedOption.value.end);
    }
  }, [selectedOption]);

  const generateHoursOptions = () => {
    const options = [];
    for (let hour = 0; hour <= 23; hour++) {
      for (let minute = 0; minute <= 45; minute += 15) {
        const time = `${hour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}`;
        options.push(
          <option key={time} value={time}>
            {time}
          </option>
        );
      }
    }
    return options;
  };

  return (
    <div
      className="fixed bg-white/65 dark:bg-black/65 left-0 top-0 h-dvh w-screen flex flex-col items-center justify-center"
      onClick={(e) => navigate(-1)}
    >
      <div
        className="h-fit w-11/12 sm:w-1/3 gap-2 min-w-3.5 flex flex-col justify-between text-black dark:text-white bg-zinc-100 dark:bg-zinc-900 p-5 rounded-md"
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

            <div className="flex items-center mt-4 justify-center">
              <div className="flex items-center">
                <label>od:</label>
                {/* <input
                  type="time"
                  value={startTime}
                  name="time"
                  onChange={handleStartTimeChange}
                  className="text-black h-7 w-min rounded-md shadow-none outline-none border-none dark:text-white bg-zinc-200 dark:bg-zinc-700 ml-2 mr-2"
                /> */}
                <select
                  value={startTime}
                  onChange={handleStartTimeChange}
                  onBlur={compareTimes}
                  className="text-black h-7 w-min pl-1 pr-1 rounded-md shadow-none outline-none border-none dark:text-white bg-zinc-200 dark:bg-zinc-700 ml-2 mr-2"
                >
                  {generateHoursOptions()}
                </select>
              </div>
              <div className="flex items-center">
                <label>do:</label>
                {/* <input
                  type="time"
                  step="3600"
                  value={endTime}
                  onChange={handleEndTimeChange}
                  className="text-black w-min h-7 rounded-md shadow-none outline-none border-none dark:text-white bg-zinc-200 dark:bg-zinc-700 ml-2 mr-2"
                /> */}
                <select
                  value={endTime}
                  onChange={handleEndTimeChange}
                  onBlur={compareTimes}
                  className="text-black h-7 w-min pl-1 pr-1 rounded-md shadow-none outline-none border-none dark:text-white bg-zinc-200 dark:bg-zinc-700 ml-2 mr-2"
                >
                  {generateHoursOptions()}
                </select>
              </div>
            </div>
          </div>
        </div>

        <button
          className="button bg-green-600 text-white font-bold hover:opacity-80 transition-opacity p-1.5 rounded-md text-sm"
          onClick={joinToDay}
        >
          Dołącz do tego dnia
        </button>
      </div>
    </div>
  );
};
