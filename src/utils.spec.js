import { generateMinesweeper, generateMinesByNumber } from "./util";

describe("generateMinesweeper function", () => {
  test("should generate the board with mines correctly", () => {
    expect(generateMinesweeper(5, [[0, 0], [2, 2], [2, 3]]))
      .toEqual([
        ["m", 1, 0, 0, 0],
        [1, 2, 2, 2, 1],
        [0, 1, "m", "m", 1],
        [0, 1, 2, 2, 1],
        [0, 0, 0, 0, 0]
      ]);

    expect(generateMinesweeper(3, [[1, 1]]))
    .toEqual([
      [1, 1, 1],
      [1, "m", 1],
      [1, 1, 1],
    ]);
  });

  test("should generate the board without mines correctly", () => {
    expect(generateMinesweeper(2, []))
      .toEqual([
        [0, 0],
        [0, 0]
      ]);
  });
});

describe("generateMinesByNumber function", () => {
  test("should generate correct number of mines", () => {
    const SIZE = 5;
    const NUM_1 = 1;
    const NUM_2 = 2;

    expect(generateMinesByNumber(SIZE, NUM_1)).toHaveLength(NUM_1);
    expect(generateMinesByNumber(SIZE, NUM_2)).toHaveLength(NUM_2);
  });

  test("generated mines should be within size range", () => {
    const SIZE = 5;
    const NUM = 5;

    const mines = generateMinesByNumber(SIZE, NUM);
    mines.forEach(mine => {
      expect(mine[0]).toBeLessThan(SIZE);
      expect(mine[1]).toBeLessThan(SIZE);
    });
  });
});