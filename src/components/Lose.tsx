import { invoke } from "@tauri-apps/api";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useGameState } from "./GameState";

const Lose = () => {
  const { gameState, gameDispatch } = useGameState();
  const { t } = useTranslation();
  const days = t("days", { returnObjects: true });
  const time = (gameState.endTime! - gameState.startTime!);
  useEffect(() => {
    if ("__TAURI__" in window) {
      invoke("save_score", {
        time,
        nbResponse: gameState.currentNbAnswer,
        win: false,
      });
    }
  });

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
