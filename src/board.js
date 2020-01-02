import React from "react";

const Square = props => {
  let { x, y, data } = props;
  let coord = `${y}${x}`;
  let square = data[coord] || { x, y };
  let className = "square";
  if (props.winPlayer || square.value) className += " no-drop";
  if (square.win) className += " win-square";
  const click = () => {
    if (!square.value) {
      square.value = props.nextPlayer;
      props.squareClick(coord, square);
    }
  };

  return (
    <div className={className} onClick={click} title={`${y},${x}`}>
      <span> {square.value}</span>
    </div>
  );
};

const warpEles = (Component, len) => {
  let eles = [];
  for (let i = 0; i < len; i++) {
    eles.push(Component(i));
  }
  return eles;
};

const Squares = props => {
  return warpEles(
    x => <Square {...props} key={`${props.y},${x}`} x={x} />,
    props.width
  );
};

const BoardRows = props => {
  return warpEles(i => {
    return (
      <div className="board-row" key={i}>
        <Squares {...props} y={i} />
      </div>
    );
  }, props.height);
};

const Board = props => {
  return (
    <div className="board">
      <BoardRows {...props}></BoardRows>
    </div>
  );
};

export default Board;
