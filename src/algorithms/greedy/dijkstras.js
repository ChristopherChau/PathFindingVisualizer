/* eslint-disable no-unused-vars */
import helpers from './helper';
import { MinHeap } from '../../dataStructure/Heap/minHeap';

export function minHeapDijkstra(grid, start, finish) {
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
    if (node.distance === Infinity) {
      //maybe do a pop up saying no path found
      return visitedNodesInOrder;
    }
    if (node === finish) {
      return visitedNodesInOrder;
    }
    helpers.minHeapUpdateNeighbors(node, grid, minHeap);
  }
}
