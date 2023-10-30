/* eslint-disable no-unused-vars */
import { getAllNeighbors } from "../algHelpers/globalHelpers";

export function dfs(grid, start, finish) {
  let visitedNodesInOrder = [];
  const status = { finishFound: false };
  visitedNodesInOrder = exploreNeighbors(start, visitedNodesInOrder, finish, grid, status);
  return visitedNodesInOrder;
}

function exploreNeighbors(node, visitedNodesInOrder, finish, grid, status) {
  if (
    status.finishFound ||
    node.row < 0 ||
    node.row >= 20 ||
    node.col < 0 ||
    node.col >= 50 ||
    node.visited ||
    node.isWall
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
    if (status.finishFound) {
      break;
    }
    visitedNodesInOrder = exploreNeighbors(neighbor, visitedNodesInOrder, finish, grid, status);
    neighbor.previousNode = node;
  }

  return visitedNodesInOrder;
}


