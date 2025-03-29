import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import VisualScreen from './VisualScreen';
import TextScreen from './TextScreen';
import Dialog from '../components/Dialog';
import { FlightObject } from '../types/FlightObject';
import '../css/App.css';

const API_URL = process.env.REACT_APP_BACKEND_URL;

function App() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [flightData, setFlightData] = useState<FlightObject | null>(null);


  //open flight data input dialog
  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  //close flight data input dialog
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };
  
  //submit flight data input dialog, save to MongoDB
  const handleSubmit = async (data: FlightObject) => {
    console.log('Submitting flight data:', data);
    
    try {
      // Save to MongoDB
      const response = await fetch(`${API_URL}/api/flights`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to save flight data');
      }

      const savedData = await response.json();
      console.log('Flight data saved:', savedData);
    } catch (error) {
      console.error('Error saving flight data:', error);
    }

    //update the flight data
    setFlightData(data);

    //close the flight data input dialog
    handleCloseDialog();
  };

  return (
    <Router>
      <div className="App">
        <nav className="navigation-bar">
          <ul>
            <li>
              <Link to="/visual">Visual</Link>
            </li>
            <li>
              <Link to="/text">Text</Link>
            </li>
            <li>
              <button className="plus-button" onClick={handleOpenDialog}>+</button>
            </li>
          </ul>
        </nav>
        
        <div className="content">
          <Routes>
            <Route path="/" element={<Navigate to="/visual" replace />} />
            <Route path="/visual" element={<VisualScreen flightData={flightData} />} />
            <Route path="/text" element={<TextScreen flightData={flightData} />} />
          </Routes>
        </div>

        <Dialog 
          isOpen={isDialogOpen} 
          onClose={handleCloseDialog}
          onSubmit={handleSubmit}
        />
      </div>
    </Router>
  );
}

export default App;