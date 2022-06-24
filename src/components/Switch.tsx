import Param from "./Param";
import Game from "./Game";
import Lose from "./Lose";
import Win from "./Win";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { GameStep } from "../store/game.slice";

const Switch = () => {
  const gameState = useSelector((state: RootState) => state.game);
  return {
    [GameStep.Param]: <Param />,
    [GameStep.Game]: <Game />,
    [GameStep.Lose]: <Lose />,
    [GameStep.Win]: <Win />,
  }[gameState.gameStep];
};

export default Switch;
