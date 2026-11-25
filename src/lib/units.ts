/**
 * Unit Conversion Utilities
 * 
 * All unit conversions must be handled by pure functions in this file.
 * Never hardcode conversion math inside React components.
 */

/**
 * Convert distance between units
 */
export const DistanceConverter = {
  // Kilometers to Miles
  kmToMiles: (km: number): number => km * 0.621371,
  
  // Miles to Kilometers
  milesToKm: (miles: number): number => miles * 1.609344,
  
  // Convert any distance to kilometers
  toKm: (value: number, fromUnit: 'km' | 'miles'): number => {
    if (fromUnit === 'km') return value;
    return DistanceConverter.milesToKm(value);
  },
  
  // Convert any distance to miles
  toMiles: (value: number, fromUnit: 'km' | 'miles'): number => {
    if (fromUnit === 'miles') return value;
    return DistanceConverter.kmToMiles(value);
  },
};

/**
 * Convert fuel between units
 */
export const FuelConverter = {
  // Liters to Gallons (US)
  LtoGal: (liters: number): number => liters * 0.264172,
  
  // Gallons (US) to Liters
  GaltoL: (gallons: number): number => gallons * 3.78541,
  
  // Convert any fuel value to liters
  toLiters: (value: number, fromUnit: 'L' | 'gal'): number => {
    if (fromUnit === 'L') return value;
    return FuelConverter.GaltoL(value);
  },
  
  // Convert any fuel value to gallons
  toGallons: (value: number, fromUnit: 'L' | 'gal'): number => {
    if (fromUnit === 'gal') return value;
    return FuelConverter.LtoGal(value);
  },
};

/**
 * Calculate fuel consumption based on previous log
 */
export const ConsumptionCalculator = {
  /**
   * Calculate L/100km consumption
   * Formula: (Fuel Used / Distance Traveled) × 100
   */
  calculateLPer100Km: (
    fuelUsedLiters: number,
    distanceTraveledKm: number
  ): number => {
    if (distanceTraveledKm === 0 || isNaN(fuelUsedLiters)) return 0;
    return (fuelUsedLiters / distanceTraveledKm) * 100;
  },
  
  /**
   * Calculate MPG (miles per gallon)
   * Formula: Distance Traveled / Fuel Used
   */
  calculateMPG: (
    distanceTraveledMiles: number,
    fuelUsedGallons: number
  ): number => {
    if (fuelUsedGallons === 0 || isNaN(distanceTraveledMiles)) return 0;
    return distanceTraveledMiles / fuelUsedGallons;
  },
  
  /**
   * Calculate km/L consumption
   */
  calculateKmPerLiter: (
    distanceTraveledKm: number,
    fuelUsedLiters: number
  ): number => {
    if (fuelUsedLiters === 0 || isNaN(distanceTraveledKm)) return 0;
    return distanceTraveledKm / fuelUsedLiters;
  },
};

/**
 * Format consumption value for display based on unit preference
 */
export const formatConsumption = (
  value: number,
  unit: 'L/100km' | 'mpg' | 'km/L' | 'mpg-uk'
): string => {
  if (unit === 'L/100km') return `${value.toFixed(2)} L/100km`;
  if (unit === 'mpg') return `${value.toFixed(2)} mpg`;
  if (unit === 'km/L') return `${value.toFixed(2)} km/L`;
  // mpg-uk
  return `${value.toFixed(2)} mpg (UK)`;
};
