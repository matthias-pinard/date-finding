import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { GameStateContext, GameStateDispatcherContext } from "./GameState";

const Game = () => {
  const { t } = useTranslation();
  const dispatch = useContext(GameStateDispatcherContext);
  const { date, isCorrect, isIncorect } = useContext(GameStateContext);

  const dateStr = date.toLocaleDateString("fr");

  const restart = () => {
    dispatch({ type: "reset" });
  };

  return (
    <>
      <h2 className="text-2xl my-5 font-semibold">{dateStr}</h2>
      <GuessButton day={0} />
      <GuessButton day={1} />
      <GuessButton day={2} />
      <GuessButton day={3} />
      <GuessButton day={4} />
      <GuessButton day={5} />
      <GuessButton day={6} />
      <div>
        {(isCorrect || isIncorect) && (
          <button
            className="px-2 py-1 my-5 rounded-md bg-gray-200 hover:bg-gray-300 text-l"
            onClick={() => restart()}
          >
            {t("reset")}
          </button>
        )}
      </div>
    </>
  );
};

const GuessButton = ({ day }: { day: number }) => {
  const { t } = useTranslation();
  const dispatch = useContext(GameStateDispatcherContext);
  const { date, response, isIncorect } = useContext(GameStateContext);
  const backgroundColor =
    response != null && day === date.getDay()
      ? "bg-green-500"
      : response === day && isIncorect
      ? "bg-red-500"
      : "bg-gray-200";
  const hoverBackgroundColor =
    response != null && day === date.getDay()
      ? "bg-green-700"
      : response === day && isIncorect
      ? "bg-red-700"
      : "bg-gray-300";

  return (
    <button
      className={`mx-2 px-2 rounded-md ${backgroundColor} hover:${hoverBackgroundColor}`}
      onClick={() => dispatch({ type: "guess", guess: day })}
    >
      {t("days", { returnObjects: true })[day]}
    </button>
  );
};

export default Game;
