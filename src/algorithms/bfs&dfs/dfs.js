/* eslint-disable no-unused-vars */
// import helper from '../dijkstras/helper'

//up right down left 
export function dfs(grid, start, finish) {
  let visitedNodesInOrder = [];
  const status = { finishFound: false };
  visitedNodesInOrder = exploreNeighbors(start, visitedNodesInOrder, finish, grid, status);
  console.log(visitedNodesInOrder);
  return visitedNodesInOrder;
}

function exploreNeighbors(node, visitedNodesInOrder, finish, grid, status) {
  if (
    status.finishFound ||
    node.row < 0 ||
    node.row >= 20 ||
    node.col < 0 ||
    node.col >= 50 ||
    node.visited === true ||
    node.isWall === true
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



function getAllNeighbors(node, grid,)
{
  const neighbors = [];
  const {row, col} = node;

  if (row > 0)  neighbors.push(grid[row-1][col]); //up
  if (col < grid[0].length -1)  neighbors.push(grid[row][col+1]);//right
  if (row < grid.length-1) neighbors.push(grid[row+1][col]); //down
  if (col > 0)  neighbors.push(grid[row][col-1]); //left

  return neighbors.filter((neighbor) => !neighbor.visited);
}