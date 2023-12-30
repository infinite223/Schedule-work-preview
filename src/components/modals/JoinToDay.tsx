import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {selectedDay} from "../../slices/selectedDaySlice";
import {arrayUnion, doc, getDoc, setDoc} from "firebase/firestore";
import {db} from "../../services/firebaseConfig";
import useAuth from "../../hooks/useAuth";

export const JoinToDay = () => {
  const navigate = useNavigate();
  const day = useSelector(selectedDay);
  const dayDate = JSON.parse(day.selectedDay);
  const {user}: any = useAuth();
  const joinToDay = async () => {
    const getUser = await getDoc(doc(db, "users", user.uid));
    await setDoc(doc(db, "schedule", dayDate.toString(), "users", user.uid), {
      start: "12:00",
      end: "22:00",
      userRef: getUser.ref,
    });
    await setDoc(doc(db, "schedule", dayDate.toString()), {
      date: new Date(dayDate),
    });
  };
  return (
    <div
      className="fixed bg-transparent left-0 top-0 h-dvh w-screen flex flex-col items-center justify-center"
      onClick={(e) => navigate(-1)}
    >
      <div
        className="h-1/2 w-2/5 min-w-3.5 bg-slate-200 p-5 rounded-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <h2>JoinToDay</h2>
        <button onClick={joinToDay}>Dołącz do tego dnia</button>
      </div>
    </div>
  );
};
