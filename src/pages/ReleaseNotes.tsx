import Navigation from "../navigation";
import {appConfig} from "../appConfig";
import {formatDateToString} from "../Utilis/functions";

const ReleaseNotes = () => {
  return (
    <div className="flex flex-col items-center gap-3 h-screen max-h-dvh justify-between w-full bg-white dark:bg-black">
      <div className="flex w-full flex-col gap-1 text-black dark:text-white h-full">
        {appConfig.releaseNotes.map((releaseNote) => (
          <div className="flex p-1 flex-col mt-1 h-full">
            <h1 className="text-xl ml-2 font-bold">
              {appConfig.name} v{releaseNote.patch}
            </h1>
            <div className="flex items-center gap-2 text-sm ml-2 mb-1">
              <h3 className="font-bold">Release Notes</h3>
              <span className="font-light italic">
                {formatDateToString(releaseNote.createdAt)}
              </span>
            </div>
            <div className="flex flex-col gap-1 mt-2 bg-zinc-200 dark:bg-zinc-900 rounded-md p-2 flex-grow overflow-auto h-0 w-full">
              <h1>Patch {releaseNote.patch}:</h1>
              {releaseNote.features.map((feature) => (
                <div className="grid gap-0.5 border-b-2 pb-2 border-zinc-200 dark:border-zinc-800">
                  <h2 className="text-green-500">{feature.name}</h2>
                  <p className="text-[13px]">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Navigation type="Settings" />
    </div>
  );
};

export default ReleaseNotes;
