import { GameStep, useGameState } from "./GameState";
import Param from "./Param";
import Game from "./Game";
import Lose from "./Lose";
import Win from "./Win";

const Switch = () => {
  const { gameState } = useGameState();
  return {
    [GameStep.Param]: <Param />,
    [GameStep.Game]: <Game />,
    [GameStep.Lose]: <Lose />,
    [GameStep.Win]: <Win />,
  }[gameState.gameStep];
};

export default Switch;
