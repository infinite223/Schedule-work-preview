import {useSelector} from "react-redux";
import Navigation from "../navigation";
import {selectedGroups} from "../slices/groupsSlice";
import {FC} from "react";
import {FaMinus} from "react-icons/fa";
import {FaTrashCan} from "react-icons/fa6";
import {MdOutlineGroups2} from "react-icons/md";
import {FaPersonCirclePlus} from "react-icons/fa6";

type Group = {
  name: string;
  id: string;
  users: {nick: string; id: string}[];
  isAdmin: boolean;
  userId: string;
};

const GroupItem: FC<Group> = ({name, users, isAdmin, userId}) => {
  return (
    <div className="bg-zinc-900 p-3 pr-4 pl-4 rounded-md flex flex-col w-full">
      <div className="flex items-center w-full justify-between gap-2">
        <h1 className="text-white font-semibold flex items-center gap-4">
          <MdOutlineGroups2 size={22} />
          {name}
        </h1>
        {isAdmin && (
          <div className="flex items-center gap-2 text-black  dark:text-zinc-300">
            <div className="pr-2 pl-2 hover:text-green-600 cursor-pointer transition-colors">
              <FaPersonCirclePlus size={18} />
            </div>
            <div className="pr-2 pl-2 hover:text-red-600 cursor-pointer transition-colors">
              <FaTrashCan size={18} />
            </div>
          </div>
        )}
      </div>

      {users.map(({nick}, id) => (
        <div
          className="mt-3 border-t-2 justify-between w-full border-zinc-200 hover:opacity-50 cursor-pointer transition-opacity dark:border-zinc-800 flex items-center pt-2 gap-3 text-zinc-800 dark:text-zinc-200 "
          key={id}
        >
          <div className="text-sm">{nick}</div>

          {isAdmin && (
            <div className="flex items-center gap-2 pr-2 pl-2">
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
  const isAdmin = true;

  return (
    <div className="flex flex-col items-center h-dvh justify-between w-full bg-white dark:bg-black">
      <div className="flex flex-col items-center w-full pr-4 pl-4">
        <h1 className="pt-4 pb-5 text-lg pl-2 self-start font-semibold text-gray-500 dark:text-gray-200">
          Dostępne grupy
        </h1>
        <div className="flex flex-col gap-2 p-2 w-full">
          {groups.map((data) => (
            <GroupItem {...data} isAdmin={isAdmin} key={data.id} />
          ))}
        </div>
      </div>
      <Navigation type="Groups" />
    </div>
  );
};

export default Groups;
