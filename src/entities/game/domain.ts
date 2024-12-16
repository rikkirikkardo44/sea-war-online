/** Основная модель игры */
export type Game = {
  /** Идентификатор игры */
  id: string;
  /** Статус */
  status: GameStatus;
  /** Игроки */
  players: Player[];
  /** Идентификтор активного игрока */
  activePlayerId: string;
  /** Размер поля */
  boardSize: BoardSize;
  /** Доступные координаты */
  allowedCoordinates: {
    x: CellCoordinate[];
    y: CellCoordinate[];
    z?: CellLevel[];
  };
  /** Время начала игры */
  startTime?: Date;
  /** Время окончания игры */
  endTime?: Date;
  /** Время начала текущего хода */
  currentTurnStartTime?: Date;
  /** Параметры игры */
  settings: GameSettings;
  /** Лог действий */
  actionsLog?: ActionLog[];
  /** Результаты */
  results?: GameResults;
};

export type GameListItem = {
  /** Идентификатор игры */
  id: string;
  /** Статус */
  status: GameStatus;
  /** Размер поля */
  boardSize: BoardSize;
  /** Количество игроков */
  playersCount: number;
};

/** Игрок */
export type Player = {
  /** Идентификатор */
  id: string;
  /** Идентификатор пользователя */
  userId?: string;
  /** Имя */
  name: string;
  /** Рейтинг */
  rating: number;
  /** Корабли */
  ships: Ship[];
};

/** Корабль */
export type Ship = {
  /** Идентификатор */
  id: string;
  /** Координаты клеток, занятых кораблем */
  location: Cell[];
  /** Координаты попаданий по кораблю */
  hits: Cell[];
  /** Признак, потоплен ли корабль */
  isSunk: boolean;
};

/** Результаты игры */
export type GameResults = {
  /** Идентификаторы победителей */
  winnerId: string[];
  /** Список результатов для всех игроков */
  scores: PlayerScore[];
};

/** Счет пользователя */
export type PlayerScore = {
  /** Идентификатор игрока */
  playerId: string;
  /** Количество попаданий */
  hits: number;
  /** Количество промахов */
  missedShots: number;
  /** Потопленные корабли */
  shipsSunk: number;
  /** Признак является ли игрок победителем */
  isWinner: boolean;
};

/** Координаты клетки */
export type Cell = {
  /** Координата по X */
  x: CellCoordinate;
  /** Координата по Y */
  y: CellCoordinate;
  /** Уровень (опционально) */
  z?: CellLevel;
};

/** Координаты и уровни */
export enum CellCoordinate {
  /** 10x10 */
  A = "A",
  B = "B",
  C = "C",
  D = "D",
  E = "E",
  F = "F",
  G = "G",
  H = "H",
  I = "I",
  J = "J",
  /** 15x15 */
  K = "K",
  L = "L",
  M = "M",
  N = "N",
  /** 20x20 */
  O = "O",
  P = "P",
  Q = "Q",
  R = "R",
  S = "S",
  T = "T",
}

/** Уровень ячейки */
export enum CellLevel {
  /** Поверхность */
  Surface = "Surface",
  /** Под водой */
  Underwater = "Underwater",
  /** В воздухе */
  Air = "Air",
}

/** Параметры игры */
export type GameSettings = {
  /** Время на ход (в секундах) */
  timePerTurn?: number;
  /** Разрешены ли диагональные выстрелы */
  allowDiagonalHits?: boolean;
  /** Правила расстановки кораблей */
  shipPlacementRules?: "strict" | "flexible";
  /** Максимальное количество игроков */
  maxPlayers?: number;
};

/** Лог действий */
export type ActionLog = {
  /** Идентификатор игрока */
  playerId: string;
  /** Тип действия */
  action: ActionType;
  /** Время действия */
  timestamp: Date;
  /** Цель действия */
  target?: Cell;
  /** Детали */
  details?: string;
};

/** Тип действия */
export enum ActionType {
  /** Выстрел */
  Shoot = "Shoot",
  /** Перемещение корабля */
  MoveShip = "MoveShip",
  /** Расстановка корабля */
  PlaceShip = "PlaceShip",
  /** Завершение хода */
  EndTurn = "EndTurn",
}

/** Размеры поля */
export enum BoardSize {
  Small = "SMALL",
  Medium = "MEDIUM",
  Large = "LARGE",
}

/** Статусы игры */
export enum GameStatus {
  WaitingForPlayers = "WAITING_FOR_PLAYERS",
  InProgress = "IN_PROGRESS",
  Finished = "FINISHED",
}
