import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { guess } from "../store/game.slice";
import { getRandomDate } from "../utils/date-utils";

const Game = () => {
  const date = useSelector((state: RootState) => state.game.date);

  const dateStr = date!.toLocaleDateString("fr");

  return (
    <>
      <h2 className="text-2xl my-5 font-semibold">{dateStr}</h2>
      <GuessButton day={1} />
      <GuessButton day={2} />
      <GuessButton day={3} />
      <GuessButton day={4} />
      <GuessButton day={5} />
      <GuessButton day={6} />
      <GuessButton day={0} />
    </>
  );
};

const GuessButton = ({ day }: { day: number }) => {
  const date = useSelector((state: RootState) => state.game.date);
  const dateStr = date!.toLocaleDateString("fr");
  const { t } = useTranslation();
  const dispatch = useDispatch();

  return (
    <button
      className={`mx-2 px-2 py-1 rounded-md bg-gray-200 hover:bg-gray-300`}
      onClick={() => {
        return dispatch(
          guess({
            guess: day,
            time: new Date().getTime(),
            nextDate: getRandomDate().getTime(),
            date: dateStr,
          })
        );
      }}
    >
      {t("days", { returnObjects: true })[day]}
    </button>
  );
};

export default Game;
