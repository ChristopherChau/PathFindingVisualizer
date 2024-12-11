import { getNewGridWithWall, getNewGridWithWeight } from './gridUtils';

export const createMouseHandlers = ({
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
}) => {
  const handleMouseDown = (row, col) => {
    if (isAnimating) return;
    const node = nodes[row][col];
    if (node.isStart || node.isFinish) {
      setDraggingNode(node.isStart ? 'start' : 'finish');
    } else {
      let newGrid;
      if (currentMode === 'weightMode') {
        newGrid = getNewGridWithWeight(nodes, row, col);
      } else {
        newGrid = getNewGridWithWall(nodes, row, col);
      }
      setNodes(newGrid);
    }
    setMouseIsPressed(true);
  };

  const handleMouseMove = (row, col) => {
    if (!draggingNode && !isAnimating) {
      const node = nodes[row][col];
      if (node.isStart || node.isFinish) return;

      let newGrid;
      if (currentMode === 'weightMode') {
        newGrid = getNewGridWithWeight(nodes, row, col);
      } else {
        newGrid = getNewGridWithWall(nodes, row, col);
      }
      setNodes(newGrid);
    } else if (draggingNode) {
      if (isAnimating) return;
      const newGrid = nodes.map((r) =>
        r.map((node) => ({
          ...node,
          isStart: draggingNode === 'start' ? false : node.isStart,
          isFinish: draggingNode === 'finish' ? false : node.isFinish,
        }))
      );

      newGrid[row][col] = {
        ...newGrid[row][col],
        isStart: draggingNode === 'start',
        isFinish: draggingNode === 'finish',
      };

      setNodes(newGrid);

      if (draggingNode === 'start') {
        setStartNode({ row, col });
      } else if (draggingNode === 'finish') {
        setFinishNode({ row, col });
      }
    }
  };

  const handleMouseEnter = (row, col) => {
    if (isAnimating || !mouseIsPressed) return;
    handleMouseMove(row, col);
  };

  const handleMouseUp = () => {
    if (isAnimating) return;
    setMouseIsPressed(false);
    setDraggingNode(null);
  };

  return {
    handleMouseDown,
    handleMouseMove,
    handleMouseEnter,
    handleMouseUp,
  };
};
