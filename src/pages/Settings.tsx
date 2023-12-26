import Navigation from "../navigation";

const Settings = () => {
  return (
    <div className="flex flex-col items-center h-screen justify-between w-full">
      <div className="flex flex-col items-center w-full pr-4 pl-4">
        <h1 className="pt-5 pb-5 pl-2 text-lg self-start">
          <span className="font-bold uppercase">Dodatkowe informacje</span>
        </h1>
      </div>
      <Navigation type="Settings" />
    </div>
  );
};

export default Settings;
