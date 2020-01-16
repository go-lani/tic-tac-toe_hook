import React from 'react';

const Square = ({ square, squareIndex, firstItem, onAddHistory }) => {
  return (
    <div
      className={firstItem ? 'square first' : 'square'}
      onClick={() => onAddHistory(squareIndex)}
    >
      {square}
    </div>
  );
};

export default Square;
