/* eslint-disable import/no-anonymous-default-export */
function getAllNodes(grid){
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


export default {getAllNodes, sortByDistance};