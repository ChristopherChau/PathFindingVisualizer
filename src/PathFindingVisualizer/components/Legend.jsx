import React from 'react';
import '../styles/legend.css'; 
import weightNodeImage from '../../images/weight.svg'; 

const Legend = () => {
  const legendItems = [
    {
      label: 'Start Node',
      image:
        'https://static.vecteezy.com/system/resources/previews/034/371/682/non_2x/simple-map-pin-icon-location-information-and-the-current-location-icon-vector.jpg',
    },
    {
      label: 'End Node',
      image:
        'https://static.vecteezy.com/system/resources/thumbnails/023/257/613/small/flag-icon-isolated-illustration-vector.jpg',
    },
    { label: 'Weight Node', image: weightNodeImage }, 
    { label: 'Unvisited Node', className: 'unvisited-node' },
    {
      label: 'Visited Node',
      classNames: ['visited-node', 'weight-visited-node'],
    },
    { label: 'Shortest-path Node', className: 'shortest-path-node' },
    { label: 'Wall Node', className: 'wall-node' },
  ];

  return (
    <div className="legend-container">
      {legendItems.map((item, index) => (
        <div className="legend-item" key={index}>
          {item.image ? (
            <img src={item.image} alt={item.label} className="legend-icon" />
          ) : item.classNames ? (
            item.classNames.map((className, classIndex) => (
              <div key={classIndex} className={`legend-box ${className}`}></div>
            ))
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
