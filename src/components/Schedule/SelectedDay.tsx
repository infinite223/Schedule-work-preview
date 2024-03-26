import {FC, useEffect, useState} from "react";
import {DateWithUsers, GroupLocal} from "../../Utilis/types";
import {shortDayNames} from "../../Utilis/data";
import {useDispatch, useSelector} from "react-redux";
import {selectedGroup} from "../../slices/selectedGroupSlice";
import {formatDateToString, getColorDot} from "../../Utilis/functions";
import {selectRefreshSelectedDay} from "../../slices/refreshSelectedDaySlice";
import useAuth from "../../hooks/useAuth";
import {doc, updateDoc} from "firebase/firestore";
import {db} from "../../services/firebaseConfig";
import {useNavigate} from "react-router-dom";
import {useNotifications} from "reapop";
import {setReadsCounter} from "../../slices/readsCounterSlice";
import {FaLockOpen, FaUserLock} from "react-icons/fa";

interface SelectedDateProps {
  selectedDate: DateWithUsers;
}

const SelectedDay: FC<SelectedDateProps> = ({selectedDate}) => {
  const navigate = useNavigate();
  const {notify} = useNotifications();
  const group: GroupLocal = useSelector(selectedGroup);
  const dispatch = useDispatch();
  const [usersInDay, setUsersInDay] = useState<any>([]);
  const refreshSelectedDay = useSelector(selectRefreshSelectedDay);
  const {user}: any = useAuth();
  const isAdmin = user?.type === "admin";

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
            createdAt: user.createdAt,
            remove: user?.remove,
            block: user?.block,
            id: user?.id,
          };
        }
      })
    );
  }, [selectedDate, refreshSelectedDay]);

  const blockUserInDay = async (userInDay: any, type: boolean) => {
    if (user && isAdmin && userInDay.id) {
      try {
        await updateDoc(doc(db, "schedule", userInDay.id), {
          block: type,
          remove: type,
        });
        navigate("/");

        notify({
          status: "success",
          title: type ? "Zablokowano " : "Odblokowano" + userInDay.user.nick,
        });
      } catch (error) {
        notify({
          status: "error",
          title: "Coś poszło nie tak, spróbuj od nowa załadować aplikacje",
        });
      }

      dispatch(setReadsCounter(1));
    } else {
      notify({
        status: "error",
        title: "Coś poszło nie tak",
      });
    }
  };

  return (
    <div className="flex text-black dark:text-white p-2 w-full h-fit">
      <div className="border-r-2 border-green-500 p-2 pr-5 pl-3 flex flex-col">
        <span className="font-bold text-[16px]">
          {selectedDate.date.getDate()}
        </span>
        <span className="font-light text-sm">
          {
            shortDayNames[
              selectedDate.date.getDay() ? selectedDate.date.getDay() - 1 : 6
            ]
          }
        </span>
      </div>

      <div className="flex flex-col pl-4 pr-2 w-full flex-grow overflow-auto">
        {usersInDay.map((item: any, id: string) => (
          <div key={id}>
            {item?.user && item?.end && item?.start && item?.createdAt ? (
              <div
                key={id}
                className={`flex flex-col text-black dark:text-zinc-100 p-1 w-full justify-between 
            border-b-2 border-zinc-200 dark:border-zinc-900`}
                style={item?.remove ? {opacity: 0.3} : {}}
              >
                <div className="flex items-center justify-between w-full text-sm">
                  <div
                    className={
                      item?.user?.uid === user.uid ? `text-green-500` : ""
                    }
                  >
                    {item?.user?.nick}
                  </div>
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex gap-4 items-center text-black dark:text-zinc-200`}
                      style={{color: getColorDot(item)}}
                    >
                      <div className="">od: {item?.start}</div>
                      <div>do: {item?.end}</div>
                    </div>
                    {isAdmin &&
                      item.user.uid !== user.uid &&
                      (item?.block ? (
                        <FaUserLock
                          onClick={() => blockUserInDay(item, false)}
                          className="text-zinc-800 dark:text-zinc-100 cursor-pointer hover:text-green-600 transition-colors"
                          size={16}
                        />
                      ) : (
                        <FaLockOpen
                          onClick={() => blockUserInDay(item, true)}
                          className="text-zinc-800 dark:text-zinc-100 cursor-pointer hover:text-red-600 transition-colors"
                          size={16}
                        />
                      ))}
                  </div>
                </div>

                <div className="flex pt-1 text-zinc-400">
                  <div className="text-[10px]">
                    Dodano:{" "}
                    {formatDateToString(
                      new Date(item?.createdAt?.seconds * 1000)
                    )}{" "}
                    o {new Date(item?.createdAt?.seconds * 1000).getHours()}:
                    {new Date(item?.createdAt?.seconds * 1000).getMinutes()}
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectedDay;
