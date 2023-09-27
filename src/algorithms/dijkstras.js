/* eslint-disable no-unused-vars */
import helpers from './helper';

export function dijkstra(grid, start, finish){
  const visitedNodesInOrder = [];
  start.distance = 0;
  const unvisitedNodes = helpers.getAllNodes(grid);
  while (!!unvisitedNodes.length) {
    helpers.sortByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();
    if (closestNode.isWall) continue;
    if (closestNode.distance === Infinity) return visitedNodesInOrder;
    closestNode.visited = true;
    visitedNodesInOrder.push(closestNode);
    if (closestNode === finish) return visitedNodesInOrder;
    helpers.updateUnvisitedNeighbors(closestNode, grid);
  }

}

