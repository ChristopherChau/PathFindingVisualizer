export default function getAllNodes(grid){
  let allNodes = [];
  for (let row in grid){
    for (let node in row){
      allNodes.push(node);
    }
  }
  return allNodes;
}