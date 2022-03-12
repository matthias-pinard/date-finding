import { useTranslation } from "react-i18next";
import { useGameState } from "./GameState";

const Lose = () => {
  const { gameState, gameDispatch } = useGameState();
  const { t } = useTranslation();
  const days = t("days", { returnObjects: true });
  return (
    <>
      <div className="text-xl">Lose !</div>
      <div>{gameState.date.toLocaleDateString("fr")}</div>
      <div>
        <span className="line-through">{days[gameState.response!]}</span>
        {"   "} {days[gameState.date.getDay()]}
      </div>
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

export default Lose;
