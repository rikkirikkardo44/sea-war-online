import React, { Suspense } from "react";
import Link from "next/link";

import { Button } from "@/shared/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardFooter,
  CardContent,
} from "@/shared/ui/card";

import {
  gameRepository,
  gameStatusNameMap,
  boardSizeNameMap,
} from "@/entities/game";

import { SkeletonCard } from "./SkeletonCard";
import { GameStatus } from "@/entities/game/domain";

const GamesListContent = async () => {
  const games = await gameRepository.getGamesList();

  return (
    <section>
      {games.map((item, index) => (
        <Card key={item.id}>
          <CardHeader>
            <CardTitle className="flex justify-center">
              Game {index + 1}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-none">
              <li>Статус: {gameStatusNameMap[item.status]}</li>
              <li>Размер: {boardSizeNameMap[item.boardSize]}</li>
              <li>Игроки: {item.playersCount}</li>
            </ul>
          </CardContent>
          {item.status === GameStatus.WaitingForPlayers && (
            <CardFooter className="flex justify-end">
              <Link href={`/game/${item.id}`}>
                <Button>Подключится</Button>
              </Link>
            </CardFooter>
          )}
        </Card>
      ))}
    </section>
  );
};

export const GamesList = () => (
  <Suspense
    fallback={[1, 2, 3, 4, 5, 6].map((key) => (
      <SkeletonCard key={key} />
    ))}
  >
    <GamesListContent />
  </Suspense>
);
