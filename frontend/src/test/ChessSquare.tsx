import React from 'react';
import { useDrop } from 'react-dnd';
import ChessPiece from './ChessPiece';

interface ChessSquareProps {
  x: number;
  y: number;
  piece: string | null;
  onDrop: (x: number, y: number, piece: string) => void;
}

const ChessSquare: React.FC<ChessSquareProps> = ({ x, y, piece, onDrop }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'CHESS_PIECE',
    drop: (item: { id: string; pieceType: string }) =>
      onDrop(x, y, item.pieceType),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      style={{
        position: 'relative',
        width: '100px',
        height: '100px',
        backgroundColor: (x + y) % 2 === 1 ? 'black' : 'white',
        color: (x + y) % 2 === 1 ? 'white' : 'black',
      }}
    >
      {piece && <ChessPiece id={`${x}-${y}`} pieceType={piece} />}
      {isOver && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            zIndex: 1,
            opacity: 0.5,
            backgroundColor: 'yellow',
          }}
        />
      )}
    </div>
  );
};

export default ChessSquare;
