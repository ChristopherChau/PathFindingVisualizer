import React, { useState, useEffect, useCallback } from "react";
import { minHeapDijkstra } from "../algorithms/greedy/dijkstras";
import { getFinalPath } from "../algorithms/algHelpers/globalHelpers";
import { dfs } from "../algorithms/bfs&dfs/dfs";
import { bfs } from "../algorithms/bfs&dfs/bfs";
import Node from "./Node/Node";
import Navbar from "./components/Navbar";
import "./styles/navBar.css";
import "./styles/grid.css";
import {
  FINISH_NODE_ROW,
  FINISH_NODE_COL,
  START_NODE_ROW,
  START_NODE_COL,
  initializeGrid,
  getNewGridWithWall,
  getNewGridWithWeight,
} from "./grid/helper";

const PathFindingVisualizer = () => {
  const [nodes, setNodes] = useState([]);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [currentMode, setCurrentMode] = useState("wallMode");
  const [currentAlg, setCurrentAlg] = useState("Dijkstra's");
  const [intervalDelay, setIntervalDelay] = useState(12);
  const [algorithmDone, setAlgorithmDone] = useState(false);
  const [animationId, setAnimationId] = useState(null);


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

  const resetGrid = useCallback(() => {
    const grid = initializeGrid();
    setNodes(grid);
    reset = false;
  }, []);

  useEffect(() => {
    resetGrid();
  }, [resetGrid]);

  const handleMouseDown = (row, col) => {
    if (pathFound) {
      pathFound = false;
      resetPath();
    }
    let newGrid;
    if (currentAlg !== "Dijkstra's") return;
    if (currentMode === "weightMode") {
      newGrid = getNewGridWithWeight(nodes, row, col);
    } else {
      newGrid = getNewGridWithWall(nodes, row, col);
    }
    setNodes(newGrid);
    setMouseIsPressed(true);
  };

  const handleMouseEnter = (row, col) => {
    if (!mouseIsPressed) return;
    let newGrid;
    if (currentMode === "weightMode") {
      newGrid = getNewGridWithWeight(nodes, row, col);
    } else {
      newGrid = getNewGridWithWall(nodes, row, col);
    }
    setNodes(newGrid);
  };

  const handleMouseUp = () => setMouseIsPressed(false);

  const animateAlgorithm = (visitedNodesInOrder) => {
    return new Promise((resolve) => {
      const id = setTimeout(() => {
        visitedNodesInOrder.forEach((node, i) => {
          setTimeout(() => {
            if (reset) return; // Abort if reset is triggered
            const newGrid = nodes.slice();
            const newNode = { ...node, isVisitedAgain: true };
            newGrid[node.row][node.col] = newNode;
            setNodes(newGrid);
            if (i === visitedNodesInOrder.length - 1) {
              resolve(); // Resolve when animation finishes
            }
          }, intervalDelay * i);
        });
      }, 0);
      setAnimationId(id);
    });
  };
  
  const animateFinalPath = async (finalPathNodes) => {
    for (let i = 0; i < finalPathNodes.length; i++) {
      if (reset) return; // Abort if reset is triggered
      await new Promise((resolve) => {
        setTimeout(() => {
          const newGrid = nodes.slice();
          const newNode = { ...finalPathNodes[i], isFinal: true };
          newGrid[finalPathNodes[i].row][finalPathNodes[i].col] = newNode;
          setNodes(newGrid);
          resolve();
        }, intervalDelay);
      });
    }
  };
  
  

  const visualizeCurrAlg = async () => {
    // Abort ongoing animations
    if (animationId) {
      clearTimeout(animationId);
      setAnimationId(null);
    }
    reset = true; // Trigger reset
    await new Promise((resolve) => setTimeout(resolve, 100)); // Short delay to ensure reset completes
    reset = false;
  
    resetPath(); // Reset the grid
    let visitedNodesInOrder;
    const startNode = nodes[START_NODE_ROW][START_NODE_COL];
    const finishNode = nodes[FINISH_NODE_ROW][FINISH_NODE_COL];
  
    if (currentAlg === "Dijkstra's") {
      startNode.distance = 0;
      visitedNodesInOrder = minHeapDijkstra(nodes, startNode, finishNode);
    } else if (currentAlg === "BFS") {
      visitedNodesInOrder = bfs(nodes, startNode, finishNode);
    } else if (currentAlg === "DFS") {
      visitedNodesInOrder = dfs(nodes, startNode, finishNode);
    }
  
    await animateAlgorithm(visitedNodesInOrder);
  
    const finalPath = getFinalPath(nodes[FINISH_NODE_ROW][FINISH_NODE_COL]);
    await animateFinalPath(finalPath);
  
    pathFound = true;
  };
  
  

  return (
    <div className="container">
      <Navbar
        currentAlg={currentAlg}
        setCurrentAlgorithm={setCurrentAlg}
        resetGrid={resetGrid}
        resetWalls={resetWalls}
        visualizeCurrAlg={() => visualizeCurrAlg(nodes)}
        setMode={setCurrentMode}
        setSpeed={setIntervalDelay}
      />
      <table className="grid">
        <tbody>
          {nodes.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((node, nodeIndex) => (
                <Node
                  key={nodeIndex}
                  {...node}
                  mouseIsPressed={mouseIsPressed}
                  onMouseDown={() => handleMouseDown(node.row, node.col)}
                  onMouseEnter={() => handleMouseEnter(node.row, node.col)}
                  onMouseUp={handleMouseUp}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PathFindingVisualizer;
