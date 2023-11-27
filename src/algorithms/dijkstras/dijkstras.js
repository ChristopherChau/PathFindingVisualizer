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
    // console.log(closestNode);
    if (closestNode.isWall) continue;
    if (closestNode.distance === Infinity) return visitedNodesInOrder;
    closestNode.visited = true;
    visitedNodesInOrder.push(closestNode);
    if (closestNode === finish) {
      console.log(visitedNodesInOrder);
      return visitedNodesInOrder;} //still want to return an array of the visited nodes in order
    helpers.updateUnvisitedNeighbors(closestNode, grid);
    closestNode.visited = true;
    
  }
}


export function minHeapDijkstra(grid, start, finish){
  let minHeap = new MinHeap();
  const visitedNodesInOrder2 = [];
  start.distance = 0;
  finish.distance = Infinity; // Set finish distance to Infinity
  minHeap.push(start);
  minHeap.push(finish);
  let count = 0;
  
  while (minHeap.size() !== 0) {
      const node = minHeap.pop();
      
      if (node.isWall || node.visited) {
          // Skip walls and already visited nodes
          continue;
      }
  
      node.visited = true;
      visitedNodesInOrder2.push(node);
  
      if (node === finish) {
          console.log('found node');
          return visitedNodesInOrder2;
      }
  
      // Assuming minHeapUpdateNeighbors is a function that updates neighbors' distances
      // based on the current node's distance and adds them to the minHeap
      helpers.minHeapUpdateNeighbors(node, grid, minHeap);
  
      count++;
  
      if (count === 1000) {
          console.log('reached max iterations');
          break;
      }
  }
  
  console.log('end of minheap dijkstra');
}


/*Features to add

4. Add the ability to move start and finish node with mouse 

*/