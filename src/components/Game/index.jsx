import React, { useState, useEffect } from 'react';
import Board from '../Board';
import Square from '../Square';

const Game = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isLastPlayer, setIsLastPlayer] = useState(true);
  const [step, setStep] = useState(0);
  const [histories, setHistories] = useState([
    {
      step: null,
      history: Array(9).fill(null),
    },
  ]);

  const addHistory = squareIndex => {
    if (squares[squareIndex]) return;

    const newSquares = squares.slice();
    newSquares[squareIndex] = isLastPlayer ? 'X' : 'O';

    const prevStep = Math.max(...histories.map(history => history.step)) + 1;

    const newHistory =
      prevStep > step
        ? histories.filter((history, index) => index <= step)
        : histories.filter(history => history.step < step + 1);

    const newHistories = {
      step,
      history: newSquares,
    };

    setSquares(newSquares);
    setIsLastPlayer(!isLastPlayer);
    setStep(step + 1);
    setHistories(newHistory.concat(newHistories));
  };

  const jumpTo = index => {
    const { history: prevSquares } = histories.filter((history, idx) =>
      idx <= index ? history : false,
    )[index];

    setSquares(prevSquares);
    setStep(index);
    setIsLastPlayer(index % 2 === 0);
  };

  const calculateWinner = squares => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return `Winner is ${squares[a]}`;
      }
    }

    return `Next Player ${isLastPlayer ? 'X' : 'O'}`;
  };

  const squaresRender = squares.map((square, index) => (
    <Square
      key={index}
      square={square}
      squareIndex={index}
      firstItem={index % 3 ? null : 'first'}
      onAddHistory={addHistory}
    />
  ));

  const historyRender = histories.map((history, index) => {
    const guide = index ? 'Go to move #' + index : 'Go to game start';
    return (
      <li key={index}>
        <button onClick={() => jumpTo(index)}>{guide}</button>
      </li>
    );
  });

  // useEffect(() => {
  //   console.log('squares', squares);
  //   console.log('step', step);
  //   console.log('history', histories);
  //   console.log('isLastPlayer', isLastPlayer);
  // }, [squares, step, histories, isLastPlayer]);

  return (
    <div className="game">
      <Board>{squaresRender}</Board>
      <div className="game-info">
        <div className="status">{calculateWinner(squares)}</div>
        <ol>{historyRender}</ol>
      </div>
    </div>
  );
};

export default Game;
