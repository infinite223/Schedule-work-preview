import {FC, useEffect, useState} from "react";
import {DateWithUsers, DayData, GroupLocal} from "../../Utilis/types";
import {shortDayNames} from "../../Utilis/data";
import {useSelector} from "react-redux";
import {selectedGroup} from "../../slices/selectedGroupSlice";
import {Timestamp} from "firebase/firestore";

interface SelectedDateProps {
  selectedDate: DateWithUsers;
}

const _users: DayData[] = [
  {
    date: Timestamp.now(),
    end: "10:00",
    start: "16:00",
    userUid: "21",
  },
];

const SelectedDay: FC<SelectedDateProps> = ({selectedDate}) => {
  const group: GroupLocal = useSelector(selectedGroup);
  const [usersInDay, setUsersInDay] = useState<any>([]);

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
          };
        }
      })
    );
  }, []);

  return (
    <div className="flex text-white p-2 w-full h-fit ">
      <div className="border-r-2 border-green-500 p-2 pr-5 pl-5 flex flex-col">
        <span className="font-bold text-lg">{selectedDate.date.getDate()}</span>
        <span className="font-light text-sm">
          {
            shortDayNames[
              selectedDate.date.getDay() ? selectedDate.date.getDay() - 1 : 6
            ]
          }
        </span>
      </div>

      <div className="flex flex-col">
        {usersInDay.map((user: any, id: string) => (
          <div key={id}>{user.nick}</div>
        ))}
      </div>
    </div>
  );
};

export default SelectedDay;
