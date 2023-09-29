/* eslint-disable no-unused-vars */
import helpers from './helper';


export function dijkstra(grid, start, finish){
  const visitedNodesInOrder = [];
  start.distance = 0;
  const unvisitedNodes = helpers.getAllNodes(grid);
  while (!!unvisitedNodes.length) {
    helpers.sortByDistance(unvisitedNodes);//make this min heap 
    const closestNode = unvisitedNodes.shift();
    if (closestNode.isWall) continue;
    if (closestNode.distance === Infinity) return visitedNodesInOrder;
    closestNode.visited = true;
    visitedNodesInOrder.push(closestNode);
    if (closestNode === finish) {
      return visitedNodesInOrder;} //still want to return an array of the visited nodes in order
    helpers.updateUnvisitedNeighbors(closestNode, grid);
  }
}


export function getFinalPath(finishNode){
  let finalPath = [];
  let node = finishNode;
  while (node !== null){
    finalPath.push(node);
    node = node.previousNode;
  }
  return finalPath;
}

/* go through grid in getAllNodes but instead of pushing into array, we push onto the heap and we return our heap. so now we have all unvisited nodes, we say while heap is not empty, closest node is heap.top and we check if iswall or distance=ifninityy, then we set the currnode to visited and we push it to our visitednodes in order. we then check if the closest node is the finish node and if it isnt, update neighbors passing in our heap, curr node, and grid to update values in the heap then we pop the top */
 

/* push all nodes onto the heap and a map and then when you update the neighbors distance, you also want to push them onto the heap only if the distance we just calculated is less than the currenty distance that it currently has (use a map to key and value the distances) */
