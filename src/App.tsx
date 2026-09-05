// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { Link } from "@tanstack/react-router";
import "./App.css";
import { ColorGame } from "./widget/ColorGame";
import { TicTakToe } from "./widget/TicTakToe";

function App() {
  return (
    <div>
      <Link to="/color-game">Color Game</Link>
      <ColorGame />
      <br />
      <TicTakToe />
    </div>
  );
}

export default App;
