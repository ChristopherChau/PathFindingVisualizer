/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-target-blank */
import Node from '../Node/Node'

const Grid = (props) => {
  let FINISH_NODE_ROW = 10;
  let FINISH_NODE_COL = 35;
  let START_NODE_ROW = 10;
  let START_NODE_COL = 15;

  const initializeGrid = () => {
    const grid = [];
    for (let row = 0; row < 20; row++) {
      const currentRow = [];
      for (let col = 0; col < 50; col++) {
        currentRow.push(createNode(row, col));
      }
      grid.push(currentRow);
    }
    return grid;
  };

  const createNode = (row, col) => {
    return {
      col,
      row,
      isStart: row === START_NODE_ROW && col === START_NODE_COL,
      isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
      distance: Infinity,
      visited: false,
      previousNode: null,
      isVisitedAgain: false,
      isFinal: false,
      isWall: false,
      isWeight: false,
    };
  };

  const grid = initializeGrid();

  return (
    <table className='grid'>
      <tbody>
        {grid.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((node, nodeIndex) => {
              const { isStart, isFinish, visited, row, col, isVisitedAgain, isFinal, isWall, isWeight } = node;
              return (
                <Node
                key={nodeIndex}
                col={col}
                row={row}
                isWall = {isWall}
                isStart = {isStart}
                isFinish = {isFinish}
                visited = {visited}
                isVisitedAgain = {isVisitedAgain}
                isFinal = {isFinal}
                isWeight = {isWeight}
                mouseIsPressed = {props.mouseIsPressed}
                onMouseDown={() => props.onMouseDown(row, col)}
                onMouseEnter={() => props.onMouseEnter(row, col)}
                onMouseUp={props.onMouseUp()}
              ></Node>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Grid;
