/* eslint-disable no-unused-vars */
// import helper from '../dijkstras/helper'

//up right down left 

export function dfs(grid, start, finish)
{
  let visitedNodesInOrder = [];
  // let unvisitedNodes = helper.getAllNodes(grid);
  visitedNodesInOrder = exploreNeighbors(start, visitedNodesInOrder, finish, grid);
  // console.log(visitedNodesInOrder);
  console.log('end of exploration');
  return visitedNodesInOrder;
}
function exploreNeighbors(node, visitedNodesInOrder, finish, grid)
{
  console.log('explore');
  if (node.row < 0 || node.row >= 20 || node.col < 0 || node.col >= 50 || node.visited === true || node.isWall === true) {return;}

  node.visited = true;
  visitedNodesInOrder.push(node);
  if (node === finish || node.isFinish === true) {return visitedNodesInOrder;}
  
  const neighbors = getAllNeighbors(node, grid);
  for (let neighbor of neighbors){
    console.log(neighbor);
    exploreNeighbors(neighbor, visitedNodesInOrder, finish, grid);
    neighbor.previousNode = node;
  }
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