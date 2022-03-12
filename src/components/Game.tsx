import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { GameStateContext, GameStateDispatcherContext } from "./GameState";

const Game = () => {
  const { date } = useContext(GameStateContext);

  const dateStr = date.toLocaleDateString("fr");

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
    </>
  );
};

const GuessButton = ({ day }: { day: number }) => {
  const { t } = useTranslation();
  const dispatch = useContext(GameStateDispatcherContext);
  return (
    <button
      className={`mx-2 px-2 rounded-md bg-gray-200 hover:bg-gray-300`}
      onClick={() => dispatch({ type: "guess", guess: day })}
    >
      {t("days", { returnObjects: true })[day]}
    </button>
  );
};

export default Game;
