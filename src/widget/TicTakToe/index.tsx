import { useState } from "react";
import style from "./style.module.css";

type PlayerType = "X" | "O";
type SquareType = null | PlayerType;
type WinnerType = PlayerType | "Paritet" | null;
const winnerLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export function TicTakToe() {
  const [history, setHistory] = useState<SquareType[]>(Array(9).fill(null));
  const [player, setPlayer] = useState<PlayerType>("X");
  const [winner, setWinner] = useState<WinnerType>(null);

  const handleReset = () => {
    setHistory(Array(9).fill(null));
    setPlayer("X");
    setWinner(null);
  };

  const handleClick = (
    e: React.SyntheticEvent,
    currentState: SquareType[],
    currentPlayer: PlayerType,
    currentWinner: WinnerType,
  ) => {
    if (currentWinner) {
      return;
    }
    const target = e.target as HTMLDivElement | HTMLButtonElement;
    const targetDataIndex = target.dataset.index;
    if (!targetDataIndex) {
      return;
    }

    const index = Number(targetDataIndex);
    if (!Number.isInteger(index)) {
      return;
    }

    if (
      currentState.filter((i) => i === null).length >= 0 &&
      currentState[index] !== null
    ) {
      return;
    }

    const newHistory = currentState.slice();
    newHistory.splice(Number(index), 1, currentPlayer);

    for (let i = 0; i < winnerLines.length; i += 1) {
      const [a, b, c] = winnerLines[i];
      if (
        newHistory[a] === newHistory[b] &&
        newHistory[a] === newHistory[c] &&
        newHistory[a] !== null
      ) {
        setWinner(currentPlayer);
        break;
      }
    }

    setHistory(newHistory);
    setPlayer((prev) => (prev === "X" ? "O" : "X"));

    if (newHistory.filter((i) => i === null).length === 0) {
      setWinner("Paritet");
    }
  };

  return (
    <section className={style.game}>
      <h1>Tic-Tac-Toe</h1>
      <div
        className={style.board}
        onClick={(e) => handleClick(e, history, player, winner)}
      >
        <div className={style.line}>
          {[...history].slice(0, 3).map((_, index) => (
            <Square key={index} value={history[index]} dataIndex={index} />
          ))}
        </div>
        <div className={style.line}>
          {[...history].slice(3, 6).map((_, index) => (
            <Square
              key={3 + index}
              value={history[3 + index]}
              dataIndex={3 + index}
            />
          ))}
        </div>
        <div className={style.line}>
          {[...history].slice(6, 9).map((_, index) => (
            <Square
              key={6 + index}
              value={history[6 + index]}
              dataIndex={6 + index}
            />
          ))}
        </div>
      </div>
      {winner && (
        <div>
          <h2>Winner: {winner}</h2>
          <hr />
          <button type="button" onClick={() => handleReset()}>
            Reset
          </button>
        </div>
      )}
    </section>
  );
}

function Square({
  value = null,
  dataIndex,
  onSquareClick = () => {},
}: {
  value: SquareType;
  dataIndex: number;
  onSquareClick?: VoidFunction;
}) {
  return (
    <button
      className={style.square}
      data-index={dataIndex}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}
