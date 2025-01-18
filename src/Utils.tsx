import { NineGridState } from "./types/GameState";

export function checkRow(grid: NineGridState, rowNumber: number) {
  if (
    grid[rowNumber * 3] === grid[rowNumber * 3 + 1] &&
    grid[rowNumber * 3] === grid[rowNumber * 3 + 2]
  ) {
    return grid[rowNumber * 3]; // X or O
  }
}
export function checkColumn(grid: NineGridState, columnNumber: number) {
  if (
    grid[columnNumber] === grid[columnNumber + 3] &&
    grid[columnNumber] === grid[columnNumber + 6]
  ) {
    return grid[columnNumber]; // X or O
  }
}
export function checkDiagonal(grid: NineGridState) {
  if (grid[0] === grid[4] && grid[0] === grid[8]) {
    return grid[0]; // X or O
  }
  if (grid[2] === grid[4] && grid[2] === grid[6]) {
    return grid[2]; // X or O
  }
}
export function checkWinner(grid: NineGridState) {
  for (let i = 0; i < 3; i++) {
    const rowWinner = checkRow(grid, i);
    if (rowWinner) {
      return rowWinner;
    }
    const columnWinner = checkColumn(grid, i);
    if (columnWinner) {
      return columnWinner;
    }
  }
  const diagonalWinner = checkDiagonal(grid);
  if (diagonalWinner) {
    return diagonalWinner;
  }
  return undefined;
}
