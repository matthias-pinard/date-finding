import { useTranslation } from "react-i18next";
import { useGameState } from "./GameState";

const Win = () => {
  const { gameState, gameDispatch } = useGameState();
  const {t} = useTranslation()
  const time = (gameState.endTime! - gameState.startTime!) / 1000;
  return (
    <>
      <div>Win in {time} seconds</div>
      <button
        className="bg-gray-200 hover:bg-gray-300 font-bold py-2 px-4 rounded"
        onClick={() => {
          gameDispatch({ type: "reset" });
        }}
      >
        {t("reset")}
      </button>
    </>
  );
};

export default Win;
