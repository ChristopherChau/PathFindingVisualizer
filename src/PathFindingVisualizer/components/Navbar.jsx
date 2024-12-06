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
  isDisabled,
}) => {
  const algorithms = ["Dijkstra's", "BFS", "DFS"];
  const speeds = [
    { label: "Slow", delay: 20 },
    { label: "Medium", delay: 12 },
    { label: "Fast", delay: 3 },
  ];

  return (
    <div className="header">
      <div className="title">Pathfinding Visualizer</div>

      {/* Algorithms Dropdown */}
      <div className="dropdown">
        <button className="dropButn regularButn">
          Algorithms <span className="caret"></span>
        </button>
        <div className="dropdownContent">
          {algorithms.map((alg) => (
            <button
              key={alg}
              className="regularButn dijkstrasMenu"
              onClick={() => setCurrentAlgorithm(alg)}
            >
              {alg}
            </button>
          ))}
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
        onClick={visualizeCurrAlg}
        disabled={isDisabled}
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
          {speeds.map(({ label, delay }) => (
            <button
              key={label}
              className="regularButn dijkstrasMenu"
              onClick={() => setSpeed(delay)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
