import {FC} from "react";

interface PromptModalProps {
  actions: () => JSX.Element;
  text: string;
  title: string;
  setShowPromptModal: (value: boolean) => void;
}

export const PromptModal: FC<PromptModalProps> = ({
  actions,
  text,
  title,
  setShowPromptModal,
}) => {
  return (
    <div
      className="fixed bg-white/65 dark:bg-black/65 left-0 top-0 h-dvh w-screen flex flex-col items-center justify-center"
      onClick={(e) => setShowPromptModal(false)}
    >
      <div
        className="h-fit w-11/12 sm:w-1/3 gap-2 min-w-3.5 flex flex-col justify-between text-black dark:text-white bg-zinc-100 dark:bg-zinc-900 p-5 rounded-md"
        onClick={(e) => e.stopPropagation()}
      >
        <h2>{title}</h2>

        <p className="text-sm mb-2">{text}</p>
        {actions()}
      </div>
    </div>
  );
};
