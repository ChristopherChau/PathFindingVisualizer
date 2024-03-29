import React, {Component} from 'react';
import './Node.css';

/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

export default class Node extends Component{
  constructor(props){
    super(props);
    this.state = {};
  }
  
  render() {
    let {
      row, 
      col, 
      isWall, 
      isFinish, 
      isStart, 
      isVisitedAgain,
      onMouseDown, 
      onMouseEnter, 
      onMouseUp,
      isFinal,
      isWeight,
    } = this.props;
    
    let extraClassName = 
    (isVisitedAgain && isWeight) ? 'nodeVisited weightNode' :
    isFinish ? 'nodeFinish' : 
    isStart ? 'nodeStart' : 
    isVisitedAgain ? 'nodeVisited' :  
    isWall ? 'nodeWall' :
    isFinal ? 'finalNode': 
    isWeight ? 'weightNode' : 
    '';

    return(
      <>
         <td 
              className={`node ${extraClassName}`}
              onMouseEnter={() => onMouseEnter(row,col)} //onMouseEnter will call the function we pass in as onMouseEnter and pass in col and row
              onMouseDown={() => onMouseDown(row,col)}
              onMouseUp={() => onMouseUp()}
         ></td>
       </>
    )
  }
}

export const DEFAULT_NODE = {
  row: 0,
  col: 0,
};