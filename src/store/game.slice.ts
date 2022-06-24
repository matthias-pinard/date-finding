import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { invoke } from "@tauri-apps/api";
import { AppDispatch, RootState } from "../store";
import { getRandomDate } from "../utils/date-utils";

interface GameState {
  date?: Date;
  response?: number;
  currentNbAnswer: number;
  totalNbAnswer: number;
  gameStep: GameStep;
  startTime?: number;
  endTime?: number;
  history: {
    guess: number;
    response: number;
    time: number;
    date: string;
  }[];
}

export enum GameStep {
  Param,
  Game,
  Win,
  Lose,
}

const initialState: GameState = {
  date: undefined,
  response: undefined,
  currentNbAnswer: 0,
  totalNbAnswer: 5,
  gameStep: GameStep.Param,
  startTime: undefined,
  endTime: undefined,
  history: [],
};

function save() {
  return async (_dispatch: AppDispatch, getState: () => RootState) => {
    if ("__TAURI__" in window) {
      const {
        startTime,
        endTime,
        currentNbAnswer,
        totalNbAnswer,
        gameStep,
        history,
        date,
      } = getState().game;
      const win = gameStep === GameStep.Win;
      const bad_date = !win ? date?.toLocaleString("fr") : null;
      const gameId = await invoke("save_score", {
        time: endTime! - startTime!,
        nbResponse: currentNbAnswer,
        totalResponse: totalNbAnswer,
        win: win,
        date: startTime,
        badDate: bad_date,
      });
      history.forEach(async (elem, index) => {
        await invoke("save_guess", {
          gameId: gameId,
          time: elem.time,
          responseNumber: index,
          guess: elem.guess,
          response: elem.response,
          date: date,
        });
      });
    }
  };
}

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    start(
      gameState,
      action: PayloadAction<{
        nbAnswer: number;
        startTime: number;
        firstDate: number;
      }>
    ) {
      return {
        ...gameState,
        totalNbAnswer: action.payload.nbAnswer,
        gameStep: GameStep.Game,
        startTime: action.payload.startTime,
        date: new Date(action.payload.firstDate),
        response: new Date(action.payload.firstDate).getDay(),
      };
    },
    reset() {
      // TODO put random action outside of reducers
      return { ...initialState, date: getRandomDate() };
    },
    guess(
      state,
      action: PayloadAction<{
        guess: number;
        nextDate: number;
        time: number;
        date: string;
      }>
    ) {
      state.history.push({
        guess: action.payload.guess,
        response: state.response!,
        time: action.payload.time,
        date: action.payload.date,
      });
      if (action.payload.guess === state.date?.getDay()) {
        state.currentNbAnswer += 1;
        state.date = new Date(action.payload.nextDate);
        if (state.currentNbAnswer === state.totalNbAnswer) {
          state.gameStep = GameStep.Win;
          state.endTime = action.payload.time;
        }
      } else {
        state.response = action.payload.guess;
        state.endTime = action.payload.time;
        state.gameStep = GameStep.Lose;
      }
    },
  },
});

export const { start, guess, reset } = gameSlice.actions;
export { save };
export default gameSlice.reducer;
