/* eslint-disable no-unused-vars */
import helpers from './helper'; 
import {MinHeap} from '../../dataStructure/Heap/minHeap'


export function dijkstra(grid, start, finish){
  const visitedNodesInOrder = [];
  start.distance = 0;
  const unvisitedNodes = helpers.getAllNodes(grid);
  let count = 0;
  while (!!unvisitedNodes.length) {
    helpers.sortByDistance(unvisitedNodes);//make this min heap 
    const closestNode = unvisitedNodes.shift();
    console.log(closestNode);
    if (closestNode.isWall) continue;
    if (closestNode.distance === Infinity) return visitedNodesInOrder;
    closestNode.visited = true;
    visitedNodesInOrder.push(closestNode);
    if (closestNode === finish) {
      return visitedNodesInOrder;} //still want to return an array of the visited nodes in order
    helpers.updateUnvisitedNeighbors(closestNode, grid);
    closestNode.visited = true;
    // count++;
    // if (count === 8) break;
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

export function minHeapDijkstra(grid, start, finish){
  let minHeap = new MinHeap();
  const visitedNodesInOrder2 = [];
  start.distance = 0;
  minHeap.add(start);
  minHeap.add(finish);
  let count = 0;
  console.log(minHeap);
  while (minHeap.size() !== 0){
    const node = minHeap.remove();
    console.log(node);
    // console.log(node.distance);
    if (node.isWall) continue;
    if (node.distance === Infinity) return visitedNodesInOrder2;
    node.visited = true;
    visitedNodesInOrder2.push(node);
    if (node === finish) return visitedNodesInOrder2;
    helpers.minHeapUpdateNeighbors(node, grid, minHeap);
    count++;
    if(count === 8) break;
  }
  // console.log('end of minheap dijkstra');
}