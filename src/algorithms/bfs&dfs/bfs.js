/* eslint-disable no-unused-vars */
import { getAllNeighbors } from "../algHelpers/globalHelpers"; //returns array of all neighbors


export function bfs(grid, start, finish) {
    const queue = [];
    const visitedNodesInOrder = [];
    queue.push(start);
  
    while (queue.length !== 0) {
      const node = queue.shift();
  
      if (
        node.row < 0 ||
        node.row >= 20 ||
        node.col < 0 ||
        node.col >= 50 ||
        node.visited ||
        node.isWall // Skip walls
      ) {
        continue;
      }
  
      node.visited = true;
      visitedNodesInOrder.push(node);
  
      if (node === finish) {
        return visitedNodesInOrder;
      }
  
      const neighbors = getAllNeighbors(node, grid);
      for (let neighbor of neighbors) {
        if (!neighbor.visited && !neighbor.isWall) {
          queue.push(neighbor);
          neighbor.previousNode = node;
        }
      }
    }
  
    return visitedNodesInOrder;
  }
  