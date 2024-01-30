import {FC} from "react";
import {colors} from "../../../Utilis/globalStyles";
import {DayData, GroupLocal} from "../../../Utilis/types";
import {getColorDot} from "../../../Utilis/functions";
import {useSelector} from "react-redux";
import {selectedGroup} from "../../../slices/selectedGroupSlice";

interface DayProps {
  id: number;
  isSelected: boolean;
  users: DayData[];
  myId: string;
  today?: boolean;
}

const Day: FC<DayProps> = ({id, isSelected, users, myId, today}) => {
  const group: GroupLocal = useSelector(selectedGroup);
  const findUser = users.find(
    (user: any) => user?.userUid === myId && !user?.remove
  );

  return (
    <div
      className={`rounded-full w-10 h-10 font-bold flex items-center justify-center gap-1 flex-col ${
        today ? "dark:bg-zinc-800 bg-zinc-200" : ""
      }`}
      style={{
        borderColor: isSelected ? colors.baseColor : "transparent",
        borderWidth: 1,
      }}
    >
      <div
        className={`text-[13px] ${
          findUser ? "text-green-500" : "text-gray-700 dark:text-gray-300"
        }`}
      >
        {id !== 0 && id}
      </div>

      <div
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 5,
          display: "flex",
        }}
      >
        {users.map(
          (userInDay, id) =>
            !userInDay?.remove &&
            group.users.find((g) => g.uid === userInDay.userUid) &&
            id < 2 && (
              <div
                key={id}
                className="rounded-full w-1 h-1"
                style={{backgroundColor: getColorDot(userInDay)}}
              />
            )
        )}
      </div>
    </div>
  );
};

export default Day;
