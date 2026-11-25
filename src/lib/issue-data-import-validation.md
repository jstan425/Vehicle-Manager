# Issue: Data Import Validation - Potential Database Corruption

## 🔍 Description
When importing JSON data, invalid or malformed files could corrupt the SQLite database structure, causing data loss or app crashes.

---

## 🐛 Steps to Reproduce
1. Create a vehicle with fuel logs in the app
2. Export data as `backup.json`
3. **Corrupt the file** by editing it manually (e.g., change quotes to single quotes, remove commas)
4. Attempt to import the corrupted file via Settings → Import
5. Result: App crashes OR database becomes unreadable

---

## 💡 Root Cause Analysis
- No schema validation before importing data
- SQLite doesn't have built-in foreign key constraints by default (can be disabled)
- Missing type checking for imported JSON structure
- No transaction rollback mechanism if import fails partway through

---

## 🔧 Suggested Fixes (Future Work)

### 1. Pre-Import Validation Layer
```typescript
// Create /lib/data-import.ts
import { z } from 'zod';

const FuelLogSchema = z.object({
  id: z.string(),
  vehicleId: z.string(),
  loggedAt: z.string().datetime(),
  fuelAmount: z.number().positive(),
  // ... other fields
});

export async function validateImportFile(fileContent: string): Promise<{
  isValid: boolean;
  errors: string[];
}> {
  try {
    const data = JSON.parse(fileContent);
    
    // Validate structure matches expected schema
    const validated = FuelLogSchema.array().safeParse(data);
    
    if (!validated.success) {
      return { isValid: false, errors: validated.error.errors.map(e => e.message) };
    }
    
    return { isValid: true, errors: [] };
  } catch (error) {
    return { isValid: false, errors: ['Invalid JSON format'] };
  }
}
```

### 2. Transaction-Based Import with Rollback
```typescript
// In database layer
async function importFuelLogs(logs: FuelLog[]) {
  const db = await Database.getInstance();
  
  try {
    // Begin transaction
    await db.exec('BEGIN TRANSACTION');
    
    for (const log of logs) {
      await db.run(
        'INSERT INTO fuel_logs VALUES (?, ?, ?, ?, ...)',
        [log.id, log.vehicleId, log.loggedAt, ...]
      );
    }
    
    // Commit on success
    await db.exec('COMMIT');
  } catch (error) {
    // Rollback on failure
    await db.exec('ROLLBACK');
    throw error;
  }
}
```

### 3. User Feedback UI
- Show validation errors before allowing import
- Provide "Preview Import" feature showing how many records will be added
- Offer to backup current data before importing new data

---

## 📊 Impact Assessment
| Severity | Priority | Effort |
|----------|----------|--------|
| High (Data Loss Risk) | Critical | Medium |

---

## ⏰ Timeline
**When to fix:** Before first user imports any data. Implement validation layer immediately with the export/import feature.
