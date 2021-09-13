export const MINE = "m";
/**
 *
 * @param {number} size - size of board
 * @param {number[]} mines - mine location (row, column)
 * each cell has up to 8 adjacent cells
 * cell value (type: string):
 * 0 - no mine in the adjacent cells
 * 1 - 1 mine in the adjacent cells
 * 2 - 2 mines in the adjacent cells
 * 3 - 3 mines in the adjacent cells
 * m - mine
 */
export const generateMinesweeper = (size, mines) => {
  const board = Array(size)
    .fill()
    .map((_) => Array(size).fill(0));
  mines.forEach((mine) => {
    const [i, j] = mine;
    board[i][j] = MINE;
  });

  const dirs = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1]
  ];

  const countMinesForCell = (i, j) => {
    let mines = 0;
    dirs.forEach((dir) => {
      const neighborI = i + dir[0];
      const neighborJ = j + dir[1];
      if (board[neighborI] && board[neighborI][neighborJ] === MINE) {
        mines++;
      }
    });
    return mines;
  };

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (board[i][j] === 0) {
        board[i][j] = countMinesForCell(i, j);
      }
    }
  }

  return board;
};

export const traverse = (board, i, j) => {
  const n = board.length;
  if (i < 0 || i >= n || j < 0 || j >= n) {
    return;
  }

  const cellVal = board[i][j];
  if (cellVal === 0) {
    board[i][j] = "#";
    traverse(board, i - 1, j); // up
    traverse(board, i + 1, j); // down
    traverse(board, i, j - 1); // left
    traverse(board, i, j + 1); // right
  }

  if (cellVal > 0) {
    board[i][j] = `#${cellVal}`; // add "#" to reveal the cell for UI
    return;
  }
};

/**
 *
 * @param {number} size - board size
 * @param {number} num - number of mines to be randomly placed in mines
 */
export const generateMinesByNumber = (size, num) => {
  if (num >= size * size) {
    throw Error("way too many mines for the board");
  }

  const mines = [];
  const seen = new Set();
  for (let i = 0; i < num; i++) {
    const prevSize = seen.size;
    let i, j;
    while (prevSize === seen.size) {
      i = Math.floor(Math.random() * size);
      j = Math.floor(Math.random() * size);
      const position = String(i) + "-" + String(j);
      seen.add(position);
    }
    mines.push([i, j]);
  }
  return mines;
};

export const isGameFinished = (board) => {
  const n = board.length;
  let total = n * n;
  let counts = 0;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      const val = String(board[i][j]);
      if (val.indexOf("#") > -1 || val.indexOf("f") > -1) {
        counts++;
      }
    }
  }
  return counts === total;
};
