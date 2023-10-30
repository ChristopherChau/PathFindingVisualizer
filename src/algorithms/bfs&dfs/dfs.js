/* eslint-disable no-unused-vars */
// import helper from '../dijkstras/helper'

//up right down left 
export function dfs(grid, start, finish) {
  let visitedNodesInOrder = [];
  let finishFound = false;
  visitedNodesInOrder = exploreNeighbors(start, visitedNodesInOrder, finish, grid, finishFound);
  console.log('end of exploration');
  return visitedNodesInOrder;
}

function exploreNeighbors(node, visitedNodesInOrder, finish, grid, finishFound) {
  if (
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
  
  if (finishFound) {
    return visitedNodesInOrder;
  }

  if (node === finish) {
    console.log('FOUND IT');
    finishFound = true;
    return visitedNodesInOrder;
  }

  
  const neighbors = getAllNeighbors(node, grid);
  for (let neighbor of neighbors) {
    if (finishFound) {
      return visitedNodesInOrder;
    }
    
    // console.log(neighbor);
    visitedNodesInOrder = exploreNeighbors(neighbor, visitedNodesInOrder, finish, grid, finishFound);
    
    if (finishFound) {
      return visitedNodesInOrder;
    }
    
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