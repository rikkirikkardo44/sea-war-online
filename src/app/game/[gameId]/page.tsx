import React from "react";

import { gameRepository, CellCoordinate } from "@/entities/game";

import { Board } from "@/features/board";

export async function generateMetadata({
  params,
}: {
  params: { gameId: string };
}) {
  const data = await gameRepository.getGameById(params.gameId);
  return {
    title: `Game ${data?.id}`,
  };
}

export default async function Game({ params }: { params: { gameId: string } }) {
  const data = await gameRepository.getGameById(params.gameId);
  console.log(data);
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Board hits={[{ x: CellCoordinate.C, y: CellCoordinate.B }]} ships={[]} />
    </div>
  );
}
