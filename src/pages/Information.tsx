import {Link} from "react-router-dom";
import {appConfig} from "../appConfig";
import logo from "../assets/calendar.png";
import Navigation from "../navigation";
import {FC} from "react";

const infoList = [
  {
    name: "Wersja aplikacji",
    description: " v" + appConfig.version,
    navigate: null,
  },
  {
    name: "Opis aplikacji",
    description:
      "ScheduleWork ma ułatwić pracownikom jak i szefowi zarządzanie harmonogramem pracy tak aby każdy mógł w dowolnym momencie ustawić swoją chęć do pracy w danym dniu. I mieć stały wgląd w grafik w dowolnym mijscu.",
    navigate: null,
  },
  {
    name: "Autor aplikacji",
    description: "Dawid Szmigiel",
    navigate: null,
  },
  {
    name: "Aktualne zmiany",
    description: "Wszytskie zmiany w aplikacji",
    navigate: "/ReleaseNotes",
  },
];

const InfoItem: FC<{
  name: string;
  description: string;
  navigate: string | null;
}> = ({description, name, navigate}) => {
  return (
    <div
      className={`flex flex-col gap-0.5 mt-2 bg-zinc-200 dark:bg-zinc-900 rounded-md p-2 w-full ${
        navigate ? "hover:opacity-50 transition-opacity" : ""
      }`}
    >
      <h2 className="text-green-500">{name}</h2>
      <p className="text-[13px]">{description}</p>
    </div>
  );
};

const Information = () => {
  return (
    <div className="flex flex-col items-center h-dvh max-h-dvh justify-between w-full bg-white dark:bg-black">
      <div className="flex flex-col w-full pr-4 pl-4 h-full text-black dark:text-white">
        <div className="flex items-center justify-between w-full">
          <h1 className="pt-4 pb-5 text-lg pl-1 self-start font-semibold text-zinc-900 dark:text-gray-100">
            Informacje
          </h1>
          <img src={logo} className="w-[30px] pr-2" />
        </div>

        <h1 className="text-xl font-bold pt-3 ml-2">{appConfig.name}</h1>
        <div className="flex flex-col gap-1 w-full">
          {infoList.map((_info, id) =>
            _info.navigate ? (
              <Link to={_info.navigate} key={id}>
                <InfoItem {..._info} />
              </Link>
            ) : (
              <InfoItem {..._info} key={id} />
            )
          )}
        </div>
      </div>
      <Navigation type="Settings" />
    </div>
  );
};

export default Information;
