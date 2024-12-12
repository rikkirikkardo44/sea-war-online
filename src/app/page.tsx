import { Button } from "@/shared/ui/button";
import { db } from "@/shared/lib/db";

export default async function Home() {
  const games: { id: string; name: string }[] = await db.game.findMany();

  return (
    <div>
      <Button>Click me!</Button>
      <ul>
        {games.map((item) => {
          return <li key={item.id}>{JSON.stringify(item)}</li>;
        })}
      </ul>
    </div>
  );
}
