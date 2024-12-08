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
import {
  // FINISH_NODE_ROW,
  // FINISH_NODE_COL,
  // START_NODE_ROW,
  // START_NODE_COL,
  // initializeGrid,
  getNewGridWithWall,
  getNewGridWithWeight,
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

  // let FINISH_NODE_ROW = 10;
  // let FINISH_NODE_COL = 35;
  // let START_NODE_ROW = 10;
  // let START_NODE_COL = 15;

  const clampPosition = (pos, max) => Math.min(pos, max - 1);

  const NODE_WIDTH = 28; // width of each node in pixels
  const NODE_HEIGHT = 28; // height of each node in pixels

  const MAX_ROWS = 25; // Maximum number of rows

const calculateDimensions = () => {
  const rows = Math.min(Math.floor(window.innerHeight / NODE_HEIGHT), MAX_ROWS);
  const cols = Math.floor(window.innerWidth / NODE_WIDTH);
  return { rows, cols };
};

const initializeGrid = () => {
    const { rows, cols } = calculateDimensions();
    const grid = Array.from({ length: rows }, (_, row) =>
      Array.from({ length: cols }, (_, col) =>
        createNode(row, col, startNode, finishNode)
      )
    );
    setNodes(grid);
  };
  
  useEffect(() => {
    initializeGrid();
  }, []); // Empty dependency array ensures this runs only once
  
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

  const createNode = (row, col, updatedStartNode, updatedFinishNode) => {
    return {
      row,
      col,
      isStart: row === updatedStartNode.row && col === updatedStartNode.col,
      isFinish: row === updatedFinishNode.row && col === updatedFinishNode.col,
      distance: Infinity,
      isVisited: false,
      isWall: false,
      previousNode: null,
      weight: 1,
    };
  };

  let reset = false;
  let pathFound = false;

  const resetWalls = useCallback(() => {
    const newGrid = nodes.slice();
    for (let row of newGrid) {
      for (let node of row) {
        node.isWall = false;
      }
    }
    setNodes(newGrid);
  }, [nodes]);
  const resetButtonHandler = () => {
    clearAnimations(); // Stop ongoing animations
    resetGrid(); // Reset the entire grid
    pathFound = false; // Reset path flag
  };

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

  const handleMouseDown = (row, col) => {
    const node = nodes[row][col];
    if (node.isStart || node.isFinish) {
      setDraggingNode(node.isStart ? "start" : "finish");
    } else {
      let newGrid;
      if (currentMode === "weightMode") {
        newGrid = getNewGridWithWeight(nodes, row, col);
      } else {
        newGrid = getNewGridWithWall(nodes, row, col);
      }
      setNodes(newGrid);
    }
    setMouseIsPressed(true);
  };

  const handleMouseMove = (row, col) => {
    if (!mouseIsPressed) return;

    const node = nodes[row][col];
    if (draggingNode) {
      if (node.isStart || node.isFinish) return;

      const newGrid = nodes.map((r) =>
        r.map((node) => ({
          ...node,
          isStart: draggingNode === "start" ? false : node.isStart,
          isFinish: draggingNode === "finish" ? false : node.isFinish,
        }))
      );

      newGrid[row][col] = {
        ...newGrid[row][col],
        isStart: draggingNode === "start",
        isFinish: draggingNode === "finish",
      };

      setNodes(newGrid);

      if (draggingNode === "start") {
        setStartNode({ row, col });
      } else if (draggingNode === "finish") {
        setFinishNode({ row, col });
      }
    } else {
      if (node.isStart || node.isFinish) return;
      let newGrid;
      if (currentMode === "weightMode") {
        newGrid = getNewGridWithWeight(nodes, row, col);
      } else {
        newGrid = getNewGridWithWall(nodes, row, col);
      }
      setNodes(newGrid);
    }
  };

  const handleMouseEnter = (row, col) => {
    if (!mouseIsPressed) return;
    handleMouseMove(row, col);
  };

  const handleMouseUp = () => {
    setMouseIsPressed(false);
    setDraggingNode(null);
  };

  const animateAlgorithm = (visitedNodesInOrder) => {
    return new Promise((resolve) => {
      const ids = [];
      visitedNodesInOrder.forEach((node, i) => {
        const id = setTimeout(() => {
          if (reset) return; // Abort if reset is triggered
          const newGrid = nodes.slice();
          const newNode = { ...node, isVisitedAgain: true };
          newGrid[node.row][node.col] = newNode;
          setNodes(newGrid);
          if (i === visitedNodesInOrder.length - 1) {
            resolve(); // Resolve when animation finishes
          }
        }, intervalDelay * i);
        ids.push(id);
      });
      setAnimationIds(ids);
    });
  };

  const animateFinalPath = async (finalPathNodes) => {
    const ids = [];
    for (let i = 0; i < finalPathNodes.length; i++) {
      if (reset) return; // Abort if reset is triggered
      await new Promise((resolve) => {
        const id = setTimeout(() => {
          const newGrid = nodes.slice();
          const newNode = { ...finalPathNodes[i], isFinal: true };
          newGrid[finalPathNodes[i].row][finalPathNodes[i].col] = newNode;
          setNodes(newGrid);
          resolve();
        }, intervalDelay);
        ids.push(id);
      });
    }
    setAnimationIds((prev) => [...prev, ...ids]);
  };

  const clearAnimations = useCallback(() => {
    animationIds.forEach((id) => clearTimeout(id));
    setAnimationIds([]);
  }, [animationIds]);

  const visualizeCurrAlg = async () => {
    clearAnimations(); // Stop ongoing animations
    reset = true; // Trigger reset
    await new Promise((resolve) => setTimeout(resolve, 100)); // Short delay to ensure reset completes
    reset = false;

    resetPath(); // Reset the grid

    // Ensure nodes are properly initialized
    if (!nodes || nodes.length === 0) {
      console.error("Nodes are not initialized");
      return;
    }

    let visitedNodesInOrder;
    const startNodeObj = nodes[startNode.row][startNode.col];
    const finishNodeObj = nodes[finishNode.row][finishNode.col];

    if (currentAlg === "Dijkstra's") {
      startNodeObj.distance = 0;
      visitedNodesInOrder = minHeapDijkstra(nodes, startNodeObj, finishNodeObj);
    } else if (currentAlg === "BFS") {
      visitedNodesInOrder = bfs(nodes, startNodeObj, finishNodeObj);
    } else if (currentAlg === "DFS") {
      visitedNodesInOrder = dfs(nodes, startNodeObj, finishNodeObj);
    }

    setIsAnimating(true); // Disable grid interactions

    await animateAlgorithm(visitedNodesInOrder);

    const finalPath = getFinalPath(nodes[finishNode.row][finishNode.col]);
    await animateFinalPath(finalPath);

    setIsAnimating(false); // Re-enable grid interactions
    pathFound = true;
  };

  const handleGridClick = () => {
    if (pathFound) {
      resetPath(); // Resets all path-related nodes
      pathFound = false; // Prevent multiple resets
    }
  };

  return (
    <div className="container">
      <Navbar
        currentAlg={currentAlg}
        setCurrentAlgorithm={setCurrentAlg}
        resetGrid={resetButtonHandler}
        resetWalls={resetWalls}
        visualizeCurrAlg={() => visualizeCurrAlg(nodes)}
        setMode={setCurrentMode}
        setSpeed={setIntervalDelay}
        isDisabled={isAnimating} // Add this prop
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
