/* eslint-disable no-unused-vars */
import { getAllNeighbors } from "../algHelpers/globalHelpers"; //returns array of all neighbors


export function bfs(grid, start, finish) {
  const queue = [];
  let visitedNodesInOrder = [];
  queue.push(start);
  while (queue.length !== 0){
    const node = queue.shift();
    visitedNodesInOrder.push(node);
    node.visited = true;
    if(node === finish) {
      return visitedNodesInOrder;
    }

    const neighbors = getAllNeighbors(node, grid);
    for (let neighbor of neighbors)
    {
      queue.push(neighbor);
    }
  }

}

