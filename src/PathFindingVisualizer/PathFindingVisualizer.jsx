/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import Node from './Node/Node';

class PathFindingVisualizer extends Component {
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
        };
        currentRow.push(currentNode); 
      }
      
      nodes.push(currentRow);
    }
    this.setState({nodes});
  }

  render() {
    const {nodes} = this.state;

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

export default PathFindingVisualizer;
