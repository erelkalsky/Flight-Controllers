import React from 'react';
import { FlightObject } from '../types/FlightObject';
import '../css/TextScreen.css';

interface TextScreenProps {
  flightData: FlightObject | null;
}

function TextScreen({ flightData }: TextScreenProps) {
  return (
    <div className="text-screen">
      <h1>Text Display</h1>
      {flightData ? (
        <div className="flight-data">
          <div className="data-item">
            <h3>Altitude</h3>
            <p>{flightData.altitude} ft</p>
          </div>
          <div className="data-item">
            <h3>HIS</h3>
            <p>{flightData.his}°</p>
          </div>
          <div className="data-item">
            <h3>ADI</h3>
            <p>{flightData.adi}°</p>
          </div>
        </div>
      ) : (
        <p>No flight data available</p>
      )}
    </div>
  );
}

export default TextScreen;