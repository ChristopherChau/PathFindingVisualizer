/* eslint-disable no-unused-vars */
import { getAllNeighbors } from "../algHelpers/globalHelpers"; //returns array of all neighbors


export function bfs(grid, start, finish) {
  const queue = [];
  let visitedNodesInOrder = [];
  queue.push(start);
  while (queue.length !== 0){
    const node = queue.shift();
    if (  
      node.row < 0 ||
      node.row >= 20 ||
      node.col < 0 ||
      node.col >= 50 ||
      node.visited ||
      node.isWall || 
      node.distance === Infinity) {continue;}
      
    visitedNodesInOrder.push(node);
    node.visited = true;
  
    if(node === finish) {
      console.log('found');
      return visitedNodesInOrder;
    }

    const neighbors = getAllNeighbors(node, grid);
    for (let neighbor of neighbors)
    {
      queue.push(neighbor);
      neighbor.previousNode = node;
      neighbor.distance = 0;
    }
  }

}

