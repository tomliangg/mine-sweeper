import { useState, useEffect } from "react";
import { cloneDeep } from "lodash";
import "./styles.scss";
import {
  generateMinesweeper,
  traverse,
  generateMinesByNumber,
  isGameFinished
} from "./util";

const settings = [
  {
    difficulty: "easy",
    boardSize: 5,
    numOfMines: 4,
    flags: 7
  },
  {
    difficulty: "medium",
    boardSize: 8,
    numOfMines: 10,
    flags: 12
  },
  {
    difficulty: "hard",
    boardSize: 12,
    numOfMines: 15,
    flags: 16
  },
  {
    difficulty: "expert",
    boardSize: 15,
    numOfMines: 30,
    flags: 31
  }
];

export default function App() {
  const [selected, setSelected] = useState(settings[0]);
  const [flags, setFlags] = useState(selected.flags);
  const [cheatMode, setCheatMode] = useState(false);
  const [board, setBoard] = useState(
    generateMinesweeper(
      selected.boardSize,
      generateMinesByNumber(selected.boardSize, selected.numOfMines)
    )
  );

  const [status, setStatus] = useState("playing");

  useEffect(() => {
    handleRestartGame();
  }, [selected.difficulty]);

  const shouldDisplayCell = (i, j) =>
    status !== "playing" ||
    String(board[i][j]).indexOf("#") > -1 ||
    String(board[i][j]).indexOf("f") > -1;

  const renderCell = (i, j) => {
    const val = String(board[i][j]).replace("#", "").replace("0", "");
    if (cheatMode && val === "m") {
      return "💣";
    }
    if (!shouldDisplayCell(i, j)) {
      return "";
    }

    if (val === "m") {
      return "💣";
    }

    if (val.indexOf("f") > -1) {
      return "🚩";
    }

    return val;
  };

  const handleCellClick = (i, j) => {
    if (status !== "playing") {
      return;
    }
    const val = String(board[i][j]);
    if (val.indexOf("f") > -1) {
      return;
    }
    const copyBoard = cloneDeep(board);
    if (val === "m") {
      copyBoard[i][j] = "#m";
      setStatus("lost");
    } else {
      traverse(copyBoard, i, j);
    }
    setBoard(copyBoard);
    if (isGameFinished(copyBoard)) {
      setStatus("won");
    }
  };

  const handleRightClick = (e, i, j) => {
    e.preventDefault();
    if (status !== "playing") {
      return;
    }
    const val = String(board[i][j]);
    if (val.indexOf("#") > -1) {
      return;
    }

    const copyBoard = cloneDeep(board);

    // remove a flag
    if (val.indexOf("f") > -1) {
      copyBoard[i][j] = val.replace("f", "");
      setBoard(copyBoard);
      setFlags(flags + 1);
      return;
    }

    // add a flag
    if (flags > 0) {
      copyBoard[i][j] = val + "f";
      setBoard(copyBoard);
      setFlags(flags - 1);
      if (isGameFinished(copyBoard)) {
        setStatus("won");
      }
    }
  };

  const handleRestartGame = () => {
    setStatus("playing");
    setFlags(selected.flags);
    setBoard(
      generateMinesweeper(
        selected.boardSize,
        generateMinesByNumber(selected.boardSize, selected.numOfMines)
      )
    );
  };

  return (
    <div className="App">
      <label htmlFor="difficulty">Choose a difficulty:</label>
      <select
        className="selectDifficulty"
        name="difficulty"
        onChange={(e) => {
          setSelected(JSON.parse(e.target.value));
        }}
      >
        {settings.map((setting, index) => (
          <option
            key={setting.difficulty}
            value={JSON.stringify(settings[index])}
          >
            {setting.difficulty}
          </option>
        ))}
      </select>
      <br />
      <label htmlFor="cheatMode"> Cheat mode</label>
      <input
        type="checkbox"
        name="cheatMode"
        onChange={(e) => setCheatMode(e.target.checked)}
      />
      <p>Flags: {flags}</p>
      <p>Mines: {selected.numOfMines}</p>
      <button className="restartBtn" onClick={handleRestartGame}>
        Restart game
      </button>

      <div className="board">
        {board.map((rowData, i) => (
          <div key={`row-${i}`} className="row">
            {rowData.map((_, j) => (
              <div
                key={`cell-${i}-${j}`}
                className={`cell ${
                  shouldDisplayCell(i, j) ? "revealed" : "unvisited"
                } ${
                  board[i][j] === "#m" && status !== "playing"
                    ? "activeMine"
                    : "regularCell"
                }`}
                disabled={status !== "playing"}
                onClick={() => handleCellClick(i, j)}
                onContextMenu={(e) => handleRightClick(e, i, j)}
              >
                {renderCell(i, j)}
              </div>
            ))}
          </div>
        ))}
      </div>
      {status !== "playing" && (
        <div className={`info ${status}`} onClick={handleRestartGame}>
          <p>{`you ${status} (click here to play again)`}</p>
        </div>
      )}
    </div>
  );
}
