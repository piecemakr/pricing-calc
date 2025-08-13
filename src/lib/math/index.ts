// Export all types
export type { Inputs, Outputs, Variables, Extras } from './types';
export type { Result } from './calc';

// Export calculator functions
export {
  default as calc,
  calculateWithValidation,
  validateInputs,
  calculateVariableAdjustments,
} from './calc';

// Export React hooks
export {
  useCalculator,
  useCalculatedValues,
  useVariableBreakdown,
} from './hooks';
