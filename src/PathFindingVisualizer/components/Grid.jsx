// Grid.jsx
import React from 'react';
import Node from '../Node/Node';

import '../styles/grid.css';

const Grid = ({
  nodes,
  mouseIsPressed,
  handleMouseDown,
  handleMouseEnter,
  handleMouseUp,
  handleMouseMove,
  onClick,
}) => {
  return (
    <div
      className="grid"
      style={{
        gridTemplateColumns: `repeat(${nodes[0]?.length || 1}, 1fr)`,
        gridTemplateRows: `repeat(${nodes.length || 1}, 1fr)`,
      }}
      onClick={onClick}
    >
      {nodes?.map((row, rowIndex) =>
        row.map((node) => (
          <Node
            key={`${node.row}-${node.col}`}
            {...node}
            mouseIsPressed={mouseIsPressed}
            onMouseDown={() => handleMouseDown(node.row, node.col)}
            onMouseEnter={() => handleMouseEnter(node.row, node.col)}
            onMouseUp={handleMouseUp}
            onMouseMove={() => handleMouseMove(node.row, node.col)}
          />
        ))
      )}
    </div>
  );
};

export default Grid;
