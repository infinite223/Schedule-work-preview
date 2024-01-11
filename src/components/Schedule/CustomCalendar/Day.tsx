import {FC} from "react";
import {colors} from "../../../Utilis/globalStyles";
import {DayData} from "../../../Utilis/types";
import {getColorDot} from "../../../Utilis/functions";

interface DayProps {
  id: number;
  isSelected: boolean;
  users: DayData[];
  myId: string;
  today?: boolean;
}
const getUidFromRef = (ref: string) => {
  if (ref && ref.length > 5) {
    return ref.split("/").pop();
  }

  return "";
};

const Day: FC<DayProps> = ({id, isSelected, users, myId, today}) => {
  const findUser = users.find((user: any) => user?.userRef?.id === myId);

  return (
    <div
      className={`rounded-full w-10 h-10 flex items-center justify-center gap-1 flex-col ${
        findUser ? "bg-green-700" : today ? "dark:bg-gray-900 bg-gray-300" : ""
      }`}
      style={{
        borderColor: isSelected ? colors.baseColor : "transparent",
        borderWidth: 1,
      }}
    >
      <div className="text-xs text-gray-700 dark:text-gray-300">
        {id !== 0 && id}
      </div>

      <div style={{flexDirection: "row", alignItems: "center", gap: 5}}>
        {users.map((userInDay, id) => (
          <div
            key={id}
            className="rounded-full w-1 h-1"
            style={{backgroundColor: getColorDot(userInDay)}}
          />
        ))}
      </div>
    </div>
  );
};

export default Day;
