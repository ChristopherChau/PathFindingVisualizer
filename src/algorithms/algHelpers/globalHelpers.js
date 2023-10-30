export function getFinalPath(finishNode){
  let finalPath = [];
  let node = finishNode;
  while (node !== null){
    finalPath.unshift(node);
    node = node.previousNode;
  }
  return finalPath;
}

export function getAllNeighbors(node, grid,)
{
  const neighbors = [];
  const {row, col} = node;

  if (row > 0)  neighbors.push(grid[row-1][col]); //up
  if (col < grid[0].length -1)  neighbors.push(grid[row][col+1]);//right
  if (row < grid.length-1) neighbors.push(grid[row+1][col]); //down
  if (col > 0)  neighbors.push(grid[row][col-1]); //left

  return neighbors.filter((neighbor) => !neighbor.visited);
  //return an array of neighbors
}