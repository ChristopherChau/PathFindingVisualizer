// import helpers from './helper';

export function dijsktra(grid, start, finish){
  const visitedNodesInOrder = [];
  // start.distance = 0;
  // const unvisitedNodes = getAllNodes(grid);
  // while(!!unvisitedNodes.length){
  //   sortByDistance(unvisitedNodes); //later implement using a heap
  //   const closestNode = unvisitedNodes.shift(); //use closestnode as heap.top
  //   closestNode.visited = true;
  //   visitedNodesInOrder.push(closestNode);
  //   if (closestNode === finish) return visitedNodesInOrder;
  //   updateUnvisitedNeighbors(closestNode, grid);
  // }

}


function getAllNodes(grid){
  console.log('hi');
  let allNodes = [];
  for (let row of grid){
    for (let node of row){
      allNodes.push(node);
    }
  }
  return allNodes;
}


function sortByDistance(unvisitedNodes){
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function updateUnvisitedNeighbors(node, grid){
  const unvisitedNeighbors = getAllNeighbors(node,grid);
  for (let neighbor in unvisitedNeighbors){
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
  }
}


function getAllNeighbors(node, grid){
  const neighbors = [];
  const {row, col} = node;
  if (row > 0) {neighbors.push(grid[row-1][col])};
  if (row < grid.length-1){neighbors.push(grid[row+1][col])};
  if (col > 0) {neighbors.push(grid[row][col-1])};
  if (col < grid.length -1) {neighbors.push(grid[row])};

  return neighbors.filter((neighbor) => !!neighbor.visited);
}