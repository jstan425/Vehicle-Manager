/**
 * Type Definitions
 * 
 * Strict TypeScript interfaces for all data models.
 * No `any` types allowed - use proper typing everywhere.
 */

import { Theme } from './theme';

/**
 * Fuel Types
 */
export type FuelType = 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid' | 'CNG' | 'Biodiesel' | string;

/**
 * Distance Units
 */
export type DistanceUnit = 'km' | 'miles';

/**
 * Fuel Units
 */
export type FuelUnit = 'L' | 'gal';

/**
 * Consumption Units
 */
export type ConsumptionUnit = 'L/100km' | 'mpg' | 'km/L' | 'mpg-uk';

/**
 * Secondary Fuel Unit (for PHEV)
 */
export type SecondaryFuelUnit = 'L' | 'gal' | 'kWh' | null;

/**
 * Vehicle Interface
 * 
 * Auto-generated name: If `name` is empty, it must resolve to `${model}_${plateNumber}`
 * Dual Fuel (PHEV): If `isDualFuel` is false, secondaryFuelUnit and secondaryTankCapacity must be null
 */
export interface Vehicle {
  id: string;
  
  // Basic Info
  name: string;           // Auto-generated if empty: {model}_{plate}
  make: string;
  model: string;
  year: number;
  plateNumber: string;
  vin: string;
  insurancePolicy: string;
  isActive: boolean;
  
  // Units & Fuel
  fuelType: FuelType;
  distanceUnit: DistanceUnit;
  fuelUnit: FuelUnit;
  consumptionUnit: ConsumptionUnit;
  
  // Dual Fuel / PHEV
  isDualFuel: boolean;
  secondaryFuelUnit: SecondaryFuelUnit;
  
  // Capacities
  tankCapacity: number | null;
  secondaryTankCapacity: number | null;
  
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Fuel Log Interface
 */
export interface FuelLog {
  id: string;
  vehicleId: string;
  date: Date;
  odometerReading: number;
  fuelAmount: number;           // Amount added (liters or gallons)
  totalCost: number;
  isFullTank: boolean;          // Crucial for accurate consumption calculation
  notes?: string;
  
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Vehicle Statistics
 */
export interface VehicleStats {
  vehicleId: string;
  totalFuelLogs: number;
  averageConsumption: number;    // In user's preferred unit
  totalDistanceTraveled: number;
  totalFuelUsed: number;
  lastOdometerReading: number;
}

/**
 * Theme State
 */
export interface ThemeState {
  currentTheme: Theme;
  setTheme: (theme: Theme) => void;
}

/**
 * Vehicle State
 */
export interface VehicleState {
  vehicles: Vehicle[];
  selectedVehicleId: string | null;
  addVehicle: (vehicle: Omit<Vehicle, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateVehicle: (id: string, updates: Partial<Vehicle>) => Promise<void>;
  deleteVehicle: (id: string) => Promise<void>;
  selectVehicle: (id: string | null) => void;
}

/**
 * Fuel Log State
 */
export interface FuelLogState {
  logs: FuelLog[];
  selectedVehicleId: string | null;
  addFuelLog: (log: Omit<FuelLog, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  deleteLog: (id: string) => Promise<void>;
}

/**
 * App State (Combined)
 */
export interface AppState {
  theme: ThemeState;
  vehicles: VehicleState;
  fuelLogs: FuelLogState;
}
