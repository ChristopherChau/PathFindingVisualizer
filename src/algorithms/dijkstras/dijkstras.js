/* eslint-disable no-unused-vars */
import helpers from './helper'; 
import {MinHeap} from '../../dataStructure/Heap/minHeap'


// export function dijkstra(grid, start, finish){
//   const visitedNodesInOrder = [];
//   start.distance = 0;
//   const unvisitedNodes = helpers.getAllNodes(grid);
//   let count = 0;
//   while (!!unvisitedNodes.length) {
//     helpers.sortByDistance(unvisitedNodes);//make this min heap 
//     const closestNode = unvisitedNodes.shift();
//     // console.log(closestNode);
//     if (closestNode.isWall) continue;
//     if (closestNode.distance === Infinity) return visitedNodesInOrder;
//     closestNode.visited = true;
//     visitedNodesInOrder.push(closestNode);
//     if (closestNode === finish) {
//       console.log(visitedNodesInOrder);
//       return visitedNodesInOrder;} //still want to return an array of the visited nodes in order
//     helpers.updateUnvisitedNeighbors(closestNode, grid);
//     closestNode.visited = true;
    
//   }
// }


export function minHeapDijkstra(grid, start, finish){
  let minHeap = new MinHeap();
  const visitedNodesInOrder = [];
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
      visitedNodesInOrder.push(node);
      if (node.distance === Infinity){
        //maybe do a pop up saying no path found
        return visitedNodesInOrder;
      }
      if (node === finish) {
          return visitedNodesInOrder;
      }
      helpers.minHeapUpdateNeighbors(node, grid, minHeap);
  }
}


/*Features to add

4. Add the ability to move start and finish node with mouse 

*/