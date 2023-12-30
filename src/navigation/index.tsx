import {FC} from "react";
import {IoPeopleOutline} from "react-icons/io5";
import {NavigateOption} from "./NavigateOption";
import {BsCalendar2Week} from "react-icons/bs";
import {colors} from "../Utilis/globalStyles";
import {FaPlus, FaMinus} from "react-icons/fa";
import {HiMenuAlt3} from "react-icons/hi";

interface NavigationProps {
  type: "Schedule" | "Groups" | "Settings";
  operation?: "plus" | "minus";
}

const navigateOption = [
  {
    name: "Grupy",
    type: "/Groups",
    icon: <IoPeopleOutline size={28} />,
  },
  {
    name: "Grafik",
    type: "/",
    icon: <BsCalendar2Week size={30} color="#555" />,
  },
  {name: "Add", type: "/JoinToDay", icon: <FaPlus size={14} color="white" />},
  {
    name: "Remove",
    type: "/RemoveFromDay",
    icon: <FaMinus size={14} color="white" />,
  },
  {
    name: "Opcje",
    type: "/Settings",
    icon: <HiMenuAlt3 size={28} />,
  },
];
const Navigation: FC<NavigationProps> = ({type, operation}) => {
  const isOpenSchedule = type === "Schedule";
  const meInDat = operation === "minus";

  return (
    <div className="flex w-full justify-around mt-auto items-center pb-3 pt-3 border-t-2 border-gray-400/10">
      <NavigateOption
        {...navigateOption[0]}
        style={{color: type === "Groups" ? "var(--baseColor)" : "gray"}}
      />
      {isOpenSchedule ? (
        !meInDat ? (
          <NavigateOption
            {...navigateOption[2]}
            style={{
              backgroundColor: colors.baseColor,
              borderRadius: "50px",
              padding: "16px",
            }}
          />
        ) : (
          <NavigateOption
            {...navigateOption[3]}
            style={{
              backgroundColor: colors.baseColor,
              borderRadius: "50px",
              padding: "16px",
            }}
            withShadow={true}
          />
        )
      ) : (
        <NavigateOption {...navigateOption[1]} style={{padding: "8px"}} />
      )}
      <NavigateOption
        {...navigateOption[4]}
        style={{color: type === "Settings" ? "var(--baseColor)" : "gray"}}
      />
    </div>
  );
};

export default Navigation;
