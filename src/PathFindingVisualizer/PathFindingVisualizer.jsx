/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { dijkstra , getFinalPath} from '../algorithms/dijkstras';
import Node from './Node/Node';


const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 25;
const START_NODE_ROW = 10;
const START_NODE_COL = 13;
export default class PathFindingVisualizer extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      nodes: [],
      mouseIsPressed: false,
    };
  }
  componentDidMount() { //this is a function that is automatically called 
    const grid = initializeGrid();
    this.setState({ nodes: grid });
  }

  handleMouseDown(row,col){
    const newGrid = getNewGridWithWall(this.state.nodes, row, col);
    this.setState({nodes : newGrid, mouseIsPressed:true});
  }
  
  handleMouseEnter(row,col){
    if (!this.state.mouseIsPressed) return
    const newGrid = getNewGridWithWall(this.state.nodes, row, col);
    this.setState({nodes : newGrid});
  }
  
  handleMouseUp(){
    this.setState({mouseIsPressed:false});
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
      }, 50); // Increased delay for smoother animation
    }
  }
  
  animateFinalPath(finalPathNodes){
    console.log('in animate final');
    for (let i = 0; i < finalPathNodes.length; i++)
    {
      let node = finalPathNodes[i];
      setTimeout( ()=> {
        const newGrid = this.state.nodes.slice();
        let newNode = {...node, isFinal: true};
        newGrid[node.row][node.col] = newNode;
        this.setState({nodes: newGrid});
      }, 50 );
    }
  }
  
  visualizeDijkstra() {
    const {nodes} = this.state;
    const startNode = nodes[START_NODE_ROW][START_NODE_COL];
    const finishNode = nodes[FINISH_NODE_ROW][FINISH_NODE_COL];
    startNode.distance = 0;
    const visitedNodesInOrder = dijkstra(nodes,startNode,finishNode);
    this.animateDijkstras(visitedNodesInOrder);
    const finalPath = getFinalPath(finishNode);
    this.animateFinalPath(finalPath);
  }

  render() {
    const {nodes, mouseIsPressed} = this.state;

    return (
      <>
        <button onClick={() => this.visualizeDijkstra()}>
          Visualize Dijkstra
        </button>
        <div className='grid'>
          {nodes.map((row,rowIndex) => {
            return <div key={rowIndex}>
              {row.map((node, nodeIndex) => {
                let {isStart, isFinish, visited, row, col, isVisitedAgain,isFinal, isWall} = node;
                return(
                  <Node
                    key={nodeIndex}
                    col={col}
                    row={row}
                    isWall = {isWall}
                    isStart = {isStart}
                    isFinish = {isFinish}
                    visited = {visited}
                    isVisitedAgain = {isVisitedAgain}
                    isFinal = {isFinal}
                    mouseIsPressed = {mouseIsPressed}
                    onMouseDown={(row,col) => this.handleMouseDown(row,col)}
                    onMouseEnter={(row,col) => this.handleMouseEnter(row,col)}
                    onMouseUp={() => this.handleMouseUp()}
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
    isFinal: false,
  };
};

const getNewGridWithWall = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode  = {...node, isWall: !node.isWall};
  newGrid[row][col] = newNode;
  return newGrid;
};
