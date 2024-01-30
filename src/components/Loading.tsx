import "../styles/loadingStyles.scss";

function Loading() {
  return (
    <div className="w-full h-dvh fixed left-0 top-0 flex items-center justify-center bg-white dark:bg-black">
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Loading;
