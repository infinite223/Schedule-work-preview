import {FC} from "react";
import {colors} from "../../../Utilis/globalStyles";
import {DayData} from "../../../Utilis/types";
import {getColorDot} from "../../../Utilis/functions";

interface DayProps {
  id: number;
  isSelected: boolean;
  users: DayData[];
  myId: string;
}
const getUidFromRef = (ref: string) => {
  if (ref.length > 5) {
    return ref.split("/").pop();
  }

  return "";
};

const Day: FC<DayProps> = ({id, isSelected, users, myId}) => {
  const findUser = users.find((user) => getUidFromRef(user.userRef) === myId);
  return (
    <div
      className="rounded-full w-10 h-10 flex items-center justify-center gap-1 flex-col"
      style={{
        borderColor: isSelected ? colors.baseColor : "transparent",
        borderWidth: 1,
        backgroundColor: findUser ? "rgba(11, 250, 43, .1)" : "transparent",
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
