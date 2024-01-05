import {FC, useEffect, useState} from "react";
import {DateWithUsers, DayData} from "../../../Utilis/types";
import {firstDayOfMonth} from "../../../Utilis/scheduleFunctions";
import Day from "./Day";
import {monthNames, shortDayNames} from "../../../Utilis/data";
import {addMonthsToDate, formatDateToString} from "../../../Utilis/functions";
import {IoChevronBackOutline, IoChevronForwardOutline} from "react-icons/io5";
import {useDispatch} from "react-redux";
import {setSelectedDayInStore} from "../../../slices/selectedDaySlice";
import useAuth from "../../../hooks/useAuth";

interface CustomCalendarProps {
  selectedDate: DateWithUsers;
  setSelectedDate: (value: DateWithUsers) => void;
  data: DayData[];
}

const CustomCalendar: FC<CustomCalendarProps> = ({
  selectedDate,
  setSelectedDate,
  data,
}) => {
  const [days, setDays] = useState<
    {id: number; date: Date; users: DayData[]; noDay: boolean}[]
  >([]);
  const {user}: any = useAuth();
  const [selectedMonth, setSelectedMonth] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSelectedDayInStore(JSON.stringify(new Date())));
    setDays(firstDayOfMonth(selectedMonth, data, "1"));
  }, [selectedMonth, data]);

  useEffect(() => {
    const currentDayData = days.find((day) => day.date === new Date());
    if (currentDayData) {
      setSelectedDate({date: new Date(), users: currentDayData?.users});
    }
  }, [days]);

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex flex-row items-center justify-between pb-2 w-full shadow-sm">
        <button
          style={{padding: "2px "}}
          onClick={() => setSelectedMonth(addMonthsToDate(selectedMonth, -1))}
        >
          <IoChevronBackOutline size={22} color="var(--baseColor)" />
        </button>
        <span className="text-sm text-gray-600 dark:text-gray-300">
          {monthNames[selectedMonth.getMonth()]}
          {" " + selectedMonth.getFullYear()}
        </span>
        <button
          style={{padding: "2px"}}
          onClick={() => setSelectedMonth(addMonthsToDate(selectedMonth, 1))}
        >
          <IoChevronForwardOutline size={22} color="var(--baseColor)" />
        </button>
      </div>

      <div className="w-full rounded-lg pt-4">
        <div className="grid grid-cols-7 gap-2 mb-2 text-gray-500 dark:text-gray-400">
          {shortDayNames.map((item, index) => (
            <span
              key={index}
              className="w-full flex justify-center text-xs font-light"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2 pt2 pb-2">
          {days.map((item, index) => {
            const isSelected =
              formatDateToString(new Date(item.date)) ===
              formatDateToString(new Date(selectedDate.date));
            const disableDay = item.noDay;
            return (
              <button
                disabled={disableDay}
                key={index}
                className="w-full flex items-center justify-center"
                onClick={() => {
                  setSelectedDate({date: item.date, users: item.users});
                  dispatch(setSelectedDayInStore(JSON.stringify(item.date)));
                }}
              >
                <Day
                  id={item.id}
                  isSelected={isSelected}
                  users={item.users}
                  myId={user.uid}
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CustomCalendar;
