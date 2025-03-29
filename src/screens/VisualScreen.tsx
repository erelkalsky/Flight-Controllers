import { FlightObject } from '../types/FlightObject';
import Compass from '../components/Compass';
import Adi from '../components/Adi';
import Altitude from '../components/Altitude';
import '../css/VisualScreen.css';

interface VisualScreenProps {
  flightData: FlightObject | null;
}

function VisualScreen({ flightData }: VisualScreenProps) {
  return (
    <div className="visual-screen">
      <h1>Visual Display</h1>
      {flightData ? (
        <div className="instruments-container">
          <div className="instrument">
            <Altitude altitude={flightData.altitude} />
          </div>
          <div className="instrument">
            <Compass degrees={flightData.his} />
          </div>
          <div className="instrument">
            <Adi adi={flightData.adi} />
          </div>
        </div>
      ) : (
        <p>No flight data available</p>
      )}
    </div>
  );
}

export default VisualScreen;