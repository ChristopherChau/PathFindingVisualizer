/* eslint-disable no-unused-vars */
import { getAllNeighbors } from "../algHelpers/globalHelpers"; //returns array of all neighbors


export function bfs(grid, start, finish) {
  const queue = [];
  let visitedNodesInOrder = [];
  queue.push(start);
  let count = 0;
  while (queue.length !== 0){
    const node = queue.shift();
    visitedNodesInOrder.push(node);
    if (node.isWall || node.visited) {continue;}
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
    }
    count++;
    if (count === 2000) break;
  }

}

