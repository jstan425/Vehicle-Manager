/**
 * Zod Validation Schemas
 * 
 * Type-safe form validation using react-hook-form + zod.
 */

import { z } from 'zod';

/**
 * Vehicle Creation/Update Schema
 */
export const vehicleSchema = z.object({
  name: z.string().min(1, 'Vehicle name is required').optional(),
  make: z.string().min(1, 'Make is required'),
  model: z.string().min(1, 'Model is required'),
  year: z.number().int().min(1900).max(new Date().getFullYear() + 1),
  plateNumber: z.string().min(1, 'Plate number is required'),
  vin: z.string().optional(),
  insurancePolicy: z.string().optional(),
  isActive: z.boolean().default(true),
  
  // Units & Fuel
  fuelType: z.string().min(1, 'Fuel type is required'),
  distanceUnit: z.enum(['km', 'miles']),
  fuelUnit: z.enum(['L', 'gal']),
  consumptionUnit: z.enum(['L/100km', 'mpg', 'km/L', 'mpg-uk']),
  
  // Dual Fuel / PHEV
  isDualFuel: z.boolean(),
  secondaryFuelUnit: z.union([
    z.enum(['L', 'gal', 'kWh']),
    z.null()
  ]),
  
  // Capacities
  tankCapacity: z.number().positive().or(z.null()),
  secondaryTankCapacity: z.number().positive().or(z.null()),
});

/**
 * Fuel Log Schema
 */
export const fuelLogSchema = z.object({
  vehicleId: z.string(),
  date: z.date(),
  odometerReading: z.number().nonnegative(),
  fuelAmount: z.number().positive(),
  totalCost: z.number().nonnegative(),
  isFullTank: z.boolean(),
  notes: z.string().optional(),
});

/**
 * Theme Schema
 */
export const themeSchema = z.enum(['light', 'dark', 'secret-black']);

/**
 * Combined Vehicle Form Schema (for react-hook-form)
 */
export type VehicleFormValues = z.infer<typeof vehicleSchema>;
export type FuelLogFormValues = z.infer<typeof fuelLogSchema>;
