import {useDispatch, useSelector} from "react-redux";
import Navigation from "../navigation";
import {selectedGroups} from "../slices/groupsSlice";
import {FC} from "react";
import {FaMinus} from "react-icons/fa";
import {FaTrashCan} from "react-icons/fa6";
import {MdOutlineGroups2} from "react-icons/md";
import {FaPersonCirclePlus} from "react-icons/fa6";
import {IoCalendarSharp} from "react-icons/io5";
import {setGroup} from "../slices/selectedGroupSlice";
import {Link, useLocation, useNavigate} from "react-router-dom";
import useAuth from "../hooks/useAuth";
import {GroupLocal, User} from "../Utilis/types";
import logo from "../assets/calendar.png";
import {group} from "console";

type GroupItemProps = {
  name: string;
  id: string;
  users: User[];
  isAdmin: boolean;
  userId: string;
};

const GroupItem: FC<GroupItemProps> = ({name, users, isAdmin, userId, id}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const trySetGorup = () => {
    dispatch(setGroup({name, users, id}));
    navigate("/");
  };

  return (
    <div className="p-2 pr-1 pl-1 rounded-md flex flex-col w-full border-b-2 border-zinc-200 dark:border-zinc-900">
      <div className="flex items-center w-full justify-between gap-2">
        <h1 className="text-zinc-900 dark:text-zinc-100 font-semibold flex items-center gap-3">
          <MdOutlineGroups2 size={20} />
          {name}
        </h1>
        <div className="flex items-center gap-2">
          {isAdmin && (
            <div className="flex items-center gap-1 text-black  dark:text-zinc-300">
              <Link
                to={"/AssignPerson"}
                state={{
                  previousLocation: location,
                  group: {groupId: id, groupName: name},
                }}
              >
                <div className="pr-2 pl-2 hover:text-green-600 cursor-pointer transition-colors">
                  <FaPersonCirclePlus size={19} />
                </div>
              </Link>
              <div className="pr-2 pl-2 hover:text-red-600 cursor-pointer transition-colors">
                <FaTrashCan size={16} />
              </div>
            </div>
          )}
          <div
            onClick={trySetGorup}
            className="flex items-center font-semibold gap-2 text-xs rounded-full bg-green-600 p-2 pr-3 pl-3 hover:opacity-70 cursor-pointer transition-opacity text-zinc-100"
          >
            Zobacz
            <IoCalendarSharp size={15} />
          </div>
        </div>
      </div>

      <div className="text-zinc-800 text-sm dark:text-zinc-300 mb-3">
        {users.length} osób/a w grupie
      </div>
      {users.map(({nick, uid}, id) => (
        <div
          className="justify-between w-full hover:opacity-50 cursor-pointer transition-opacity dark:border-zinc-950 flex items-center pb-1 gap-1  "
          key={id}
        >
          <div
            className={
              userId === uid
                ? "text-green-600 font-bold"
                : "text-zinc-800 dark:text-zinc-100"
            }
          >
            {nick}
          </div>

          {isAdmin && (
            <div className="flex items-center gap-2 pr-2 pl-2 text-zinc-800 dark:text-zinc-200">
              <FaMinus size={12} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const Groups = () => {
  const groups: GroupLocal[] = useSelector(selectedGroups);
  const {user}: any = useAuth();
  const isAdmin = user.type === "admin";

  return (
    <div className="flex flex-col items-center h-dvh max-h-dvh justify-between w-full bg-white dark:bg-black">
      <div className="flex flex-col items-center w-full pr-4 pl-4 h-full">
        <div className="flex items-center justify-between w-full">
          <h1 className="pt-4 pb-5 text-lg pl-1 self-start font-semibold text-zinc-900 dark:text-gray-100">
            Dostępne grupy
          </h1>
          <img src={logo} className="w-[30px] pr-2" />
        </div>
        <div className="flex flex-col gap-2 p-1 pt-0 w-full flex-grow overflow-auto h-0">
          {groups.map((data) => (
            <GroupItem
              {...data}
              isAdmin={isAdmin}
              key={data.id}
              userId={user.uid}
            />
          ))}
        </div>
      </div>
      <Navigation type="Groups" />
    </div>
  );
};

export default Groups;
