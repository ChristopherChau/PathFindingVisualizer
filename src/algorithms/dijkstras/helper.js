/* eslint-disable import/no-anonymous-default-export */
// import { getAllNeighbors } from "../algHelpers/globalHelpers";

function getAllNodes(grid){
  let allNodes = [];
  for (let row of grid){
    for (let node of row){
      node.visited = false;
      allNodes.push(node);
    }
  }
  return allNodes;
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
  //return an array of neighbors
}

function sortByDistance(unvisitedNodes){
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function updateUnvisitedNeighbors(node, grid){
  const unvisitedNeighbors = getAllNeighbors(node,grid);
  for (let neighbor of unvisitedNeighbors){
    neighbor.distance = node.distance + 1;
    if (neighbor.isWeight){
      neighbor.distance += 10;
    }
    neighbor.previousNode = node;
  }
}

function minHeapUpdateNeighbors(node, grid, minHeap){
  const unvisitedNeighbors = getAllNeighbors(node,grid);
  for (let neighbor of unvisitedNeighbors){
    neighbor.distance = node.distance + 1;
    if (neighbor.isWeight){
      neighbor.distance += 10;
    }
    neighbor.previousNode = node;
    minHeap.push(neighbor)
  }
}




export default {getAllNodes, sortByDistance, updateUnvisitedNeighbors, minHeapUpdateNeighbors};