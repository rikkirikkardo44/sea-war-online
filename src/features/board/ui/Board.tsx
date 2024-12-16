"use client";

import React, { useState, type FC } from "react";

import { standartBoard, type Ship, type Cell } from "@/entities/game";

type Props = {
  /** Координаты выстрелов */
  hits: Cell[];
  /** Корабли */
  ships: Ship[];
};

export const Board: FC<Props> = ({ hits }) => {
  const [selected, setSelected] = useState(hits);

  return (
    <div className="grid grid-cols-10 grid-rows-10 justify-center w-max">
      {standartBoard.map((y) => {
        return standartBoard.map((x) => {
          const isHitted = selected.find(
            (item) => item.x === x && item.y === y,
          );

          return (
            <div
              key={`y_${y}_x_${x}`}
              className={`size-16 border-2 border-gray-900 flex justify-center items-center ${isHitted ? "" : "hover:bg-slate-900 hover:cursor-pointer"}`}
              onClick={() => {
                if (!isHitted) {
                  setSelected((prev) => [...prev, { x, y }]);
                }
              }}
            >
              {isHitted ? (
                <span className="size-4 bg-slate-700 rounded-full" />
              ) : null}
            </div>
          );
        });
      })}
    </div>
  );
};
