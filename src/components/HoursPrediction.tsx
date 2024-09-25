import { FC, useEffect, useState } from "react";
import { countAllHoursInMonthV2 } from "../Utilis/functions";
import { DayData, GroupLocal, User } from "../Utilis/types";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { selectedGroup } from "../slices/selectedGroupSlice";

interface HoursPredictionProps {
  userUid: string;
  days: { id: number; date: Date; users: DayData[]; noDay: boolean }[];
}

const HoursPrediction: FC<HoursPredictionProps> = ({ days, userUid }) => {
  const { expectedTotalHours, totalHours, totalMinutes, workHoursPerUser } =
    countAllHoursInMonthV2(days);
  const [showAllPredictions, setShowAllPredictions] = useState(false);
  const group: GroupLocal = useSelector(selectedGroup);
  const [sortedUsers, setSortedUsers] = useState<User[]>([]);

  useEffect(() => {
    if (!group?.users) return;

    setSortedUsers(
      [...group?.users].sort((a, b) => {
        const userAHours = workHoursPerUser[a.uid]?.hours || 0;
        const userAMinutes = workHoursPerUser[a.uid]?.minutes || 0;
        const userBHours = workHoursPerUser[b.uid]?.hours || 0;
        const userBMinutes = workHoursPerUser[b.uid]?.minutes || 0;

        if (userAHours === userBHours) {
          return userBMinutes - userAMinutes;
        }
        return userBHours - userAHours;
      })
    );
  }, [group, workHoursPerUser]);

  if (!group?.users) return <></>;

  return (
    <>
      {!showAllPredictions ? (
        <div onClick={() => setShowAllPredictions(true)}>
          <span className="text-green-500 text-sm font-light">
            {workHoursPerUser[userUid]?.hours > 0 && (
              <span>{workHoursPerUser[userUid]?.hours} h</span>
            )}
            {workHoursPerUser[userUid]?.minutes > 0 && (
              <span> {workHoursPerUser[userUid]?.minutes}m</span>
            )}
          </span>
        </div>
      ) : (
        <motion.div
          className="fixed bg-white/65 dark:bg-black/65 left-0 top-0 h-dvh w-screen flex flex-col items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.2 } }}
          exit={{ opacity: 0, transition: { duration: 0.1 } }}
        >
          <div
            className="h-fit w-11/12 sm:w-1/3 gap-2 min-w-3.5 flex flex-col justify-between text-black dark:text-white bg-zinc-100 dark:bg-zinc-900 p-5 rounded-md"
            onClick={(e) => e.stopPropagation()}
          >
            <h1 className="text-lg font-semibold">
              Godziny wszystkich użytkowników
            </h1>
            <div className="flex flex-col gap-1 overflow-auto max-h-[500px]">
              {sortedUsers.map((user, index: number) => {
                const userHours = workHoursPerUser[user.uid];
                let textColor =
                  userUid === user.uid
                    ? "text-green-600"
                    : userHours?.hours === 0 && userHours?.minutes === 0
                    ? "opacity-50"
                    : "";

                return (
                  <div
                    key={index}
                    className={`flex gap-2 p-0.5 w-full text-sm justify-between ${textColor}`}
                  >
                    <p>{user.nick}</p>
                    <p>
                      {userHours?.hours || 0}h {userHours?.minutes || 0}m
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="flex w-full justify-between mt-2">
              <span>
                {expectedTotalHours}h / {totalHours}h {totalMinutes}m
              </span>
              <button
                className="button bg-zinc-600 text-white font-bold hover:opacity-80 transition-opacity p-1.5 rounded-md text-sm"
                onClick={() => setShowAllPredictions(false)}
              >
                Wyjdź
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default HoursPrediction;
