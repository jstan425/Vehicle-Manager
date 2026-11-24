# Vehicle Management Tracker - System Design

## 1. Overview
A mobile-first vehicle management tracker with a web companion app. The application allows users to manage vehicle profiles and record fuel logs. It is built to be highly customizable, supporting mixed unit systems, dual-fuel vehicles (PHEV), and multiple UI themes.

## 2. Technology Stack
To ensure the codebase is highly maintainable and contributor-friendly, the following stack is selected:
- **Framework:** React Native + Expo (SDK 51+)
- **Language:** TypeScript (Strict mode enabled for type safety and better IDE support)
- **Routing:** Expo Router (File-based routing, works seamlessly on Mobile and Web)
- **Styling & Theming:** NativeWind (TailwindCSS for React Native) for rapid, consistent styling and easy theme management.
- **State Management:** Zustand (Lightweight, simple, and scalable)
- **Data Persistence:** `expo-sqlite` (Local-first, offline-capable) with optional future cloud sync via Supabase or Drizzle ORM.
- **Forms & Validation:** React Hook Form + Zod (Type-safe form validation)

## 3. Core Features & User Flows

### 3.1 Vehicle Profile Management
Users can create and manage vehicle profiles. 
- **Profile Name:** Required. If left blank by the user, the system auto-generates a placeholder: `{model}_{carplatenumber}` (e.g., `Vios_ABC1234`).
- **Units Configuration:** 
  - Distance Unit (km, miles)
  - Fuel Unit (Liters, Gallons)
  - Consumption Unit (L/100km, MPG, km/L, etc.)
  - *Note: Users can mix and match metric/imperial based on regional preferences.*
- **Fuel Type:** Dropdown selection (Petrol, Diesel, Electric, Hybrid, etc.).
- **Dual Fuel System (PHEV):** Toggle to enable. If enabled, users can select a secondary fuel unit and input a secondary tank capacity.
- **Optional Details:** Tank capacity, Make, Model, Year, Plate Number, VIN, Insurance Policy Number.
- **Status:** Active/Inactive toggle. Inactive vehicles are hidden from the main dashboard but remain in the database.

### 3.2 Fuel Recording (Core Function)
- Quick-add interface to log fuel fill-ups.
- Inputs: Date, Odometer reading, Fuel amount, Total cost, Full tank toggle (crucial for accurate consumption calculation), and Notes.
- Automatically calculates consumption based on the vehicle's preferred units and previous logs.

### 3.3 Settings & Theming
- **Themes:** Light Mode, Dark Mode, and "Secret Black" Mode (True `#000000` for OLED screens to save battery and provide deep contrast).
- **Settings Page:** Centralized hub for theme toggling, default unit preferences, data export/import, and future fine-tuning options.

## 4. Data Models

### Vehicle
```typescript
interface Vehicle {
  id: string;
  name: string; // Auto-generated if empty: {model}_{plate}
  make: string;
  model: string;
  year: number;
  plateNumber: string;
  vin: string;
  insurancePolicy: string;
  isActive: boolean;
  
  // Units & Fuel
  fuelType: string;
  distanceUnit: 'km' | 'miles';
  fuelUnit: 'L' | 'gal';
  consumptionUnit: 'L/100km' | 'mpg' | 'km/L' | 'mpg-uk';
  
  // Dual Fuel / PHEV
  isDualFuel: boolean;
  secondaryFuelUnit: 'L' | 'gal' | 'kWh' | null;
  
  // Capacities
  tankCapacity: number | null;
  secondaryTankCapacity: number | null;
  
  createdAt: Date;
  updatedAt: Date;
}