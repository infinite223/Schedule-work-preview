import React, {FC} from "react";
import {colors} from "../../../Utilis/globalStyles";
import {UserInDay} from "../../../Utilis/types";
import {getColorDot} from "../../../Utilis/functions";

interface DayProps {
  id: number;
  isSelected: boolean;
  users: UserInDay[];
  myId: string;
}

const Day: FC<DayProps> = ({id, isSelected, users, myId}) => {
  const findUser = users.find((userInDay) => userInDay.user?.id === myId);
  return (
    <div
      className="rounded-full w-10 h-10 flex items-center justify-center gap-1 flex-col"
      style={{
        borderColor: isSelected ? colors.baseColor : "transparent",
        borderWidth: 1,
        backgroundColor: findUser ? "rgba(11, 250, 43, .1)" : "transparent",
      }}
    >
      <div className="text-xs dark:text-gray-300">{id !== 0 && id}</div>

      <div style={{flexDirection: "row", alignItems: "center", gap: 5}}>
        {users.map((userInDay, id) => (
          <div
            key={id}
            className="rounded-full w-5 h-5"
            style={{backgroundColor: getColorDot(userInDay)}}
          />
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    borderRadius: "50px",
    width: "40px",
    height: "40px",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: "2px",
    borderColor: "gray",
    gap: "2px",
  },
  textDay: {
    fontSize: 14,
  },
  dot: {
    borderRadius: 50,
    width: 5,
    height: 5,
  },
};

export default Day;
