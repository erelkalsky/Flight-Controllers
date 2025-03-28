import altitudeImage from '../images/altitude.png';
import altitudeArrowImage from '../images/altitude_arrow.png';
import '../css/Altitude.css';

interface AltitudeProps {
  altitude: number;
}

function Altitude({ altitude }: AltitudeProps) {
  const topAltitude = 20.5;
  const bottomAltitude = 276;

  const totalHeight = bottomAltitude - topAltitude;
  const part = totalHeight / 5; // 49px per visual part
  
  const altitudeArrowY = getMarginTop(altitude);

  function getMarginTop(altitude: number): number {  
    const lowSectionHeight = part * 2;   // 98
    const midSectionHeight = part;       // 49
    const highSectionHeight = part * 2;  // 98
  
    let marginTop: number;
  
    if (altitude <= 1000) {
      const ratio = altitude / 1000;
      marginTop = bottomAltitude - ratio * lowSectionHeight;
    } else if (altitude <= 2000) {
      const ratio = (altitude - 1000) / 1000;
      marginTop = bottomAltitude - lowSectionHeight - ratio * midSectionHeight;
    } else {
      const ratio = (altitude - 2000) / 1000;
      marginTop = bottomAltitude - lowSectionHeight - midSectionHeight - ratio * highSectionHeight;
    }
  
    return marginTop;
  }


  // Calculate the position as a percentage (0-100)
  // We'll use 10% padding at top and bottom to account for the extra space

  return (
    <div className="altitude-wrapper">
      <div className="altitude-container">
        <div className="altitude-display">
          <img 
            src={altitudeArrowImage} 
            alt="Altitude Arrow" 
            className="altitude-arrow"
            style={{
              marginTop: `${altitudeArrowY}px`
            }}
          />
          <img 
            src={altitudeImage} 
            alt="Altitude Tape" 
            className="altitude-tape"
          />
        </div>
      </div>
    </div>
  );
}

export default Altitude; 