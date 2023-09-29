/* eslint-disable no-unused-vars */
import helpers from './helper'; 
import {MinHeap} from '../../dataStructure/Heap/minHeap'


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

export function dijkstra2(grid, start, finish){
  let minHeap = new MinHeap();
  const visitedNodesInOrder2 = [];
  start.distance = 0;
  minHeap.insert(start, 0);
  // const unvisitedNodes = helpers.getAllNodes(grid); 
  while (!minHeap.isEmpty()){
    const node = minHeap.extractMin();
    if (node.isWall) continue;
    if (node.distance === Infinity) return visitedNodesInOrder2;
    node.visited = true;
    visitedNodesInOrder2.push(node);
    if (node === finish) return visitedNodesInOrder2;
    helpers.updateUnvisitedNeighbors2(node, grid, minHeap);
  }
}
/*So we have a minheap and a node for the visited nodes and we have start set at 0 
we insert start into the minheap with its distance to create an object and then we extract information on it 
we then mark it as visited and then push it into visitednodesinorder and then we update */
