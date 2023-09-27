/* eslint-disable import/no-anonymous-default-export */

function getAllNodes(grid){
  let allNodes = [];
  for (let row of grid){
    for (let node of row){
      allNodes.push(node);
    }
  }
  return allNodes;
}


function sortByDistance(unvisitedNodes){
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function updateUnvisitedNeighbors(node, grid){
  const unvisitedNeighbors = getAllNeighbors(node,grid);
  for (let neighbor of unvisitedNeighbors){
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
  }
}

function getAllNeighbors(node, grid){
  const neighbors = [];
  const {row, col} = node;
  if (row > 0)  neighbors.push(grid[row-1][col]);
  if (row < grid.length-1) neighbors.push(grid[row+1][col]);
  if (col > 0)  neighbors.push(grid[row][col-1]);
  if (col < grid[0].length -1)  neighbors.push(grid[row][col+1]); // Fix here

  return neighbors.filter((neighbor) => !neighbor.visited);
}


export default {getAllNodes, sortByDistance, updateUnvisitedNeighbors, getAllNeighbors};