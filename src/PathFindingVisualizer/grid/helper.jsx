/* eslint-disable no-unused-vars */
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 45;
const START_NODE_ROW = 10;
const START_NODE_COL = 15;

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
}

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
}

const getNewGridWithWall = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = grid[row][col];
  if (node.isWeight) {
    node.isWeight = !node.isWeight;
  }
  const newNode = { ...node, isWall: !node.isWall };
  newGrid[row][col] = newNode;
  return newGrid;
}

const getNewGridWithWeight = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = grid[row][col];
  if (node.isWall) {
    node.isWall = !node.isWall;
  }
  const newNode = { ...node, isWeight: !node.isWeight };
  newGrid[row][col] = newNode;
  return newGrid;
}

export {
  FINISH_NODE_ROW,
  FINISH_NODE_COL,
  START_NODE_ROW,
  START_NODE_COL,
  initializeGrid,
  createNode,
  getNewGridWithWall,
  getNewGridWithWeight,
};
