import { Document } from "mongoose";

export interface FlightObject extends Document {
  altitude: number;  // 0-3000
  his: number;      // 0-360
  adi: number;      // -100 to 100
}