import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { FlightObject } from '../types/FlightObject';

//Load environment variables
dotenv.config();

const app = express();

//Middleware
app.use(cors());
app.use(express.json());

//MongoDB Connection string
const MONGODB_URI: string = process.env.MONGODB_URI || 'mongodb://localhost:27017/flightcontrollers';

//Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error: Error) => console.error('MongoDB connection error:', error));

//Define Flight Schema
const flightSchema = new mongoose.Schema<FlightObject>({
  altitude: { type: Number, min: 0, max: 3000, required: true },
  his: { type: Number, min: 0, max: 360, required: true },
  adi: { type: Number, min: -100, max: 100, required: true },
});

const Flight = mongoose.model<FlightObject>('Flight', flightSchema);

//Save flight data to MongoDB
app.post('/api/flights', async (req: Request, res: Response) => {
  try {
    const flightData: FlightObject = req.body; //get the flight data from the request body
    const flight = new Flight(flightData); //create a new flight document
    await flight.save(); //save the flight data to MongoDB
    res.status(201).json(flight); //return the flight data
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: 'An unknown error occurred' });
    }
  }
});

//Start the server
const PORT: number = process.env.BACKEND_PORT ? parseInt(process.env.BACKEND_PORT) : 5000;
app.listen(PORT, () => {
  console.log(`API Server is running on port ${PORT}`);
});