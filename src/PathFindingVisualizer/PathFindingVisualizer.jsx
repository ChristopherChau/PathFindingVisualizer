/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { dijkstra , minHeapDijkstra, getFinalPath} from '../algorithms/dijkstras/dijkstras';
import Node from './Node/Node';
import { testMain } from '../test';
import './styles/navBar.css';
import './styles/grid.css'


const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 40;
const START_NODE_ROW = 10;
const START_NODE_COL = 13;
let reset = false;
export default class PathFindingVisualizer extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      nodes: [],
      mouseIsPressed: false,
    };
  }
  resetWalls = () => {
    const newGrid = this.state.nodes.slice();
    for (let row of newGrid){
      for (let node of row){
        node.isWall = false;
      }
    }
    this.setState({nodes: newGrid});
  }

  resetPath() {
    const newGrid = this.state.nodes.slice();
    for (let row of newGrid){
      for (let node of row){
        node.visited = false;
        node.isVisitedAgain = false;
        node.isFinal = false;
        if (node.isWall){
          console.log(`${node.row} ${node.col}`);
          continue;
        }
      }
    }
    reset = false;
    this.setState({nodes: newGrid});
    console.log(this.state.nodes);
    return newGrid;
  }

  resetGrid() {
    const grid = initializeGrid();
    this.setState({ nodes: grid });
    reset = false;
  }

  componentDidMount() { //this is a function that is automatically called 
    this.resetGrid();
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
    for (let i = 0; i < finalPathNodes.length; i++)
    {
      let node = finalPathNodes[i];
      setTimeout( ()=> {
        const newGrid = this.state.nodes.slice();
        let newNode = {...node, isFinal: true};
        newGrid[node.row][node.col] = newNode;
        this.setState({nodes: newGrid});
      }, 75 * i );
    }
  }
  
  visualizeDijkstra() {
    if (reset === true){
      let newGrid = this.resetPath();
      this.setState({nodes: newGrid});
    }
    const {nodes} = this.state;

    const startNode = nodes[START_NODE_ROW][START_NODE_COL];
    const finishNode = nodes[FINISH_NODE_ROW][FINISH_NODE_COL];
    startNode.distance = 0;

    // const visitedNodesInOrder = minHeapDijkstra(nodes,startNode,finishNode);
    const visitedNodesInOrder = dijkstra(nodes,startNode,finishNode);
    this.animateDijkstras(visitedNodesInOrder);
    const finalPath = getFinalPath(finishNode);
    this.animateFinalPath(finalPath);
    reset = true;

    // testMain();
  }

  render() {
    const {nodes, mouseIsPressed} = this.state;

    return (
      <>
        <div className='header'>
          <div className='title'>Pathfinding Visualizer</div>
          <div className='buttonList'>
            <div className='dropdown'>
              <button className='dropButn regularButn'>Algorithms</button>
              <div className='dropdownContent'>
                <div className='regularButn dijkstrasMenu'>Dijkstra's Algorithm</div>
              </div>
            </div>
            <button className='visualizeButn' onClick={() => this.visualizeDijkstra()}>
              Visualize!
            </button>
            <button onClick={() => this.resetGrid()} className='regularButn'>
              Reset Grid
            </button>
            <button onClick={() => this.resetWalls()}className='regularButn'>
              Clear Walls
            </button>
          </div>
        </div>
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
    isWall: false,
  };
};

const getNewGridWithWall = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = grid[row][col];
  const newNode  = {...node, isWall: !node.isWall};
  newGrid[row][col] = newNode;
  return newGrid;
};

