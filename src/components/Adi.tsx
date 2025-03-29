import adiImage from '../images/adi.png';
import '../css/Adi.css';

interface AdiProps {
  adi: number; // -100 to 100
}

function Adi({ adi }: AdiProps) {
  // Convert adi from -100 to 100 range to percentage (0 to 100)
  const skyPercentage = Math.min(Math.max((adi + 100) / 2, 0), 100);
  
  const skyColor = '#87CEEB'; // Light blue for sky
  const groundColor = '#DAA520'; // Sand color for ground

  return (
    <div className="adi-wrapper">
      <div className="adi-container">
        <div 
          className="adi-background"
          style={{
            background: `linear-gradient(to bottom, ${skyColor} ${skyPercentage}%, ${groundColor} ${skyPercentage}%)`
          }}
        />
        <img
          src={adiImage}
          alt="ADI"
          className="adi-image"
        />
      </div>
    </div>
  );
}

export default Adi;