import { useContext } from "react";
import { GameStateContext, GameStateDispatcherContext } from "./GameState";

const Game = () => {
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
            className="px-2 my-5 rounded-md bg-gray-200"
            onClick={() => restart()}
          >
            Restart
          </button>
        )}
      </div>
    </>
  );
};

const getDayLabel = (day: number) => {
  switch (day) {
    case 0:
      return "Lundi";
    case 1:
      return "Mardi";
    case 2:
      return "Mercredi";
    case 3:
      return "Jeudi";
    case 4:
      return "Vendredi";
    case 5:
      return "Samedi";
    case 6:
      return "Dimanche";
    default:
      return "";
  }
};

const GuessButton = ({ day }: { day: number }) => {
  const dispatch = useContext(GameStateDispatcherContext);
  const { date, response, isIncorect } = useContext(GameStateContext);
  const backgroundColor =
    response != null && day === date.getDay()
      ? "bg-green-500"
      : response === day && isIncorect
      ? "bg-red-500"
      : "bg-gray-200";
  return (
    <button
      className={`mx-2 px-2 rounded-md ${backgroundColor}`}
      onClick={() => dispatch({ type: "guess", guess: day })}
    >
      {getDayLabel(day)}
    </button>
  );
};

export default Game;
