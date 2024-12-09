import React, { useState, useEffect, useCallback } from "react";
import { minHeapDijkstra } from "../algorithms/greedy/dijkstras";
import { getFinalPath } from "../algorithms/algHelpers/globalHelpers";
import { dfs } from "../algorithms/bfs&dfs/dfs";
import { bfs } from "../algorithms/bfs&dfs/bfs";
import Node from "./Node/Node";
import Navbar from "./components/Navbar";
import Legend from "./components/Legend";
import "./styles/navBar.css";
import "./styles/grid.css";
import { getNewGridWithWall, getNewGridWithWeight } from "./grid/helper";
import {
  animateAlgorithm,
  animateFinalPath,
  clearAnimations,
  visualizeAlgorithm,
} from "./utils";
import { createMouseHandlers } from "./mouseHandler";
import {
  initializeGrid,
  createNode,
  resetGrid,
  resetWalls,
  resetPath,
  calculateDimensions,
  clampPosition,
} from "./grid/helper";

const PathFindingVisualizer = () => {
  const [nodes, setNodes] = useState([]);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [currentMode, setCurrentMode] = useState("wallMode");
  const [currentAlg, setCurrentAlg] = useState("Dijkstra's");
  const [intervalDelay, setIntervalDelay] = useState(2);
  const [animationIds, setAnimationIds] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [draggingNode, setDraggingNode] = useState(null);
  const [startNode, setStartNode] = useState({ row: 10, col: 15 });
  const [finishNode, setFinishNode] = useState({ row: 10, col: 35 });
  const [pathFound, setPathFound] = useState(false);
  const [reset, setReset] = useState(false);

  useEffect(() => {
    const grid = initializeGrid(startNode, finishNode);
    setNodes(grid);
  }, [startNode, finishNode]);

  const resetGrid = useCallback(() => {
    const { rows, cols } = calculateDimensions();

    // Adjust start and finish nodes to stay within bounds
    const updatedStartNode = {
      ...startNode,
      row: clampPosition(startNode.row, rows),
      col: clampPosition(startNode.col, cols),
    };
    const updatedFinishNode = {
      ...finishNode,
      row: clampPosition(finishNode.row, rows),
      col: clampPosition(finishNode.col, cols),
    };

    setStartNode(updatedStartNode);
    setFinishNode(updatedFinishNode);

    // Initialize grid with updated dimensions
    const grid = Array.from({ length: rows }, (_, row) =>
      Array.from({ length: cols }, (_, col) =>
        createNode(row, col, updatedStartNode, updatedFinishNode)
      )
    );
    setNodes(grid);
  }, [startNode, finishNode]);

  useEffect(() => {
    const handleResize = () => {
      resetGrid(); // Automatically adjusts start/finish node positions
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [resetGrid]);

  const resetWalls = useCallback(() => {
    const newGrid = nodes.slice();
    for (let row of newGrid) {
      for (let node of row) {
        node.isWall = false;
      }
    }
    setNodes(newGrid);
  }, [nodes]);

  const resetPath = useCallback(() => {
    const newGrid = nodes.slice();
    for (let row of newGrid) {
      for (let node of row) {
        node.visited = false;
        node.isVisitedAgain = false;
        node.isFinal = false;
        node.distance = Infinity;
        node.previousNode = null;
        if (node.isWall || node.isWeight) continue;
      }
    }
    setNodes(newGrid);
    return newGrid;
  }, [nodes]);

  const resetButtonHandler = () => {
    clearAnimations(); // Stop ongoing animations
    resetGrid(); // Reset the entire grid
    setPathFound(false); // Reset path flag
  };

  const { handleMouseDown, handleMouseMove, handleMouseEnter, handleMouseUp } =
    createMouseHandlers({
      nodes,
      setNodes,
      currentMode,
      mouseIsPressed,
      setMouseIsPressed,
      setDraggingNode,
      draggingNode,
      setStartNode,
      setFinishNode,
      isAnimating,
    });
  const handleGridClick = () => {
    if (pathFound) {
      resetPath(); // Resets all path-related nodes
      setPathFound(false); // Prevent multiple resets
    }
  };

  const visualizeCurrAlg = () => {
    visualizeAlgorithm({
      currentAlg,
      nodes,
      startNode,
      finishNode,
      resetPath,
      animateAlgorithmFn: animateAlgorithm,
      animateFinalPathFn: animateFinalPath,
      minHeapDijkstra,
      bfs,
      dfs,
      getFinalPath,
      intervalDelay,
      reset: () => reset,
      setNodes,
      setAnimationIds,
      setIsAnimating,
      setPathFound,
    });
  };

  return (
    <div className="container">
      <Navbar
        currentAlg={currentAlg}
        setCurrentAlgorithm={setCurrentAlg}
        resetGrid={resetGrid}
        resetWalls={resetWalls}
        visualizeCurrAlg={visualizeCurrAlg}
        setMode={setCurrentMode}
        setSpeed={setIntervalDelay}
        isDisabled={isAnimating}
      />
      <Legend />
      <div className="grid" onClick={handleGridClick}>
        {nodes?.map((row, rowIndex) => (
          <div key={rowIndex}>
            {row.map((node, nodeIndex) => (
              <Node
                key={`${node.row}-${node.col}`}
                {...node}
                mouseIsPressed={mouseIsPressed}
                onMouseDown={() => handleMouseDown(node.row, node.col)}
                onMouseEnter={() => handleMouseEnter(node.row, node.col)}
                onMouseUp={handleMouseUp}
                onMouseMove={() => handleMouseMove(node.row, node.col)} // Add this line
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PathFindingVisualizer;
