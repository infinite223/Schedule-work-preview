import {useSelector} from "react-redux";
import Navigation from "../navigation";
import {selectedGroups} from "../slices/groupsSlice";
import {FC} from "react";
import {FaMinus} from "react-icons/fa";
import {FaTrashCan} from "react-icons/fa6";
import {MdOutlineGroups2} from "react-icons/md";
import {FaPersonCirclePlus} from "react-icons/fa6";
import {IoCalendarSharp} from "react-icons/io5";

type Group = {
  name: string;
  id: string;
  users: {nick: string; id: string}[];
  isAdmin: boolean;
  userId: string;
};

const GroupItem: FC<Group> = ({name, users, isAdmin, userId}) => {
  return (
    <div className="p-2 pr-1 pl-1 rounded-md flex flex-col w-full border-b-2 border-zinc-200 dark:border-zinc-900">
      <div className="flex items-center w-full justify-between gap-2 mb-1">
        <h1 className="text-white font-semibold flex items-center gap-4">
          <MdOutlineGroups2 size={22} />
          {name}
        </h1>
        <div className="flex items-center gap-2">
          {isAdmin && (
            <div className="flex items-center gap-2 text-black  dark:text-zinc-300">
              <div className="pr-2 pl-2 hover:text-green-600 cursor-pointer transition-colors">
                <FaPersonCirclePlus size={19} />
              </div>
              <div className="pr-2 pl-2 hover:text-red-600 cursor-pointer transition-colors">
                <FaTrashCan size={16} />
              </div>
            </div>
          )}
          <div className="flex items-center gap-2 text-xs rounded-full font-medium bg-green-700 p-2 pr-3 pl-3 hover:opacity-70 cursor-pointer transition-opacity text-zinc-100">
            Zobacz grafik
            <IoCalendarSharp size={17} />
          </div>
        </div>
      </div>

      {users.map(({nick, id}) => (
        <div
          className="justify-between w-full hover:opacity-50 cursor-pointer transition-opacity dark:border-zinc-950 flex items-center pb-1 gap-1  "
          key={id}
        >
          <div
            className={
              userId === id
                ? "text-green-500"
                : "text-zinc-800 dark:text-zinc-200"
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
  const groups: Group[] = useSelector(selectedGroups);
  const isAdmin = false;

  return (
    <div className="flex flex-col items-center h-dvh max-h-dvh justify-between w-full bg-white dark:bg-black">
      <div className="flex flex-col items-center w-full pr-4 pl-4 h-full">
        <h1 className="pt-4 pb-5 text-lg pl-2 self-start font-semibold text-gray-500 dark:text-gray-200">
          Dostępne grupy
        </h1>
        <div className="flex flex-col gap-2 p-2 pt-0 w-full flex-grow overflow-auto h-0">
          {groups.map((data) => (
            <GroupItem {...data} isAdmin={isAdmin} key={data.id} userId={"2"} />
          ))}
        </div>
      </div>
      <Navigation type="Groups" />
    </div>
  );
};

export default Groups;
