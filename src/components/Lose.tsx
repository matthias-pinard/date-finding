import { invoke } from "@tauri-apps/api";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { reset, save } from "../store/game.slice";

const Lose = () => {
  const gameState = useSelector((state: RootState) => state.game);
  const gameDispatch = useDispatch();
  const { t } = useTranslation();
  const days = t("days", { returnObjects: true });
  useEffect(() => {
    gameDispatch(save());
  });

  return (
    <>
      <div className="text-xl">Lose !</div>
      <div>{gameState.date!.toLocaleDateString("fr")}</div>
      <div>
        <span className="line-through">{days[gameState.response!]}</span>
        {"   "} {days[gameState.date!.getDay()]}
      </div>
      <button
        className="bg-gray-200 hover:bg-gray-300 font-bold py-2 px-4 rounded"
        onClick={() => {
          gameDispatch(reset());
        }}
      >
        {t("reset")}
      </button>
    </>
  );
};

export default Lose;
