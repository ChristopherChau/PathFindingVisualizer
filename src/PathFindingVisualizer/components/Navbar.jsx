import React from "react";
import "../styles/navBar.css";

const Navbar = ({
  currentAlg,
  setCurrentAlgorithm,
  resetGrid,
  resetWalls,
  visualizeCurrAlg,
  setMode,
  setSpeed,
}) => {
  return (
    <div className="header">
      <div className="title">Pathfinding Visualizer</div>

      {/* Algorithms Dropdown */}
      <div className="dropdown">
        <button className="dropButn regularButn">
          Algorithms <span className="caret"></span>
        </button>
        <div className="dropdownContent">
          <button
            className="regularButn dijkstrasMenu"
            onClick={() => setCurrentAlgorithm("Dijkstra's")}
          >
            Dijkstra's Algorithm
          </button>
          <button
            className="regularButn dijkstrasMenu"
            onClick={() => setCurrentAlgorithm("BFS")}
          >
            Breadth First Search
          </button>
          <button
            className="regularButn dijkstrasMenu"
            onClick={() => setCurrentAlgorithm("DFS")}
          >
            Depth First Search
          </button>
        </div>
      </div>

      {/* Functional Buttons */}
      <button onClick={resetGrid} className="regularButn">
        Reset Grid
      </button>
      <button onClick={resetWalls} className="regularButn">
        Clear Walls
      </button>
      <button
        className="visualizeButn"
        onClick={() => visualizeCurrAlg()}
      >
        Visualize {currentAlg}!
      </button>
      <button
        onClick={() => setMode("wallMode")}
        className="regularButn wallButn"
      >
        Wall Mode
      </button>
      <button
        onClick={() => setMode("weightMode")}
        className="regularButn weightButn"
      >
        Weight Mode
      </button>

      {/* Speed Dropdown */}
      <div className="dropdown">
        <button className="dropButn regularButn">
          Speed <span className="caret"></span>
        </button>
        <div className="dropdownContent2">
          <button
            className="regularButn dijkstrasMenu"
            onClick={() => setSpeed(20)}
          >
            Slow
          </button>
          <button
            className="regularButn dijkstrasMenu"
            onClick={() => setSpeed(12)}
          >
            Medium
          </button>
          <button
            className="regularButn dijkstrasMenu"
            onClick={() => setSpeed(3)}
          >
            Fast
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
