import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import History from "./components/history/history";
import Switch from "./components/Switch";
import { store } from "./store";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Provider store={store}>
                <Switch />
              </Provider>
            }
          />
          <Route path="history" element={<History />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
