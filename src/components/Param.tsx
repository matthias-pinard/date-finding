import { useState } from "react";
import { useGameState } from "./GameState";

const Param = () => {
  const { gameState, gameDispatch } = useGameState();
  const [numberOfDate, setNumberOfDate] = useState(gameState.totalNbAnswer);
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
            console.log("hey :");
            gameDispatch({ type: "start", number: numberOfDate });
          }}
        >
          Start
        </button>
      </div>
    </div>
  );
};

export default Param;
