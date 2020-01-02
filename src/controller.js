import React from "react";

const Controller = props => {
  const change = e => {
    let value = e.target.value;
    if (isNaN(value)) return;
    if (value > 20) value = 20;

    props.change(e.target.name, value);
  };

  return (
    <div className="controller">
      <div>
        <span className="label">画板大小：</span>
        <input type="text" name="width" value={props.width} onChange={change} />
        <span>*</span>
        <input
          type="text"
          name="height"
          value={props.height}
          onChange={change}
        />
      </div>
      <div>
        <span className="label">连棋数量：</span>
        <input type="text" name="count" value={props.count} onChange={change} />
      </div>
      <div>
        <span className="label">下一步棋：</span>
        <span>{props.winPlayer ? "无" : props.nextPlayer}</span>
      </div>
      <div>
        <span className="label">胜利玩家：</span>
        <span>{props.winPlayer || "无"}</span>
      </div>
    </div>
  );
};

export default Controller;
