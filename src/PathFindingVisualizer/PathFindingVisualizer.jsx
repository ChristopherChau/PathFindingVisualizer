/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { dijkstra , minHeapDijkstra} from '../algorithms/dijkstras/dijkstras';
import { getFinalPath } from '../algorithms/algHelpers/globalHelpers';
import {dfs} from '../algorithms/bfs&dfs/dfs';
import {bfs} from '../algorithms/bfs&dfs/bfs';
import Node from './Node/Node';
import { testMain } from '../test';
import './styles/navBar.css';
import './styles/grid.css'
import {
  FINISH_NODE_ROW,
  FINISH_NODE_COL,
  START_NODE_ROW,
  START_NODE_COL,
  initializeGrid,
  createNode,
  getNewGridWithWall,
  getNewGridWithWeight,
} from './grid/helper';

let reset = false;
let pathFound = false;

export default class PathFindingVisualizer extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      nodes: [],
      mouseIsPressed: false,
      currentMode: 'wallMode',
      currentAlg: 'dijkstra',
    };
  }


// ------------------------------------------------------------------------------------------
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
        node.distance = Infinity;
        node.previousNode = null;
        if (node.isWall || node.isWeight){
          continue;
        }
      }
    }
    this.setState({nodes: newGrid});
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

  // ------------------------------------------------------------------------------------------

  handleMouseDown(row,col){
    if(pathFound === true) {
      pathFound = false;
      this.resetPath();
    }  
    let newGrid;
    if (this.state.currentMode === 'weightMode'){
      newGrid = getNewGridWithWeight(this.state.nodes, row, col);
    }
    else{
      newGrid = getNewGridWithWall(this.state.nodes, row, col);
    }
    this.setState({nodes : newGrid, mouseIsPressed:true});
  }
  
  handleMouseEnter(row,col){
    if (!this.state.mouseIsPressed) return;
    let newGrid;
    if (this.state.currentMode === 'weightMode'){
      newGrid = getNewGridWithWeight(this.state.nodes, row, col);
    }
    else{
      newGrid = getNewGridWithWall(this.state.nodes, row, col);
      // console.log(newGrid);
    }
    // console.log(newGrid);
    this.setState({nodes : newGrid}); //according to the console.log, at this time once enter is done running, the new grid does have the updated walls
  }
  
  handleMouseUp(){
    this.setState({mouseIsPressed:false}); //as of over here too the new state does indeed have the walls
  }
  
  setMode(mode){
    this.setState({currentMode : mode});
  }
  
  setCurrentAlgorithm(currAlg){
    this.setState({currentAlg : currAlg});
  }

// ------------------------------------------------------------------------------------------


  animateAlgorithm(visitedNodesInOrder) {
    for (let i = 0; i < visitedNodesInOrder.length; i++) {
      let node = visitedNodesInOrder[i]; // Create a new variable for each iteration
      setTimeout(() => {
        const newGrid = this.state.nodes.slice();
        let newNode = { ...node, isVisitedAgain: true };
        newGrid[node.row][node.col] = newNode;
        this.setState({ nodes: newGrid });
      }, 60); // Increased delay for smoother animation
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
      }, 75);
    }
  }
  
  visualizeDijkstra(grid) {
    if (pathFound === true){
      let newGrid = this.resetPath();
      this.setState({ nodes: newGrid, resetPath: false });
    }
    let nodes = grid;

    const startNode = nodes[START_NODE_ROW][START_NODE_COL];
    const finishNode = nodes[FINISH_NODE_ROW][FINISH_NODE_COL];
    startNode.distance = 0;

    // const visitedNodesInOrder = minHeapDijkstra(nodes,startNode,finishNode);
    const visitedNodesInOrder = dijkstra(nodes,startNode,finishNode);
    this.animateAlgorithm(visitedNodesInOrder);
    const finalPath = getFinalPath(finishNode);
    this.animateFinalPath(finalPath);
    pathFound = true;
  }

  visualizeDFS(grid)
  {
    if (pathFound === true){
      let newGrid = this.resetPath();
      this.setState({ nodes: newGrid, resetPath: false });
    }
    let nodes = grid;
    const startNode = nodes[START_NODE_ROW][START_NODE_COL];
    const finishNode = nodes[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dfs(grid, startNode, finishNode);
    this.animateAlgorithm(visitedNodesInOrder);
    const finalPath = getFinalPath(finishNode); //this function is from dijkstras helper should be the same 
    this.animateFinalPath(finalPath);
    pathFound = true;
  }

  visualizeBFS(grid)
  {
    if (pathFound === true){
      let newGrid = this.resetPath();
      this.setState({ nodes: newGrid, resetPath: false });
    }
    let nodes = grid;
    const startNode = nodes[START_NODE_ROW][START_NODE_COL];
    const finishNode = nodes[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = bfs(grid, startNode, finishNode);
    this.animateAlgorithm(visitedNodesInOrder);
    const finalPath = getFinalPath(finishNode); //this function is from dijkstras helper should be the same 
    this.animateFinalPath(finalPath);
    pathFound = true;
  }

  visualizeCurrAlg(grid)
  {
    if (pathFound === true){
      let newGrid = this.resetPath();
      this.setState({ nodes: newGrid, resetPath: false });
    }
    if (this.state.currentAlg === 'dijkstra')
    {
      this.visualizeDijkstra(grid);
    }
    else if (this.state.currentAlg === 'bfs')
    {
      this.visualizeBFS(grid);
    }
    else if (this.state.currentAlg === 'dfs')
    {
      this.visualizeDFS(grid);
    }

  }

  // ------------------------------------------------------------------------------------------

  render() {
    const {nodes, mouseIsPressed} = this.state;

    return (
      <>
      <div className='container'>
        <div className='header'>
          <div className='title'>Pathfinding Visualizer</div>
          <div className='buttonList'>
            <div className='dropdown'>
              <button className='dropButn regularButn'>Algorithms</button>
              <div className='dropdownContent'>
                <button 
                  className='regularButn dijkstrasMenu' 
                  onClick={() => this.setCurrentAlgorithm('dijkstra')}
                  >Dijkstra's Algorithm</button>
                  <button className='regularButn dijkstrasMenu' 
                  onClick={() => this.setCurrentAlgorithm('bfs')}
                  >Breadth First Search</button>
                  <button className='regularButn dijkstrasMenu'
                  onClick={() => this.setCurrentAlgorithm('dfs')}
                  >Depth First Search</button>
              </div>
              
            </div>
            <button className='visualizeButn' onClick={() => this.visualizeCurrAlg(this.state.nodes)}>
              Visualize!
            </button>
            <button onClick={() => this.resetGrid()} className='regularButn'>
              Reset Grid
            </button>
            <button onClick={() => this.resetWalls()}className='regularButn'>
              Clear Walls
            </button>
            <button onClick={() => this.setMode('wallMode')}className='regularButn wallButn'>Wall Mode</button>
            <button onClick={() => this.setMode('weightMode')}className='regularButn weightButn'>Weight Mode</button>
          </div>
        </div>

        <div className='grid'>
          {nodes.map((row,rowIndex) => {
            return <div key={rowIndex}>
              {row.map((node, nodeIndex) => {
                let {isStart, isFinish, visited, row, col, isVisitedAgain,isFinal, isWall, isWeight} = node;
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
                    isWeight = {isWeight}
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
        </div>
      </>
    );
  }
}

