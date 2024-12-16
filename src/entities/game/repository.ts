import { db } from "@/shared/lib/db";

import {
  type Game,
  type Player,
  type ActionLog,
  type GameListItem,
  type Ship,
  type Cell,
  GameStatus,
  BoardSize,
} from "./domain";

const sleep = async (time: number): Promise<void> => {
  return new Promise((res) => {
    setTimeout(() => {
      res();
    }, time);
  });
};

export const gameRepository = {
  async getGamesList(): Promise<GameListItem[]> {
    await sleep(2000);

    const games = await db.game.findMany({
      select: {
        id: true,
        status: true,
        boardSize: true,
        players: {
          select: {
            id: true,
          },
        },
      },
    });

    return games.map((game) => ({
      id: game.id,
      status: game.status as GameStatus,
      boardSize: game.boardSize as BoardSize,
      playersCount: game.players.length,
    }));
  },

  async getGameById(gameId: string): Promise<Game | null> {
    const game = await db.game.findUnique({
      where: { id: gameId },
      include: {
        settings: true,
        actionsLog: true,
        players: {
          include: {
            ships: true,
          },
        },
      },
    });

    if (!game) return null;

    return {
      id: game.id,
      status: game.status as GameStatus,
      boardSize: game.boardSize as BoardSize,
      settings: {
        timePerTurn: game.settings?.timePerTurn ?? 0,
        allowDiagonalHits: game.settings?.allowDiagonalHits ?? false,
      },
      players: game.players?.map((player) => ({
        id: player.id,
        userId: player.userId,
        name: player.name,
        rating: player.rating,
        ships: player.ships.map(
          (ship) =>
            ({
              location: ship?.location
                ? (JSON.parse(ship.location as string) as Cell[])
                : [],
              hits: ship?.hits
                ? (JSON.parse(ship.hits as string) as Cell[])
                : [],
              isSunk: ship.isSunk,
            }) as Ship,
        ),
      })) as Player[],
      actionLogs: game.actionLogs?.map((log) => ({
        action: log.action,
        target: log.target ? (JSON.parse(log.target) as Cell) : null,
        timestamp: log.createdAt,
        playerId: log.playerId,
      })) as ActionLog[],
    };
  },
};
