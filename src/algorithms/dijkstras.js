import getAllNodes from './helper'

export function dijsktra(grid, start, finish){
  const visitedNodesInOrder = [];
  start.distance = 0;
  const unvisitedNodes = getAllNodes(grid);
  while(unvisitedNodes.length !== 0){
    sortByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();
    closestNode.visited = true;
    visitedNodesInOrder.push(closestNode);
    if (closestNode === finish) return visitedNodesInOrder;
    // getAllNeighbors(closestNode, grid);
  }


}

function sortByDistance(unvisitedNodes){
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

