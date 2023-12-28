import React, {FC} from "react";
import {DateWithUsers} from "../../Utilis/types";
import {shortDayNames} from "../../Utilis/data";
import {doc, getDoc, setDoc} from "firebase/firestore";
import {db} from "../../services/firebaseConfig";

interface SelectedDateProps {
  selectedDate: DateWithUsers;
}

const SelectedDay: FC<SelectedDateProps> = ({selectedDate}) => {
  const testRef = async () => {
    const user: any = await getDoc(doc(db, "usersWithRef", "randomId2"));
    const user2 = await getDoc(user.data().ref);

    console.log(user2.data());
  };

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
      <button className="button pl-4" onClick={testRef}>
        Test Ref
      </button>
    </div>
  );
};

export default SelectedDay;
