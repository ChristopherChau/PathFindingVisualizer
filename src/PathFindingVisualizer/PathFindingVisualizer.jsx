/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { dijsktra } from '../algorithms/dijkstras';
import Node from './Node/Node';

export default class PathFindingVisualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: [],
    };
  }
  componentDidMount() { //this is a function that is automatically called 
    this.componentCreateGrid();
  }

  componentCreateGrid() {
    //create a nodes array where every index represents the row and for every row, we have an array of 50 empty arrays 

    //basically array where we have arrays of empty arrays 
    const nodes = [];
    for (let row = 0; row < 15; row++) {
      let currentRow = [];
      for (let col = 0; col < 50; col++) {
        const currentNode = {
          col,
          row,
          isStart: row === 10 && col === 5,
          isFinish: row === 10 && col === 45,
          visited: false,
          distance: Infinity,
        };
        currentRow.push(currentNode); 
      }
      
      nodes.push(currentRow);
    }
    this.setState({nodes});
  }

  render() {
    const {nodes} = this.state;
    // dijsktra();

    return (
      <div className='grid'>
        {nodes.map((row,rowIndex) => {
          return <div key={rowIndex}>
            {row.map((node, nodeIndex) => {
              let {isStart, isFinish} = node;
              return(
                <Node
                  key={nodeIndex}
                  isStart = {isStart}
                  isFinish = {isFinish}
                ></Node>
              )
            })}
          </div>
        })}
      </div>
    );
  }
}

const initializeGrid = () => {
  let grid = [];
  for (let row = 0; row < 20; row++){
    let currentRow = [];
    for (let col = 0; col < 20; col++){
      currentRow.push(createNode(row,col));
    }
    grid.push(currentRow);
  }
  return grid;
}

// redo Create node










// const createNode = (row,col) => { 
//   return{
//     col,
//     row,
//     distance: Infinity,
//     visited: false,
//     isStart: row === START_NODE_ROW && col === START_NODE_COL,
//     isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
//     previousNode: null
//   };
// }
