import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { reset, save } from "../store/game.slice";

const Win = () => {
  const gameState = useSelector((state: RootState) => state.game);
  const gameDispatch = useDispatch();
  const { t } = useTranslation();
  const time = gameState.endTime! - gameState.startTime!;
  useEffect(() => {
  gameDispatch(save())
  });

  return (
    <>
      <div>Win in {time / 1000} seconds</div>
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

export default Win;
