import Navigation from "../navigation";

const Groups = () => {
  return (
    <div className="flex flex-col items-center h-dvh justify-between w-full bg-white dark:bg-black">
      <div className="flex flex-col items-center w-full pr-4 pl-4">
        <h1 className="pt-3 pb-3 pl-2 self-start font-semibold text-gray-500 dark:text-gray-200">
          Dostępne grupy
        </h1>
      </div>
      <Navigation type="Groups" />
    </div>
  );
};

export default Groups;
