import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store";
import { start } from "../store/game.slice";
import { getRandomDate } from "../utils/date-utils";

const Param = () => {
  const gameState = useSelector((state: RootState) => state.game);
  const dispatch = useDispatch();
  const [numberOfDate, setNumberOfDate] = useState(gameState.totalNbAnswer);
  const navigate = useNavigate();
  return (
    <div className="w-full flex justify-center p-10">
      <div className="max-w-sm">
        <div className="flex flex-row items-center mb-6">
          <div className="w-1/2">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
              Number of date
            </label>
          </div>
          <div className="w-1/2">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              type="number"
              value={numberOfDate}
              onChange={(e) => {
                setNumberOfDate(Number.parseInt(e.target.value));
              }}
            />
          </div>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            dispatch(
              start({
                nbAnswer: numberOfDate,
                startTime: new Date().getTime(),
                firstDate: getRandomDate().getTime(),
              })
            );
          }}
        >
          Start
        </button>
        <button
          onClick={() => {
            navigate("/history");
          }}
	  className="pl-6"
        >
          History
        </button>
      </div>
    </div>
  );
};

export default Param;
