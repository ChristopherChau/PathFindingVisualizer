/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { dijkstra } from '../algorithms/dijkstras';
import Node from './Node/Node';

const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 45;
const START_NODE_ROW = 10;
const START_NODE_COL = 13;
export default class PathFindingVisualizer extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      nodes: [],
    };
  }
  componentDidMount() { //this is a function that is automatically called 
    const grid = initializeGrid();
    this.setState({ nodes: grid });
  }

  animateDijkstras(visitedNodesInOrder) {
    for (let i = 0; i < visitedNodesInOrder.length; i++) {
      let node = visitedNodesInOrder[i]; // Create a new variable for each iteration
      setTimeout(() => {
        const newGrid = this.state.nodes.slice();
        let newNode = { ...node, isVisitedAgain: true };
        newGrid[node.row][node.col] = newNode;
        // console.log(newGrid);
        this.setState({ nodes: newGrid });
      }, 50 * i); // Increased delay for smoother animation
    }
  }
  
  

  visualizeDijkstra() {
    const {nodes} = this.state;
    const startNode = nodes[START_NODE_ROW][START_NODE_COL];
    const finishNode = nodes[FINISH_NODE_ROW][FINISH_NODE_COL];
    startNode.distance = 0;
    const visitedNodesInOrder = dijkstra(nodes,startNode,finishNode);
    this.animateDijkstras(visitedNodesInOrder);
  }

  render() {
    const {nodes} = this.state;

    return (
      <>
        <button onClick={() => this.visualizeDijkstra()}>
          Visualize Dijkstra
        </button>
        <div className='grid'>
          {nodes.map((row,rowIndex) => {
            return <div key={rowIndex}>
              {row.map((node, nodeIndex) => {
                let {isStart, isFinish, visited, row, col, isVisitedAgain} = node;
                return(
                  <Node
                    key={nodeIndex}
                    col={col}
                    row={row}
                    isStart = {isStart}
                    isFinish = {isFinish}
                    visited = {visited}
                    isVisitedAgain = {isVisitedAgain}
                  ></Node>
                )
              })}
            </div>
          })}
          </div>
      </>
    );
  }
}

const initializeGrid = () => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(row, col));
    }
    grid.push(currentRow);
  }
  return grid;
}

const createNode = (row,col) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    visited: false,
    previousNode: null,
    isVisitedAgain: false,
  };
};