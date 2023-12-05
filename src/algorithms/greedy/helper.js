/* eslint-disable import/no-anonymous-default-export */
import { getAllNeighbors } from "../algHelpers/globalHelpers";

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