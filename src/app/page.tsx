import React from "react";

import { GamesList } from "@/features/games-list";

export default async function Home() {
  return (
    <div className="grid gap-4 grid-cols-3 grid-rows-3 p-4">
      <GamesList />
    </div>
  );
}
