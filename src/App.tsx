import "./App.css";
import { GameProvider } from "./components/GameState";
import Switch from "./components/Switch";

function App() {
  return (
    <div className="App">
      <GameProvider>
        <Switch />
      </GameProvider>
    </div>
  );
}

export default App;
