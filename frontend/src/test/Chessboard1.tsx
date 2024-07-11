import React, { useState } from 'react';
import ChessSquare from './ChessSquare';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import Chessboard from './Chessboard1';

const initialBoardState = [
  ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
  ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
  ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
];

const Chessboard1: React.FC = () => {
  const [board, setBoard] = useState<(string | null)[][]>(initialBoardState);

  const handleDrop = (x: number, y: number, piece: string) => {
    const newBoard = board.map((row, rowIndex) =>
      row.map((square, colIndex) => {
        if (rowIndex === y && colIndex === x) return piece;
        if (square === piece) return null;
        return square;
      })
    );
    setBoard(newBoard);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 100px)' }}>
        {board.map((row, y) =>
          row.map((piece, x) => (
            <ChessSquare
              key={`${x}-${y}`}
              x={x}
              y={y}
              piece={piece}
              onDrop={handleDrop}
            />
          ))
        )}
      </div>
    </DndProvider>
  );
};

export default Chessboard1;
