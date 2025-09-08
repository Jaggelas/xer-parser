export type ValidationSeverity = 'error' | 'warn';

export interface ValidationIssue {
  severity: ValidationSeverity;
  code: string; // machine-readable code, e.g., TASK_MISSING_COLUMN
  message: string; // human-friendly message
  table?: string; // table where the issue was detected
  rowIndex?: number; // optional row index within the table (0-based)
  id?: string | number; // primary identifier if applicable
  refTable?: string; // referenced table (for FK-like checks)
  refId?: string | number; // referenced id (for FK-like checks)
}

export interface ValidateOptions {
  autoRefresh?: boolean; // when true, call refreshEntities() before validation
}
