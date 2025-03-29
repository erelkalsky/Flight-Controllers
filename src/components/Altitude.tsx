import altitudeImage from '../images/altitude.png';
import altitudeArrowImage from '../images/altitude_arrow.png';
import '../css/Altitude.css';

interface AltitudeProps {
  altitude: number;
}

function Altitude({ altitude }: AltitudeProps) {
  const topAltitude = 20.5; //minimun margin top if altitude is 3000
  const bottomAltitude = 276; //maximum margin top if altitude is 0
  const totalHeight = bottomAltitude - topAltitude;

  //calculate the height of each part
  const part = totalHeight / 5;

  const altitudeArrowY = getMarginTop(altitude);

  function getMarginTop(altitude: number): number {  
    /*
    In the altiude image there is 5 part beacuse the
    space between 2000-3000 and 0-1000
    is 2:1 with the space between 1000-2000
    */
    const lowSectionHeight = part * 2;
    const midSectionHeight = part;
    const highSectionHeight = part * 2;
  
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