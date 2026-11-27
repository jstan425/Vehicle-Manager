# Vehicle Management Tracker — Complete System Design

## 1. Product Overview
The Vehicle Management Tracker is a **mobile-first** application with a **web companion** experience. Its primary purpose is to help users create detailed vehicle profiles and record basic vehicle usage information, with a core focus on fuel logging. 

The product is designed to be simple, fast, and practical for daily use on mobile devices, while the web version provides a larger-screen companion experience for managing data, reviewing logs, and editing profiles.

---

## 2. Technology Stack
To ensure the codebase is highly maintainable, type-safe, and contributor-friendly, the following stack is selected:

***
**🚀 CORE FOCUS DIRECTIVE (User Update)**
I would like to focus on the core of the app. The purpose of the app is to log expenses that are involved directly on the vehicle, this involves fuel, car service, car maintenance etc. Let's work more into fuel log. Instead of standard manual logging, I want to prioritize:
1. Reading notifications from the mobile app when payment is made (auto-logging).
2. Taking a picture of the receipt and using OCR to populate the log.
***
- **Framework:** React Native + Expo (SDK 51+)
- **Language:** TypeScript (Strict mode enabled)
- **Routing:** Expo Router (File-based routing, seamless mobile and web support)
- **Styling & Theming:** NativeWind (TailwindCSS for React Native) for rapid, consistent styling and easy theme management.
- **State Management:** Zustand (Lightweight, simple, and scalable)
- **Data Persistence:** `expo-sqlite` (Local-first, offline-capable) with a clean repository pattern for future cloud sync (e.g., Supabase).
- **Forms & Validation:** React Hook Form + Zod (Type-safe form validation)

---

## 3. Core Features & User Flows

### 3.1 Vehicle Profile Management
Users can create and manage multiple vehicle profiles.
- **Profile Name:** 
  - User can input a custom name.
  - **Fallback Rule:** If left blank, the system auto-generates the name as `{model}_{carplatenumber}` (e.g., `Vios_ABC1234`). If model or plate is missing, it falls back to `Unnamed Vehicle`.
- **Preferred Units:** Users can mix and match metric/imperial based on regional preferences:
  - Distance Unit: `km`, `miles`
  - Fuel Unit: `L`, `US gal`, `Imp gal`, `kWh`
  - Consumption Unit: `L/100km`, `km/L`, `MPG`, `kWh/100km`, `km/kWh`
- **Fuel Type:** Dropdown selection (Petrol, Diesel, Electric, Hybrid, PHEV, LPG, CNG, Other).
- **Dual Fuel System (e.g., PHEV):** 
  - Toggle to enable. 
  - If enabled: Shows secondary fuel unit selection and secondary tank capacity input.
  - If disabled: Hides secondary fields and sets them to `null`.
- **Optional Details:** Tank capacity, Car Make, Car Model, Year of Make, Car Plate Number, VIN, Insurance Policy Number.
- **Status:** Active/Inactive toggle. Inactive vehicles are hidden from the main dashboard quick-actions but remain accessible in the vehicle list for editing or historical log viewing.

### 3.2 Fuel Recording (Core Function)
The primary action of the app. Designed for speed and minimal typing.
- **Inputs:** Date/Time (defaults to now), Odometer reading, Fuel amount, Total cost, Full tank toggle (crucial for accurate consumption calculation), Fuel System selector (if dual fuel), Station name, and Notes.
- **Calculations:** Automatically calculates distance since the last log and estimated consumption based on the vehicle's preferred units.

### 3.3 Settings & Theming
A centralized hub for user preferences and future fine-tuning.
- **Themes:** 
  - Light Mode (Standard bright theme)
  - Dark Mode (Standard dark theme)
  - Secret Black Mode (True `#000000` background for OLED screens, high-contrast text, reduced surface elevation)
- **App Preferences:** Default active vehicle, default unit preferences, and toggles for future advanced features.

---

## 4. Complete Data Models

### Vehicle Profile
```typescript
interface Vehicle {
  id: string; // UUID
  name: string; // Auto-generated if empty: `${model}_${plateNumber}`
  isActive: boolean; // Default: true
  
  // Units & Fuel
  distanceUnit: 'km' | 'miles';
  fuelUnit: 'L' | 'US gal' | 'Imp gal' | 'kWh';
  consumptionUnit: 'L/100km' | 'km/L' | 'MPG' | 'kWh/100km' | 'km/kWh';
  fuelType: 'petrol' | 'diesel' | 'electric' | 'hybrid' | 'phev' | 'lpg' | 'cng' | 'other';
  
  // Dual Fuel / PHEV
  isDualFuel: boolean; // Default: false
  secondaryFuelUnit: 'L' | 'US gal' | 'Imp gal' | 'kWh' | null;
  
  // Capacities
  tankCapacity: number | null;
  secondaryTankCapacity: number | null;
  
  // Optional Details
  carMake: string | null;
  carModel: string | null;
  yearOfMake: number | null;
  carPlateNumber: string | null;
  vin: string | null;
  insurancePolicyNumber: string | null;
  
  createdAt: string; // ISO Date
  updatedAt: string; // ISO Date
}
```

### Fuel Log
```typescript
interface FuelLog {
  id: string; // UUID
  vehicleId: string; // Foreign Key to Vehicle
  loggedAt: string; // ISO Date
  
  odometer: number | null;
  fuelSystem: 'primary' | 'secondary'; // Defaults to 'primary'
  
  fuelAmount: number; 
  fuelUnit: string; // Snapshot of the unit at the time of logging
  
  costTotal: number | null;
  pricePerUnit: number | null;
  station: string | null;
  notes: string | null;
  isFullTank: boolean; // Default: true
  
  createdAt: string;
  updatedAt: string;
}
```

---

## 5. Information Architecture & Screen Breakdown

### 5.1 Mobile Navigation (Bottom Tabs)
1. **Dashboard / Vehicles:** List of active vehicles. Floating Action Button (FAB) to "Add Fuel Log" or "Add Vehicle".
2. **Logs:** Chronological list of recent fuel logs across all active vehicles.
3. **Settings:** Theme selection, unit defaults, and app configuration.

### 5.2 Key Screens
- **Vehicle List Screen:** Cards showing Profile Name (or fallback), Model, Plate, and Active status. Tap to edit or view logs.
- **Vehicle Create/Edit Screen:** Form with sections for Basic Info, Units, Fuel System (with conditional dual-fuel rendering), and Optional Details.
- **Add/Edit Fuel Log Screen:** Streamlined form. Pre-fills the selected vehicle and current date. Uses numeric keyboards for odometer and fuel amount.
- **Settings Screen:** Segmented controls or radio groups for Theme (Light/Dark/Secret Black) and default units.

---

## 6. UX Rules & Edge Cases

### 6.1 UX Rules
- **Mobile First:** One-handed operation. Primary actions (Save, Add Log) must be reachable with the thumb (e.g., fixed bottom buttons or FAB).
- **Sensible Defaults:** Date defaults to "now". Fuel system defaults to "primary". Full tank defaults to "true".
- **Keyboard Optimization:** Use `keyboardType="numeric"` for odometer, fuel amount, and cost fields.
- **Clear States:** Empty states (e.g., no vehicles, no logs) must have helpful illustrations and a clear Call-to-Action (CTA).

### 6.2 Edge Cases
- **Missing Profile Name:** Handled by the fallback rule (`{model}_{plateNumber}`). If both are missing, use `Unnamed Vehicle`.
- **Switching Units:** If a user changes their preferred consumption unit *after* logging fuel, historical logs should ideally display in the unit they were recorded in, or the app should clearly state "Converted to [New Unit]". (MVP approach: Store `fuelUnit` snapshot in the `FuelLog` to prevent historical data distortion).
- **Dual Fuel Disabled:** If a user toggles `isDualFuel` off after having secondary data, the system should warn them that secondary capacity data will be cleared, or safely retain it in the DB but hide it from the UI.
- **Inactive Vehicles:** An inactive vehicle cannot be selected as the default target for a new fuel log from the dashboard, but can be manually selected from a "Show Inactive" filter in the vehicle picker.

---

## 7. Unit Conversion Strategy
Because users can mix units (e.g., Miles for distance, Liters for fuel), a dedicated `/lib/units.ts` utility will handle all conversions. 
- **Rule:** The UI will display values in the user's selected units. 
- **Calculation:** When calculating fuel consumption, the app will normalize the data to a base metric standard (e.g., Liters and Kilometers) internally, perform the math, and then convert the final result to the user's preferred display consumption unit.

---

### 8. MVP Scope vs. Future Expansion

### Included in MVP
- Vehicle profile creation and editing (with all rules above)
- Active/inactive vehicle toggle
- Preferred unit selection (mixed metric/imperial supported)
- Fuel type dropdown and Dual Fuel support
- Basic fuel log recording and list view
- Settings page with Light, Dark, and Secret Black mode
- Local-first data persistence (`expo-sqlite`)
- **Automatic fuel logging via notifications** — parse banking app payment notifications (e.g., "Fuel purchase at Shell $58.20") to auto-create draft fuel logs with amount, timestamp, station (if parseable). Includes optional toggle in Settings to enable/disable.
- **OCR receipt scanning** — integrate OCR library to extract fuel/service receipts via camera/gallery picker. Supports extracting cost, date, station name, fuel type. Results displayed as "Scanned" badge on log card.
- **Fuel Log source tracking** — `source` field tracks origin: `'manual' | 'notification' | 'ocr'`. Notification logs include `parsedFromNotification: boolean` flag; OCR logs include `receiptImageUrl: string|null` for photo storage.

### Future Expansion (Out of Scope for MVP)
- Maintenance and service reminder tracking
- Cloud sync and cross-device backup
- Multi-user household sharing
- Advanced analytics and consumption charts
- Push notifications for low fuel or insurance expiry