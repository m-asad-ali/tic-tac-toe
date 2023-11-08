import React, { useState } from "react";
import Square from "./Square";
import EndGame from "./EndGame";

const INITIAL = "";
const A_PLAYER = "X";
const B_PLAYER = "O";
const winCombination = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const TicTacToe = () => {
  const [grid, setGrid] = useState(Array(9).fill(INITIAL));
  const [player, setPlayer] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [draw, setDraw] = useState(false);
  const [winCount, setwinCount] = useState({ A: 0, B: 0 });

  const isGameOver = () => {
    if (!gameFinished) {
      //* X win check
      for (let i = 0; i < 8; i++) {
        if (
          grid[winCombination[i][0]] === A_PLAYER &&
          grid[winCombination[i][1]] === A_PLAYER &&
          grid[winCombination[i][2]] === A_PLAYER
        ) {
          setGameFinished(true);
          setwinCount({ ...winCount, A: winCount.A + 1 });
          console.log("A WON");
          return;
        }
      }

      //* 0 win check
      for (let i = 0; i < 8; i++) {
        if (
          grid[winCombination[i][0]] === B_PLAYER &&
          grid[winCombination[i][1]] === B_PLAYER &&
          grid[winCombination[i][2]] === B_PLAYER
        ) {
          setGameFinished(true);
          setwinCount({ ...winCount, B: winCount.B + 1 });
          console.log("B WON");
          return;
        }
      }

      if (!grid.includes(INITIAL)) {
        setDraw(true);
        setGameFinished(true);
        console.log("Match Draw");
      }
    }
  };

  const restartGame = () => {
    setGrid(Array(9).fill(INITIAL));
    setGameFinished(false);
    setDraw(false);
  };

  const clearHistory = () => {
    setwinCount({ A: 0, B: 0 });
    restartGame();
  };

  const handleClick = (id) => {
    console.log("🚀 ~ file: TicTacToe.js:38 ~ handleClick ~ id", id);

    setGrid(
      grid.map((item, index) => {
        if (index === id) {
          console.log("🚀 ~ file: TicTacToe.js:51 ~ grid.map ~ item", item);
          return player ? A_PLAYER : B_PLAYER;
        } else {
          return item;
        }
      })
    );
    setPlayer(!player);
  };

  isGameOver();

  return (
    <div className="container">
      <div className="heading-text">Tic Tac Toe</div>
      <div>
        <div className="win-history-container">
          <div className="win-history">A: {winCount.A}</div>
          <div className="win-history">B: {winCount.B}</div>
        </div>
        {gameFinished && (
          <EndGame
            winCount={winCount}
            restartGame={restartGame}
            player={player}
            draw={draw}
            clearHistory={clearHistory}
          />
        )}
        <Square clickedArray={grid} handleClick={handleClick} />
      </div>
    </div>
  );
};

export default TicTacToe;
