import React from 'react';
import compassImage from '../images/compas.png';
import compassArrowImage from '../images/compas_arrow.png';
import '../css/Compass.css';

interface CompassProps {
  degrees: number;
}

function Compass({ degrees }: CompassProps) {
  return (
    <div className="compass-wrapper">
      <div className="compass-container">
        <img
          src={compassImage}
          alt="Compass"
          className="compass-image"
          style={{
            transform: `rotate(${degrees}deg)`
          }}
        />
        <img
          src={compassArrowImage}
          alt="Compass Arrow"
          className="compass-arrow"
        />
      </div>
    </div>
  );
}

export default Compass; 