import { useState } from "react";
import Row from "../components/row";
import Square from "../util/square";

const WIDTH = 20;
const HEIGHT = 10;
const BOMB_WEIGHT = 0.13;

let temp: Square[][] = [];

for (let y = 0; y < HEIGHT; y++) {
  let row: Square[] = [];
  for (let x = 0; x < WIDTH; x++) {
    row.push({
      bomb: Math.random() < BOMB_WEIGHT,
      checked: false,
      index: y * WIDTH + x,
      display: -1,
    });
  }
  temp.push(row);
}

export default function Board() {
  const [board, setBoard] = useState<Square[][]>(temp);

  const handleClick = (index) => {
    let copy = JSON.parse(JSON.stringify(board));
    let [item, x, y] = indexToItem(index, copy);

    if (!item.checked) {
      let count = getCount(x, y);

      item.display = count;

      if (item.bomb) {
        item.display = 10;
      }

      if (count == 0) {
        expandBoard(x, y, copy);
      }

      setBoard(copy);
    }
  };

  const handleRightClick = (index) => {
    let copy = JSON.parse(JSON.stringify(board));
    let [item, x, y] = indexToItem(index, copy);

    if (item.display == -1) {
      item.checked = !item.checked;
    }

    setBoard(copy);
  };

  const getCount = (x, y) => {
    let count = 0;
    for (let x1 = Math.max(x - 1, 0); x1 < x + 2 && x1 < WIDTH; x1++) {
      for (let y1 = Math.max(y - 1, 0); y1 < y + 2 && y1 < HEIGHT; y1++) {
        if (board[y1][x1].bomb) {
          count++;
        }
      }
    }

    return count;
  };

  const expandBoard = (x: number, y: number, board: Square[][]) => {
    for (let x1 = Math.max(x - 1, 0); x1 < x + 2 && x1 < WIDTH; x1++) {
      for (let y1 = Math.max(y - 1, 0); y1 < y + 2 && y1 < HEIGHT; y1++) {
        if (!board[y1][x1].bomb && board[y1][x1].display == -1) {
          let count = getCount(x1, y1);
          board[y1][x1].display = count;

          if (count == 0 && !(x1 == x && y1 == y)) {
            expandBoard(x1, y1, board);
          }
        }
      }
    }
  };

  return (
    <div className="flex flex-col w-full p-1">
      {board.map((item, index) => (
        <Row
          key={index}
          row={item}
          onClick={handleClick}
          onRightClick={handleRightClick}
        />
      ))}
    </div>
  );
}

function indexToItem(
  index: number,
  board: Square[][]
): [Square, number, number] {
  let y = Math.floor(index / WIDTH);
  let x = index - y * WIDTH;
  return [board[y][x], x, y];
}