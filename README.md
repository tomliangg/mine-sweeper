# Mine Sweeper

## Project Inspiration

Came across this interesting problem when reading _Interview question of the week_ by [rendezvous with cassidoo](https://buttondown.email/cassidoo/archive/we-need-to-do-a-better-job-of-putting-ourselves/). The question was like "Given a grid size, and a set of mines (in pairs of rows and columns), generate the Minesweeper grid for that set of mines".

```js
let gridSize = 5;
let mines = [[0, 0], [2, 2], [2, 3]];

$ generateMinesweeper(gridSize, mines)

m1000
12221
01mm1
01221
00000
```

Output explanation: if the grid has a mine at (i, j) then grid[i][j] = "m". If grid[i][j] is <number>, that simply means there are <number> of mines at the adjacent cells of (i, j). Each cell can have up to 8 adjacent cells (top-left, top-center, top-right, left, right, bottom-left, bottom-center, bottom-right).

To solve this problem, we can first create a grid and init every cell to 0. Then iterate over each mine location to alter grid[i][j] to "m". Lastly, go over each cell and use BFS and count how many "m" at the adjacent cells. I have my own implementation at `src/util.js`.

I realized that I can reuse the core logic of _generateMinesweeper_ and some web technology to recreate the classic game. I use React.js to handle some mouse event and game settings. Lastly, I use SCSS to manage styles.

## Game Rules

- Use mouse left-click to uncover a cell
  - if uncover a mine, you lost
- Use mouse right-click to place a flag on the cell
- You won when all cells are uncovered or flagged

For more rules, read the [wiki reference](<https://en.wikipedia.org/wiki/Minesweeper_(video_game)>)
