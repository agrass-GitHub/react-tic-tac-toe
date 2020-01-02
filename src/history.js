import React from "react";

const History = props => {
  let stepIndex = props.stepIndex;
  return (
    <div className="history">
      <button onClick={props.initGame}>重新开始</button>
      <div
        className="items"
        onMouseLeave={() => props.jumpTo(stepIndex, false)}
      >
        {props.history.map((v, index) => {
          let isCurrent = index === stepIndex;
          return (
            <button
              key={index}
              className={isCurrent ? "current" : ""}
              onClick={() => props.jumpTo(index, true)}
              onMouseEnter={() => props.jumpTo(index, false)}
            >
              {isCurrent ? "当前" : "快照" + (index + 1)}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default History;
