import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Создание пользователей
  const user1 = await prisma.user.upsert({
    where: { email: "alice@example.com" },
    update: {}, // Здесь можно указать, как обновлять запись, если она существует
    create: {
      email: "alice@example.com",
      name: "Alice",
      rating: 1000,
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: "bob@example.com" },
    update: {}, // Здесь можно указать, как обновлять запись, если она существует
    create: {
      name: "Bob",
      email: "bob@example.com",
      rating: 1100,
    },
  });

  // Создание игры
  const game = await prisma.game.create({
    data: {
      status: "WAITING_FOR_PLAYERS",
      boardSize: "SMALL",
      allowedCoordinatesX: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
      allowedCoordinatesY: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
      settings: {
        create: {
          timePerTurn: 60,
          allowDiagonalHits: true,
        },
      },
      players: {
        create: [
          {
            userId: user1.id,
            name: user1.name,
            rating: user1.rating,
            ships: {
              create: [
                {
                  location: JSON.stringify([
                    { x: "A", y: "A" },
                    { x: "A", y: "B" },
                  ]),
                  hits: JSON.stringify([]),
                  isSunk: false,
                },
              ],
            },
          },
          {
            userId: user2.id,
            name: user2.name,
            rating: user2.rating,
            ships: {
              create: [
                {
                  location: JSON.stringify([
                    { x: "J", y: "I" },
                    { x: "J", y: "J" },
                  ]),
                  hits: JSON.stringify([]),
                  isSunk: false,
                },
              ],
            },
          },
        ],
      },
    },
    include: {
      players: true, // Включаем игроков в ответ для получения их ID
    },
  });

  // Добавление логов действий
  const player1 = game.players[0];
  if (player1) {
    await prisma.actionLog.create({
      data: {
        gameId: game.id,
        playerId: player1.id,
        action: "PLACE_SHIP",
        target: JSON.stringify({ x: "A", y: "A" }),
      },
    });
  } else {
    console.error("Player 1 not found in game.players");
  }

  console.log("Seeding completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
