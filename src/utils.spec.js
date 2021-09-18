import { generateMinesweeper } from "./util";

describe("utils functions", () => {
  test("generateMinesweeper should generate the board with mines correctly", () => {
    expect(generateMinesweeper(5, [[0, 0], [2, 2], [2, 3]]))
      .toEqual([
        ["m", 1, 0, 0, 0],
        [1, 2, 2, 2, 1],
        [0, 1, "m", "m", 1],
        [0, 1, 2, 2, 1],
        [0, 0, 0, 0, 0]
      ]);
  });

  test("generateMinesweeper should generate the board without mines correctly", () => {
    expect(generateMinesweeper(2, []))
      .toEqual([
        [0, 0],
        [0, 0]
      ]);
  });
})