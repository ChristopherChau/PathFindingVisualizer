/* eslint-disable no-unused-vars */
import { getAllNeighbors } from '../algHelpers/globalHelpers'; //returns array of all neighbors

export function bfs(grid, start, finish) {
  const queue = [];
  const visitedNodesInOrder = [];
  queue.push(start);

  const ROWS = grid.length;
  const COLS = grid[0].length;

  while (queue.length !== 0) {
    const node = queue.shift();

    if (
      node.row < 0 ||
      node.row >= ROWS ||
      node.col < 0 ||
      node.col >= COLS ||
      node.visited ||
      node.isWall // Skip walls
    ) {
      continue;
    }

    node.visited = true;
    visitedNodesInOrder.push(node);

    if (node === finish) {
      return visitedNodesInOrder;
    }

    const neighbors = getAllNeighbors(node, grid);
    for (let neighbor of neighbors) {
      if (!neighbor.visited && !neighbor.isWall) {
        queue.push(neighbor);
        neighbor.previousNode = node;
      }
    }
  }

  return visitedNodesInOrder;
}
