import React from 'react';
import { useDrag } from 'react-dnd';

interface ChessPieceProps {
  id: string;
  pieceType: string;
}

const ChessPiece: React.FC<ChessPieceProps> = ({ id, pieceType }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'CHESS_PIECE',
    item: { id, pieceType },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        fontSize: 40,
        fontWeight: 'bold',
        cursor: 'move',
      }}
    >
      {pieceType}
    </div>
  );
};

export default ChessPiece;
