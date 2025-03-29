import React, { useState } from 'react';
import '../css/Dialog.css';
import { FlightObject } from '../types/FlightObject';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (flightData: FlightObject) => void;
}

function Dialog({ isOpen, onClose, onSubmit }: DialogProps) {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  //if the dialog is close, return null
  if (!isOpen) return null;

  //validate the input data
  const validateInput = (name: string, value: number): boolean => {
    switch (name) {
      case 'altitude':
        if (value < 0 || value > 3000) {
          setErrors(prev => ({ ...prev, altitude: 'Altitude must be between 0 and 3000' }));
          return false;
        }
        break;
      case 'his':
        if (value < 0 || value > 360) {
          setErrors(prev => ({ ...prev, his: 'HIS must be between 0 and 360' }));
          return false;
        }
        break;
      case 'adi':
        if (value < -100 || value > 100) {
          setErrors(prev => ({ ...prev, adi: 'ADI must be between -100 and 100' }));
          return false;
        }
        break;
    }
    
    setErrors(prev => ({ ...prev, [name]: '' }));
    return true;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    //get the input data from the form
    const formData = new FormData(e.currentTarget);
    const altitude = Number(formData.get('altitude'));
    const his = Number(formData.get('his'));
    const adi = Number(formData.get('adi'));

    // Validate all inputs
    const isAltitudeValid = validateInput('altitude', altitude);
    const isHisValid = validateInput('his', his);
    const isAdiValid = validateInput('adi', adi);

    //if the input data is valid, submit the data
    if (isAltitudeValid && isHisValid && isAdiValid) {
      onSubmit({
        altitude,
        his,
        adi,
      } as FlightObject);
    }
  };

  return (
    <div className="dialog-overlay">
      <div className="dialog-content">
        <h2 className="dialog-title">Enter Flight Data</h2>
        <form onSubmit={handleSubmit} className="dialog-form">
          <div className="form-group">
            <label htmlFor="altitude">Altitude (0-3000)</label>
            <input 
              type="number" 
              id="altitude" 
              name="altitude" 
              min="0" 
              max="3000"
              required 
              step="1"
            />
            {errors.altitude && <span className="error-message">{errors.altitude}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="his">HIS (0-360)</label>
            <input 
              type="number" 
              id="his" 
              name="his" 
              min="0" 
              max="360" 
              required 
              step="1"
            />
            {errors.his && <span className="error-message">{errors.his}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="adi">ADI (-100 to 100)</label>
            <input 
              type="number" 
              id="adi" 
              name="adi" 
              min="-100" 
              max="100" 
              required 
              step="1"
            />
            {errors.adi && <span className="error-message">{errors.adi}</span>}
          </div>
          <button type="submit" className="submit-button">Save Flight Data</button>
        </form>
        <button className="dialog-close" onClick={onClose}>×</button>
      </div>
    </div>
  );
}

export default Dialog; 