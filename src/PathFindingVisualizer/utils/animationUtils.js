// utils.js

export const animateAlgorithm = (nodes, visitedNodesInOrder, intervalDelay, resetCallback, setNodes, setAnimationIds) => {
    return new Promise((resolve) => {
      const ids = [];
      visitedNodesInOrder.forEach((node, i) => {
        const id = setTimeout(() => {
          if (resetCallback()) return; // Abort if reset is triggered
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
  
  export const animateFinalPath = async (nodes, finalPathNodes, intervalDelay, resetCallback, setNodes, setAnimationIds) => {
    const ids = [];
    for (let i = 0; i < finalPathNodes.length; i++) {
      if (resetCallback()) return; // Abort if reset is triggered
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
  
  export const clearAnimations = (animationIds, setAnimationIds) => {
    animationIds.forEach((id) => clearTimeout(id));
    setAnimationIds([]);
  };
  
  export const visualizeAlgorithm = async (params) => {
    const {
      currentAlg,
      nodes,
      startNode,
      finishNode,
      resetPath,
      animateAlgorithmFn,
      animateFinalPathFn,
      setIsAnimating,
      setPathFound,
    } = params;
  
    // Stop animations and reset grid
    resetPath();
  
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
      visitedNodesInOrder = params.minHeapDijkstra(nodes, startNodeObj, finishNodeObj);
    } else if (currentAlg === "BFS") {
      visitedNodesInOrder = params.bfs(nodes, startNodeObj, finishNodeObj);
    } else if (currentAlg === "DFS") {
      visitedNodesInOrder = params.dfs(nodes, startNodeObj, finishNodeObj);
    }
  
    setIsAnimating(true); // Disable grid interactions
    await animateAlgorithmFn(nodes, visitedNodesInOrder, params.intervalDelay, params.reset, params.setNodes, params.setAnimationIds);
  
    const finalPath = params.getFinalPath(nodes[finishNode.row][finishNode.col]);
    await animateFinalPathFn(nodes, finalPath, params.intervalDelay, params.reset, params.setNodes, params.setAnimationIds);
  
    setIsAnimating(false); // Re-enable grid interactions
    setPathFound(true);
  };
  