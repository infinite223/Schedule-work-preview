import React from "react";
import {IoPeopleOutline, IoSettingsOutline} from "react-icons/io5";
import {NavigateOption} from "./NavigateOption";
import {BsCalendar, BsPlusLg} from "react-icons/bs";
import {colors} from "../Utilis/globalStyles";
import {FaPlus, FaMinus} from "react-icons/fa";

const navigateOption = [
  {
    name: "Grupy",
    type: "Groups",
    icon: <IoPeopleOutline size={30} color="#555" />,
  },
  {name: "Grafik", type: "Schedule", icon: <BsCalendar size={30} />},
  {name: "Add", type: "Add", icon: <FaPlus size={18} color="white" />},
  {name: "Remove", type: "Remove", icon: <FaMinus size={18} color="white" />},
  {
    name: "Opcje",
    type: "Settings",
    icon: <IoSettingsOutline size={30} color="#555" />,
  },
];
const Navigation = () => {
  const isOpenSchedule = true;
  const meInDat = true;
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
            }}
          />
        )
      ) : (
        <NavigateOption {...navigateOption[1]} />
      )}
      <NavigateOption {...navigateOption[4]} />
    </div>
  );
};

export default Navigation;
