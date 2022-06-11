import React from "react";
import "./App.css";
import Pomo from "./components/Pomo";
import { StateProvider } from "./StateStore";

function App() {
  return (
    <StateProvider>
      <div className="App">
        <Pomo />
      </div>
    </StateProvider>
  );
}

export default App;
