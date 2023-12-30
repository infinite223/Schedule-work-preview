import {FC} from "react";
import {DateWithUsers} from "../../Utilis/types";
import {shortDayNames} from "../../Utilis/data";

interface SelectedDateProps {
  selectedDate: DateWithUsers;
}

const SelectedDay: FC<SelectedDateProps> = ({selectedDate}) => {
  return (
    <div className="flex text-white p-2 w-full">
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
    </div>
  );
};

export default SelectedDay;
