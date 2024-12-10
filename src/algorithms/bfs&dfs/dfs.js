import { getAllNeighbors } from '../algHelpers/globalHelpers';

export function dfs(grid, start, finish) {
  let visitedNodesInOrder = [];
  const status = { finishFound: false };
  visitedNodesInOrder = exploreNeighbors(
    start,
    visitedNodesInOrder,
    finish,
    grid,
    status
  );
  return visitedNodesInOrder;
}

function exploreNeighbors(node, visitedNodesInOrder, finish, grid, status) {
  const ROWS = grid.length;
  const COLS = grid[0].length;
  if (
    status.finishFound ||
    node.row < 0 ||
    node.row >= ROWS ||
    node.col < 0 ||
    node.col >= COLS ||
    node.visited ||
    node.isWall // Skip walls
  ) {
    return visitedNodesInOrder;
  }

  node.visited = true;
  visitedNodesInOrder.push(node);

  if (node === finish) {
    status.finishFound = true;
    return visitedNodesInOrder;
  }

  const neighbors = getAllNeighbors(node, grid);
  for (let neighbor of neighbors) {
    if (status.finishFound) break;
    if (!neighbor.visited && !neighbor.isWall) {
      visitedNodesInOrder = exploreNeighbors(
        neighbor,
        visitedNodesInOrder,
        finish,
        grid,
        status
      );
      neighbor.previousNode = node;
    }
  }

  return visitedNodesInOrder;
}
