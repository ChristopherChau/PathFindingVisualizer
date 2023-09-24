import getAllNodes from '../PathFindingVisualizer/Node'

export function dijsktra(grid, start, finish){
  const visitedNodesInOrder = [];
  start.distance = 0;
  //deal with all unvisited nodes
  // loop over unvisited nodes and sort them by their distance
  // take the shortest distance which will be the closest node 
  //take the closest node and set them to visited true then push it into visited in order
  // if closest is the finish node, we can return success our visited nodes in order 
  //else we update the visited neighbors of closest node 

  const unvisitedNodes = getAllNodes(grid);
  while(unvisitedNodes.length !== 0){
    // sortByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();
    closestNode.visited = true;
    visitedNodesInOrder.push(closestNode);
    if (closestNode === finish) return visitedNodesInOrder;
    // getAllNeighbors(closestNode, grid);
  }


}