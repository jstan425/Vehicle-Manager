# Issue: Dual Fuel Conditional Rendering - UI State Bugs

## 🔍 Description
When toggling `isDualFuel` between true/false, the UI may not properly nullify secondary fuel fields or hide/show them correctly due to state synchronization issues.

---

## 🐛 Steps to Reproduce
1. Create a new vehicle with `isDualFuel = true`
2. Fill in both primary AND secondary fuel fields (e.g., Petrol + Electric)
3. Toggle `isDualFuel` to `false`
4. **Observe:** Secondary fields remain visible or retain old values
5. Toggle back to `true` → Secondary fields may be empty despite previous data
6. Save vehicle → Database may have inconsistent null/non-null values

---

## 💡 Root Cause Analysis
- Form state doesn't automatically reset when parent condition changes
- Conditional rendering (`{if isDualFuel}`) only affects visibility, not underlying state
- No centralized "reset secondary fields" logic when toggling off dual fuel mode
- Database write may occur before UI fully updates, causing race conditions

---

## 🔧 Suggested Fixes (Future Work)

### 1. Centralized Reset Utility
```typescript
// Create /lib/vehicle-utils.ts
import { z } from 'zod';

export const VehicleSchema = z.object({
  name: z.string(),
  model: z.string(),
  plateNumber: z.string().toUpperCase(),
  isDualFuel: z.boolean(),
  // ... other fields
});

/**
 * Resets secondary fuel fields when dual fuel mode is disabled.
 * Must be called BEFORE saving to database or resetting form state.
 */
export function resetSecondaryFields(vehicleData: any): {
  updatedVehicle: any;
  needsReset: boolean;
} {
  if (!vehicleData.isDualFuel) {
    return {
      updatedVehicle: {
        ...vehicleData,
        secondaryFuelUnit: null,
        secondaryTankCapacity: null,
        // Also reset form state
        _needsFormReset: true, // Flag for UI to clear inputs
      },
      needsReset: true,
    };
  }
  return { updatedVehicle: vehicleData, needsReset: false };
}
```

### 2. Form Hook with Conditional Reset
```typescript
// Create /hooks/useDualFuel.ts
import { useFormContext } from 'react-hook-form';

export function useDualFuelLogic(isDualFuel: boolean) {
  const form = useFormContext();
  
  useEffect(() => {
    if (!isDualFuel && form.formState.isDirty) {
      // Ask user before clearing secondary fields
      showConfirmation('Toggling off dual fuel will clear secondary fuel data. Continue?');
    }
  }, [isDualFuel]);
  
  const resetSecondary = () => {
    setValue('secondaryFuelUnit', null);
    setValue('secondaryTankCapacity', null);
  };
  
  return { resetSecondary };
}
```

### 3. UI Confirmation Dialog
- Show confirmation when toggling `isDualFuel` from true → false
- Explain that secondary fields will be cleared
- Prevent accidental data loss

---

## 📊 Impact Assessment
| Severity | Priority | Effort |
|----------|----------|--------|
| Medium (Data Loss Risk) | High | Low |

---

## ⏰ Timeline
**When to fix:** Before first user creates a dual-fuel vehicle. Implement the reset utility alongside the form schema.
