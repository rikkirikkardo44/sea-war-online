import { GameStatus, BoardSize, CellCoordinate } from "./domain";

export const gameStatusNameMap: Record<GameStatus, string> = {
  [GameStatus.Finished]: "Завершена",
  [GameStatus.InProgress]: "В процессе",
  [GameStatus.WaitingForPlayers]: "Ожидание игроков",
};

export const boardSizeNameMap: Record<BoardSize, string> = {
  [BoardSize.Small]: "10x10",
  [BoardSize.Medium]: "15x15",
  [BoardSize.Large]: "20x20",
};

export const standartBoard = [
  CellCoordinate.A,
  CellCoordinate.B,
  CellCoordinate.C,
  CellCoordinate.D,
  CellCoordinate.E,
  CellCoordinate.F,
  CellCoordinate.G,
  CellCoordinate.H,
  CellCoordinate.I,
  CellCoordinate.J,
];
