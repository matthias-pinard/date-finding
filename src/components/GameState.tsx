import React from "react";

interface GameState {
  date: Date;
  response: number | undefined;
  isCorrect: boolean;
  isIncorect: boolean;
}

const initialState: GameState = {
  date: getRandomDate(),
  response: undefined,
  isCorrect: false,
  isIncorect: false,
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

type GameAction = { type: "reset" } | { type: "guess"; guess: number };

export default function gameReducer(
  gameState: GameState,
  action: GameAction
): GameState {
  switch (action.type) {
    case "reset":
      return {
        date: getRandomDate(),
        response: undefined,
        isCorrect: false,
        isIncorect: false,
      };
    case "guess":
      if (gameState.response != null) {
        return gameState;
      }
      return {
        ...gameState,
        response: action.guess,
        isCorrect: action.guess === gameState.date.getDay(),
        isIncorect: action.guess !== gameState.date.getDay(),
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

export {
  type GameAction,
  GameStateContext,
  GameStateDispatcherContext,
  GameProvider,
};
