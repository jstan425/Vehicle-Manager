/**
 * Data Import Validation Layer
 * 
 * Validates JSON import files against Zod schemas before loading into SQLite.
 * Returns structured validation results with error messages for user feedback.
 * Optional logging of failed imports to src/logs/import-errors.log for audit.
 */

import { z } from 'zod';
import { vehicleSchema, fuelLogSchema } from './schemas.js';

/**
 * Validate a JSON file content against the expected schema.
 * 
 * @param content - Raw string content of the JSON file to import.
 * @returns Object with isValid flag and array of error messages (empty if valid).
 */
export async function validateImportFile(content: string): Promise<{
  isValid: boolean;
  errors: string[];
}> {
  let parsed: unknown;

  try {
    parsed = JSON.parse(content);
  } catch {
    return {
      isValid: false,
      errors: ['Invalid JSON format'],
    };
  }

  if (!Array.isArray(parsed)) {
    return {
      isValid: false,
      errors: ['Import file must be a JSON array of records'],
    };
  }

  const vehicleErrors: string[] = [];
  const fuelLogErrors: string[] = [];

  for (let i = 0; i < parsed.length; i++) {
    const record = parsed[i];

    // Validate vehicle schema
    const vehicleResult = vehicleSchema.safeParse(record);
    if (!vehicleResult.success) {
      for (const err of vehicleResult.error.errors) {
        vehicleErrors.push(`${i + 1}. ${err.message}`);
      }
    }

    // Validate fuel log schema
    const fuelLogResult = fuelLogSchema.safeParse(record);
    if (!fuelLogResult.success) {
      for (const err of fuelLogResult.error.errors) {
        fuelLogErrors.push(`${i + 1}. ${err.message}`);
      }
    }
  }

  // Combine errors and decide overall validity
  const allErrors = [...vehicleErrors, ...fuelLogErrors];
  if (allErrors.length > 0) {
    return { isValid: false, errors: allErrors };
  }

  return { isValid: true, errors: [] };
}

/**
 * Log import validation failures to a file for audit purposes.
 * Only called when validation fails; success is logged elsewhere.
 */
function logImportFailure(errors: string[]): void {
  const timestamp = new Date().toISOString();
  const lines = errors.map((e) => `[${timestamp}] ${e}`).join('\n');

  // Ensure the logs directory exists (create if missing)
  try {
    import('fs').then(async (fs) => {
      await fs.mkdir('src/logs', { recursive: true });
      const logPath = 'src/logs/import-errors.log';
      const existing = await fs.readFile(logPath, 'utf8');
      await fs.appendFile(logPath, '\n' + lines);
    });
  } catch {
    // Silently ignore write errors — the app may not have permission.
  }
}

// Re-export validation result type for external use
export type ValidationResult = Awaited<ReturnType<typeof validateImportFile>>;