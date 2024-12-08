import React from "react";
import "../styles/legend.css"; // Import custom styles if needed

const Legend = () => {
    const legendItems = [
        { label: "Start Node", image: "/path-to-start-image.png" },
        { label: "End Node", image: "/path-to-end-image.png" },
        { label: "Weight Node", image: "/images/weight.svg" }, 
        { label: "Unvisited Node", className: "unvisited-node" },
        { label: "Visited Node", className: "visited-node" },
        { label: "Shortest-path Node", className: "shortest-path-node" },
        { label: "Wall Node", className: "wall-node" },
      ];

  return (
    <div className="legend-container">
      {legendItems.map((item, index) => (
        <div className="legend-item" key={index}>
          {item.image ? (
            <img src={item.image} alt={item.label} className="legend-icon" />
          ) : (
            <div className={`legend-box ${item.className}`}></div>
          )}
          <span className="legend-label">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default Legend;
