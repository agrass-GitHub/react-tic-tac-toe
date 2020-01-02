import React from "react";
import Controller from "./controller";
import Board from "./board";
import History from "./history";
import "./style.scss";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getInitState();
    this.boardSizeChange = this.boardSizeChange.bind(this);
    this.squareClick = this.squareClick.bind(this);
    this.jumpTo = this.jumpTo.bind(this);
    this.initGame = this.initGame.bind(this);
  }

  render() {
    const state = this.state;
    return (
      <div className="game">
        <h1 className="game-title">
          TIC TAC TOE {state.winPlayer ? "游戏结束" : ""}
        </h1>
        <History
          history={state.history}
          stepIndex={state.stepIndex}
          initGame={this.initGame}
          jumpTo={this.jumpTo}
        ></History>
        <Board {...state} squareClick={this.squareClick}></Board>
        <Controller
          width={state.width}
          height={state.height}
          count={state.count}
          winPlayer={state.winPlayer}
          nextPlayer={state.nextPlayer}
          change={this.boardSizeChange}
        ></Controller>
      </div>
    );
  }

  getInitState() {
    return {
      history: [],
      data: {},
      stepIndex: 0,
      count: 5,
      width: 15,
      height: 15,
      nextPlayer: "x",
      winPlayer: ""
    };
  }

  initGame() {
    this.setState(this.getInitState());
  }

  calculateWinnerByCoord(squares, square) {
    const { x, y } = square;
    const size = this.state.count - 1;

    const calculate = (total, getSquare) => {
      let count = [];
      for (let index = 0; index < total; index++) {
        let { now, next } = getSquare(index);
        if (now && next && now.value === next.value) {
          count.push(now);
          if (count.length === size) {
            count.push(next);
            return count;
          }
        } else {
          count = [];
        }
      }
      return "";
    };

    const calculateY = () => {
      let start = y - size < 0 ? 0 : y - size;
      return calculate(y + size, index => {
        let now = squares[`${start + index}${x}`];
        let next = squares[`${start + index + 1}${x}`];
        return { now, next };
      });
    };

    const calculateX = () => {
      let start = x - size < 0 ? 0 : x - size;
      return calculate(x + size, index => {
        let now = squares[`${y}${start + index}`];
        let next = squares[`${y}${start + index + 1}`];
        return { now, next };
      });
    };

    const calculateL = () => {
      let startY = y - size;
      let startX = x - size;
      return calculate(size * size, index => {
        let now = squares[`${startY + index}${startX + index}`];
        let next = squares[`${startY + index + 1}${startX + index + 1}`];
        return { now, next };
      });
    };

    const calculateR = () => {
      let startY = y - size;
      let startX = x + size;
      return calculate(size * size, index => {
        let now = squares[`${startY + index}${startX - index}`];
        let next = squares[`${startY + index + 1}${startX - index - 1}`];
        return { now, next };
      });
    };

    return calculateY() || calculateX() || calculateL() || calculateR();
  }

  boardSizeChange(name, value) {
    this.setState({ [name]: value });
  }

  jumpTo(index, isClick) {
    let record = this.state.history[index];
    if (!record) return;
    if (isClick) {
      this.setState(record);
    } else {
      let { history, stepIndex } = this.state;
      this.setState({ ...record, history, stepIndex });
    }
  }

  squareClick(coord, square) {
    if (this.state.winPlayer) return;
    let data = Object.assign({}, this.state.data);
    data[coord] = square;
    let winCoords = this.calculateWinnerByCoord(data, square);
    let winPlayer = "";
    if (winCoords) {
      winPlayer = winCoords[0].value;
      winCoords.forEach(v => {
        data[`${v.y}${v.x}`].win = true;
      });
    }
    let nextPlayer = square.value === "o" ? "x" : "o";
    let stepIndex = this.state.history.length;
    let newState = { ...this.state, data, nextPlayer, winPlayer, stepIndex };
    newState.history = [...this.state.history, newState];
    this.setState(newState);
  }
}

export default Game;
