import React, { useContext } from "react";

interface GameState {
  date: Date;
  response: number | undefined;
  currentNbAnswer: number;
  totalNbAnswer: number;
  gameStep: GameStep;
  startTime: number | undefined;
  endTime: number | undefined;
}

enum GameStep {
  Param,
  Game,
  Win,
  Lose,
}

const initialState: GameState = {
  date: getRandomDate(),
  response: undefined,
  currentNbAnswer: 0,
  totalNbAnswer: 5,
  gameStep: GameStep.Param,
  startTime: undefined,
  endTime: undefined,
};

function getRandomDateRange(start: Date, end: Date): Date {
  const startMilli = start.getTime();
  const endMilli = end.getTime();
  const randomMilli = Math.random() * (endMilli - startMilli) + startMilli;
  return new Date(randomMilli);
}

function getRandomDate() {
  return getRandomDateRange(new Date(1900, 1, 1), new Date(2099, 12, 31));
}

type GameAction =
  | { type: "reset" }
  | { type: "guess"; guess: number }
  | { type: "start"; number: number };

export default function gameReducer(
  gameState: GameState,
  action: GameAction
): GameState {
  switch (action.type) {
    case "reset":
      return {
        date: getRandomDate(),
        response: undefined,
        currentNbAnswer: 0,
        totalNbAnswer: gameState.totalNbAnswer,
        gameStep: GameStep.Param,
        startTime: undefined,
        endTime: undefined,
      };
    case "guess":
      if (gameState.response != null) {
        return gameState;
      }
      if (action.guess === gameState.date.getDay()) {
        const nbGuess = gameState.currentNbAnswer + 1;
        const win = nbGuess === gameState.totalNbAnswer;
        return {
          ...gameState,
          date: getRandomDate(),
          currentNbAnswer: nbGuess,
          gameStep: win ? GameStep.Win : GameStep.Game,
          endTime: win ? new Date().getTime() : undefined,
        };
      }
      return {
        ...gameState,
        response: action.guess,
        gameStep: GameStep.Lose,
      };
    case "start":
      return {
        ...gameState,
        totalNbAnswer: action.number,
        gameStep: GameStep.Game,
        startTime: new Date().getTime(),
      };
  }
}

const GameStateContext = React.createContext(initialState);
const GameStateDispatcherContext = React.createContext<
  (action: GameAction) => void
>(() => {});

function GameProvider({ children }: { children: React.ReactNode }) {
  const [gameState, dispatch] = React.useReducer(gameReducer, initialState);
  return (
    <GameStateContext.Provider value={gameState}>
      <GameStateDispatcherContext.Provider value={dispatch}>
        {children}
      </GameStateDispatcherContext.Provider>
    </GameStateContext.Provider>
  );
}

function useGameState() {
  return {
    gameState: useContext(GameStateContext),
    gameDispatch: useContext(GameStateDispatcherContext),
  };
}

export {
  type GameAction,
  GameStateContext,
  GameStateDispatcherContext,
  GameProvider,
  useGameState,
  GameStep,
};
