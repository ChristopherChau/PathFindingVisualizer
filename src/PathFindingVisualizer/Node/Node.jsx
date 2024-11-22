import React from "react";
import "./Node.css";

const Node = ({
  row,
  col,
  isWall,
  isFinish,
  isStart,
  isVisitedAgain,
  onMouseDown,
  onMouseEnter,
  onMouseUp,
  isFinal,
  isWeight,
}) => {
  // Determine the appropriate CSS class for the node
  const extraClassName = isVisitedAgain && isWeight
    ? "nodeVisited weightNode"
    : isFinish
    ? "nodeFinish"
    : isStart
    ? "nodeStart"
    : isVisitedAgain
    ? "nodeVisited"
    : isWall
    ? "nodeWall"
    : isFinal
    ? "finalNode"
    : isWeight
    ? "weightNode"
    : "";

  return (
    <td
      className={`node ${extraClassName}`}
      onMouseEnter={() => onMouseEnter(row, col)}
      onMouseDown={() => onMouseDown(row, col)}
      onMouseUp={onMouseUp}
    />
  );
};

// Default props for the Node component
Node.defaultProps = {
  row: 0,
  col: 0,
};

export default Node;
