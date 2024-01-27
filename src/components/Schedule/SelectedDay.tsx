import {FC, useEffect, useState} from "react";
import {DateWithUsers, DayData, GroupLocal} from "../../Utilis/types";
import {shortDayNames} from "../../Utilis/data";
import {useSelector} from "react-redux";
import {selectedGroup} from "../../slices/selectedGroupSlice";
import {formatDateToString, getColorDot} from "../../Utilis/functions";
import {selectRefreshSelectedDay} from "../../slices/refreshSelectedDaySlice";
import useAuth from "../../hooks/useAuth";

interface SelectedDateProps {
  selectedDate: DateWithUsers;
}

const SelectedDay: FC<SelectedDateProps> = ({selectedDate}) => {
  const group: GroupLocal = useSelector(selectedGroup);
  const [usersInDay, setUsersInDay] = useState<any>([]);
  const refreshSelectedDay = useSelector(selectRefreshSelectedDay);
  const {user}: any = useAuth();
  useEffect(() => {
    setUsersInDay(
      selectedDate.users.map((user) => {
        const findUser = group.users.find((u) => u.uid === user.userUid);
        if (findUser) {
          return {
            date: user.date,
            start: user.start,
            end: user.end,
            user: findUser,
            createdAt: user.createdAt,
            remove: user.remove,
          };
        }
      })
    );
  }, [selectedDate, refreshSelectedDay]);

  return (
    <div className="flex text-black dark:text-white p-2 w-full h-fit ">
      <div className="border-r-2 border-green-500 p-2 pr-5 pl-5 flex flex-col">
        <span className="font-bold text-[16px]">
          {selectedDate.date.getDate()}
        </span>
        <span className="font-light text-sm">
          {
            shortDayNames[
              selectedDate.date.getDay() ? selectedDate.date.getDay() - 1 : 6
            ]
          }
        </span>
      </div>

      <div className="flex flex-col pl-4 pr-2 w-full">
        {usersInDay.map((item: any, id: string) => (
          <div
            key={id}
            className={`flex flex-col text-black dark:text-zinc-100 p-1 w-full justify-between 
            border-b-2 border-zinc-200 dark:border-zinc-900`}
            style={item.remove ? {opacity: 0.3} : {}}
          >
            <div className="flex items-center justify-between w-full text-sm">
              <div
                className={item.user.uid === user.uid ? `text-green-500` : ""}
              >
                {item.user.nick}
              </div>
              <div
                className={`flex gap-4 items-center text-black dark:text-zinc-200`}
                style={{color: getColorDot(item)}}
              >
                <div className="">od: {item.start}</div>
                <div>do: {item.end}</div>
              </div>
            </div>

            <div className="flex pt-1 font-light">
              <div className="text-[10px] font-light">
                Dodano:{" "}
                {formatDateToString(new Date(item.createdAt.seconds * 1000))} o{" "}
                {new Date(item.createdAt.seconds * 1000).getHours()}:
                {new Date(item.createdAt.seconds * 1000).getMinutes()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectedDay;
