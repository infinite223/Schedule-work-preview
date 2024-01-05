import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {selectedDay} from "../../slices/selectedDaySlice";
import {arrayUnion, doc, getDoc, setDoc} from "firebase/firestore";
import {db} from "../../services/firebaseConfig";
import useAuth from "../../hooks/useAuth";
import {shortDayNames} from "../../Utilis/data";
import {useState} from "react";
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
  const day = useSelector(selectedDay);
  const dayDate = day ? new Date(JSON.parse(day?.selectedDay)) : null;
  const {user}: any = useAuth();
  const [selectedOption, setSelectedOption] = useState<HoursOption>(
    hoursOptions[0]
  );

  const joinToDay = async () => {
    if (dayDate) {
      const getUser = await getDoc(doc(db, "users", user.uid));
      await setDoc(doc(db, "schedule", dayDate.toString()), {
        start: selectedOption.value.start,
        end: selectedOption.value.end,
        userRef: getUser.ref,
        date: new Date(dayDate),
      });
    }
  };
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
                      ? {borderColor: "var(--baseColor)"}
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
          className="button bg-green-700 hover:bg-green-500 p-1 rounded-md"
          onClick={joinToDay}
        >
          Dołącz do tego dnia
        </button>
      </div>
    </div>
  );
};
