import React, {useState} from 'react'
import '../styles/navBar'

const NavBar = (props) => {

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
            <button className='visualizeButn' onClick={() => this.visualizeDijkstra(this.state.nodes)}>
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
    </>
  )
}

export default NavBar

