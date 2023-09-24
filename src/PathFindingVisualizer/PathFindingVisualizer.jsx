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

  componentDidMount() {
    this.componentCreateGrid();
  }

  componentCreateGrid() {
    //create a nodes array where every index represents the row and for every row, we have an array of 50 empty arrays 

    //basically array where we have arrays of empty arrays 
    const nodes = [];
    for (let rows = 0; rows < 15; rows++) {
      let currentRow = [];
      for (let col = 0; col < 50; col++) {
        currentRow.push([]);
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
          return <div>
            {row.map((node, nodeIndex) => <Node></Node>)}
          </div>
        })}
      </div>
    );
  }
}

export default PathFindingVisualizer;
