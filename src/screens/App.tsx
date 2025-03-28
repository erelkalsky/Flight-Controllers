import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import VisualScreen from './VisualScreen';
import TextScreen from './TextScreen';
import Dialog from '../components/Dialog';
import { FlightObject } from '../types/FlightObject';
import '../css/App.css';

function App() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [flightData, setFlightData] = useState<FlightObject | null>(null);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleSubmit = (data: FlightObject) => {
    console.log('Flight data received:', data);
    setFlightData(data);
    // Here you would typically:
    // 1. Save to MongoDB
    // 2. Update the UI
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
            <Route path="/" element={<VisualScreen flightData={flightData} />} />
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