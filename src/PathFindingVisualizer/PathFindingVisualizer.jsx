import React, { useState, useEffect, useCallback } from 'react';
import { minHeapDijkstra } from '../algorithms/greedy/dijkstras';
import { getFinalPath } from '../algorithms/algHelpers/globalHelpers';
import { dfs } from '../algorithms/bfs&dfs/dfs';
import { bfs } from '../algorithms/bfs&dfs/bfs';
import Grid from './components/Grid';
import Navbar from './components/Navbar';
import Legend from './components/Legend';
import './styles/navBar.css';
import './styles/grid.css';
import {
  animateAlgorithm,
  animateFinalPath,
  visualizeAlgorithm,
} from './utils/animationUtils';
import { createMouseHandlers } from './utils/mouseHandler';
import {
  initializeGrid,
  resetGrid,
  resetWalls,
  resetPath,
} from './utils/gridUtils';

const PathFindingVisualizer = () => {
  const [nodes, setNodes] = useState([]);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [currentMode, setCurrentMode] = useState('wallMode');
  const [currentAlg, setCurrentAlg] = useState("Dijkstra's");
  const [intervalDelay, setIntervalDelay] = useState(12);
  // eslint-disable-next-line no-unused-vars
  const [animationIds, setAnimationIds] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [draggingNode, setDraggingNode] = useState(null);
  const [startNode, setStartNode] = useState({ row: 10, col: 15 });
  const [finishNode, setFinishNode] = useState({ row: 10, col: 35 });
  const [pathFound, setPathFound] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [reset, setReset] = useState(false);

  useEffect(() => {
    const grid = initializeGrid(startNode, finishNode);
    setNodes(grid);
  }, [startNode, finishNode]);

  const resetGridHandler = useCallback(() => {
    resetGrid(startNode, finishNode, setStartNode, setFinishNode, setNodes);
  }, [startNode, finishNode]);

  const resetWallsHandler = useCallback(() => {
    resetWalls(nodes, setNodes);
  }, [nodes]);

  const resetPathHandler = useCallback(() => {
    resetPath(nodes, setNodes);
  }, [nodes]);

  useEffect(() => {
    const debounce = (func, delay) => {
      let timeout;
      return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), delay);
      };
    };

    const handleResize = debounce(() => {
      resetGrid(startNode, finishNode, setStartNode, setFinishNode, setNodes);
    }, 200);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [startNode, finishNode]);

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
      resetPathHandler();
      setPathFound(false);
    }
  };

  const visualizeCurrAlg = () => {
    visualizeAlgorithm({
      currentAlg,
      nodes,
      startNode,
      finishNode,
      resetPath: resetPathHandler,
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
        resetGrid={resetGridHandler}
        resetWalls={resetWallsHandler}
        visualizeCurrAlg={visualizeCurrAlg}
        setMode={setCurrentMode}
        setSpeed={setIntervalDelay}
        isDisabled={isAnimating}
      />
      <Legend />

      <Grid
        nodes={nodes}
        mouseIsPressed={mouseIsPressed}
        handleMouseDown={handleMouseDown}
        handleMouseEnter={handleMouseEnter}
        handleMouseUp={handleMouseUp}
        handleMouseMove={handleMouseMove}
        onClick={handleGridClick}
      />
    </div>
  );
};

export default PathFindingVisualizer;
