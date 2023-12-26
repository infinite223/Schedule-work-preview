import React, {FC} from "react";
import {IoPeopleOutline, IoSettingsOutline} from "react-icons/io5";
import {NavigateOption} from "./NavigateOption";
import {BsCalendar, BsCalendar2Week, BsPlusLg} from "react-icons/bs";
import {colors} from "../Utilis/globalStyles";
import {FaPlus, FaMinus} from "react-icons/fa";
import {HiMenuAlt3} from "react-icons/hi";

interface NavigationProps {
  type: "Schedule" | "Other";
  operation?: "plus" | "minus";
}

const navigateOption = [
  {
    name: "Grupy",
    type: "/Groups",
    icon: <IoPeopleOutline size={30} color="#555" />,
  },
  {name: "Grafik", type: "/Schedule", icon: <BsCalendar2Week size={35} />},
  {name: "Add", type: "Add", icon: <FaPlus size={18} color="white" />},
  {name: "Remove", type: "Remove", icon: <FaMinus size={18} color="white" />},
  {
    name: "Opcje",
    type: "/Settings",
    icon: <HiMenuAlt3 size={30} color="#555" />,
  },
];
const Navigation: FC<NavigationProps> = ({type, operation}) => {
  const isOpenSchedule = type === "Schedule";
  const meInDat = operation === "minus";

  return (
    <div className="flex w-full justify-around mt-auto items-center pb-5 pt-5">
      <NavigateOption {...navigateOption[0]} />
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
              boxShadow: "0px 5px 10px rgb(217, 217, 217)",
            }}
          />
        )
      ) : (
        <NavigateOption {...navigateOption[1]} style={{padding: "8px"}} />
      )}
      <NavigateOption {...navigateOption[4]} />
    </div>
  );
};

export default Navigation;
