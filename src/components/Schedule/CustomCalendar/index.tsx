import React, {FC, useEffect, useState} from "react";
// import {useSelector} from "react-redux";
// import {
//   selectInvokeFunction,
//   selectSelectedGroupId,
// } from "../../slices/invokeFunction";
import {DateWithUsers} from "../../../Utilis/types";
import {firstDayOfMonth} from "../../../Utilis/scheduleFunctions";
import Day from "./Day";
import {monthNames, shortDayNames} from "../../../Utilis/data";
// import {colors} from "../../utils/globalStyles";
import {
  addMonthsToDate,
  formatDateToString,
  //   firstDayOfMonth,
} from "../../../Utilis/functions";
import {IoChevronBackOutline, IoChevronForwardOutline} from "react-icons/io5";

const widthScreen = "100%"; // Adjust as needed
const widthDay = "calc((100% - 20px) / 7)"; // Adjust as needed

interface CustomCalendarProps {
  selectedDate: DateWithUsers;
  setSelectedDate: (value: DateWithUsers) => void;
}

const CustomCalendar: FC<CustomCalendarProps> = ({
  selectedDate,
  setSelectedDate,
}) => {
  const [days, setDays] = useState<
    {id: number; date: Date; users: []; noDay: boolean}[]
  >([]);
  const [myId, setMyId] = useState("");
  const [loading, setLoading] = useState(false);
  //   const invokeFunction = useSelector(selectInvokeFunction);
  const [selectedMonth, setSelectedMonth] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  );
  //   const selectedGroupId = useSelector(selectSelectedGroupId);
  const [refresh, setRefresh] = useState(false);

  //   useEffect(() => {
  //     const tryGetScheduleForMonth = async () => {
  //       setLoading(true);
  //       const jsonValue = await AsyncStorage.getItem("my-key");

  //       const year = selectedMonth.getFullYear();
  //       const month = selectedMonth.getMonth();
  //       const startDate = new Date(year, month, 1);
  //       const endDate = new Date(year, month + 1, 1);

  //     //   if (jsonValue != null) {
  //     //     setMyId(JSON.parse(jsonValue).id);
  //     //     const res = await getScheduleForMonth(
  //     //       formatDateToString(startDate),
  //     //       formatDateToString(endDate)
  //     //     );
  //     //     console.log(res.status, "getScheduleForMonth");
  //     //     if (res.status === 200) {
  //     //       const groupData = await res.json();
  //     //       setDays(firstDayOfMonth(selectedMonth, groupData, selectedGroupId));
  //     //     } else {
  //     //       router.push("/messageModal");
  //     //       router.setParams({
  //     //         message: "Nie udało się pobrać grafiku",
  //     //         type: "ERROR",
  //     //       });
  //     //     }
  //     //   }

  //       setLoading(false);
  //       setRefresh(false);
  //     };

  //     tryGetScheduleForMonth();
  //   }, [invokeFunction, selectedMonth, selectedGroupId, refresh]);

  useEffect(() => {
    setSelectedDate({date: selectedMonth, users: []});
    setDays(firstDayOfMonth(selectedMonth, [], "1"));
  }, [selectedMonth]);

  if (loading) {
    return <div>Loading </div>;
  }

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex flex-row items-center justify-between pb-7 w-full">
        <button
          style={{padding: "5px"}}
          onClick={() => setSelectedMonth(addMonthsToDate(selectedMonth, -1))}
        >
          <IoChevronBackOutline size={22} />
        </button>
        <span className="text-sm">
          {monthNames[selectedMonth.getMonth()]}
          {" " + selectedMonth.getFullYear()}
        </span>
        <button
          style={{padding: "5px"}}
          onClick={() => setSelectedMonth(addMonthsToDate(selectedMonth, 1))}
        >
          <IoChevronForwardOutline size={22} />
        </button>
      </div>

      <div className="w-full bg-white rounded-lg">
        <div className="grid grid-cols-7 gap-2 mb-2">
          {shortDayNames.map((item, index) => (
            <span
              key={index}
              className="w-full flex justify-center text-sm font-light"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2 pt2 pb-2">
          {days.map((item, index) => {
            const isSelected = item.date === selectedDate.date;
            const disableDay = item.noDay || loading;
            return (
              <button
                disabled={disableDay}
                key={index}
                className="w-full flex items-center justify-center"
                onClick={() => {
                  setSelectedDate({date: item.date, users: item.users});
                }}
              >
                <Day
                  id={item.id}
                  isSelected={isSelected}
                  users={item.users}
                  myId={myId}
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
