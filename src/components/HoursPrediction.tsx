import React, {FC} from "react";
import {countAllHoursInMonthV2} from "../Utilis/functions";
import {DayData} from "../Utilis/types";
interface HoursPredictionProps {
  userUid: string;
  days: {id: number; date: Date; users: DayData[]; noDay: boolean}[];
}
const HoursPrediction: FC<HoursPredictionProps> = ({days, userUid}) => {
  const hoursPrediction = countAllHoursInMonthV2(userUid, days);
  return (
    <span className="text-green-500 text-sm font-light">
      {hoursPrediction[userUid]?.hours > 0 && (
        <span>{hoursPrediction[userUid]?.hours} h</span>
      )}
      {hoursPrediction[userUid]?.minutes > 0 && (
        <span> {hoursPrediction[userUid]?.minutes}m</span>
      )}
    </span>
  );
};

export default HoursPrediction;
