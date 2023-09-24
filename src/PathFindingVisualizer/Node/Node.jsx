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
    let {isFinish, isStart} = this.props;
    let extraClassName = isFinish ? 'nodeFinish' : isStart ? 'nodeStart' : '';
    return(
      <>
         <div className={`node ${extraClassName}`}></div>
       </>
    )
  }



}

export const DEFAULT_NODE = {
  row: 0,
  col: 0,
};



