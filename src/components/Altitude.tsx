import React from 'react';
import altitudeImage from '../images/altitud.png';
import altitudeArrowImage from '../images/altitud_arrow.png';
import '../css/Altitude.css';

interface AltitudeProps {
  altitude: number;
}

function Altitude({ altitude }: AltitudeProps) {
  const topAltitude = 17.5;
  const bottomAltitude = 262.5;

  const altitudeArrowY = topAltitude;



  // Calculate the position as a percentage (0-100)
  // We'll use 10% padding at top and bottom to account for the extra space

  return (
    <div className="altitude-wrapper">
      <div className="altitude-container">
        <img 
          src={altitudeImage} 
          alt="Altitude Tape" 
          className="altitude-tape"
        />
        <img 
          src={altitudeArrowImage} 
          alt="Altitude Arrow" 
          className="altitude-arrow"
          style={{
            marginTop: `${altitudeArrowY}px`
          }}
        />
      </div>
    </div>
  );
}

export default Altitude; 