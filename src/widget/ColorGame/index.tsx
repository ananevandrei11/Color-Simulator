import { useReducer } from "react";
import { generateColors } from "../../utils";
import type { GameState } from "../../types";
import clsx from "clsx";

type State = {
  targetColor: string | null;
  selectedColor: string | null;
  options: string[];
  gameState: GameState;
  score?: number;
};

type Action =
  | { type: 'start' }
  | { type: 'next' }
  | { type: 'reset' }
  | { type: 'answer', payload: { selectedColor: string } };

const initState: State = {
  targetColor: null,
  selectedColor: null,
  options: [],
  gameState: 'idle',
  score: 0,
};

function createStartState() {
  const { target, options } = generateColors();
  return {
    selectedColor: null,
    targetColor: target,
    options,
    gameState: 'idle',
    score: 0,
  } as State;
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'start':
      {
        const initState = createStartState();
        return {
          ...state,
          ...initState,
        };
      }
    case 'next':
      {
        const { target, options } = generateColors();
        return {
          ...state,
          targetColor: target,
          selectedColor: null,
          options,
          gameState: 'idle',
        };
      }
    case "answer":
      const selectedColor = action.payload.selectedColor;
      const isCorrect = selectedColor === state.targetColor;
      const newGameState: GameState = isCorrect ? 'correct' : 'wrong';
      return {
        ...state,
        selectedColor,
        gameState: newGameState,
        score: newGameState === 'correct' ? (state.score || 0) + 1 : state.score,
      };
    default:
      throw Error('Unknown action.');
  }
}

export const ColorGame = () => {
  const [state, dispatch] = useReducer(reducer, initState, createStartState);

  const handleOptionClick = (selectedColor: string) => {
    if (!state.targetColor) return;
    dispatch({
      type: 'answer',
      payload: {
        selectedColor
      }
    });
  };

  return (
    <div className="color-game-container max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg text-gray-800">
      <h2 className="text-2xl font-bold text-center mb-6 ">Color Game</h2>

      <div className="target-color-display mb-8">
        <div
          className="w-full h-32 rounded-lg shadow-md border-2 border-gray-300 transition-all duration-300"
          style={{ backgroundColor: state.targetColor || "#ffffff" }}
        />
      </div>

      <div className="options-grid grid grid-cols-2 gap-4 mb-6">
        {state.options.map((color) => (
          <button
            key={color}
            disabled={state.gameState !== 'idle'}
            onClick={() => handleOptionClick(color)}
            className={clsx("option-button w-full py-4 px-2 rounded-lg shadow-md transition-all duration-200 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2", {
              "focus:ring-green-500 ring-2 ring-green-500": (state.selectedColor === color && state.selectedColor === state.targetColor) || (state.gameState !== 'idle' && state.targetColor === color),
              "focus:ring-red-500 ring-2 ring-red-500": state.selectedColor === color && state.selectedColor !== state.targetColor
            })}
          >
            {color}
          </button>
        ))}
      </div>

      <div className="game-status text-center">
        <p className="text-lg font-semibold text-gray-700">
          Score: <span className="text-blue-600">{state.score}</span>
        </p>

        {state.gameState !== 'idle' && (
          <div className={`mt-2 text-lg font-bold ${state.gameState === 'correct' ? 'text-green-600' : 'text-red-600'}`}>
            {state.gameState === 'correct' ? 'Correct!' : 'Try again!'}
          </div>
        )}
      </div>

      <div className="flex gap-2 mt-6">
        <button
          onClick={() => dispatch({ type: 'next' })}
          className="w-full py-3 px-4 bg-amber-700 text-white font-medium rounded-lg shadow-md hover:bg-amber-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
        >
          Next Game
        </button>
        <button
          onClick={() => dispatch({ type: 'start' })}
          className="w-full py-3 px-4 bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Restart Game
        </button>
      </div>
    </div>
  )
}