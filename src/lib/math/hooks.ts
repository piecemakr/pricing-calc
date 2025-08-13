import { useMemo } from 'react';
import { Inputs, Variables, Extras } from './index';
import calc from './calc';

// Real-time calculation hook that automatically recalculates when inputs change
export function useCalculator(
  inputs: Inputs,
  variables: Variables,
  extras: Extras,
) {
  return useMemo(() => {
    try {
      const result = calc(inputs, variables, extras);
      return {
        result,
        error: null,
        isValid: true,
      };
    } catch (error) {
      return {
        result: null,
        error: error instanceof Error ? error.message : 'Calculation error',
        isValid: false,
      };
    }
  }, [inputs, variables, extras]);
}

// Hook to get specific calculated values for display
export function useCalculatedValues(
  inputs: Inputs,
  variables: Variables,
  extras: Extras,
) {
  const { result, error, isValid } = useCalculator(inputs, variables, extras);

  if (!result) {
    return { error, isValid };
  }

  return {
    // Direct access to commonly used values
    workableHours: result.outputs.workableHours,
    worthPerHour: result.outputs.worthPerHour,
    baseLaborCost: result.outputs.baseLaborCost,
    variableBasedCost: result.outputs.variableAdjustments,
    totalProjectCost: result.outputs.projectCost,
    pricePerAsset: result.outputs.pricePerAsset,

    // Formatted versions
    formatted: result.outputs.formatted,

    // Individual variable costs
    variables: result.outputs.individualVariables,

    // Comparisons and metrics
    comparisons: result.outputs.comparisons,

    // Breakdown strings for display
    breakdown: result.outputs.breakdown,

    // Full result object
    fullResult: result,
    error: null,
    isValid: true,
  };
}

// Hook for specific UI components
export function useVariableBreakdown(inputs: Inputs, variables: Variables) {
  return useMemo(() => {
    const baseLaborCost =
      (inputs.annualIncomeGoal / (inputs.hoursPerWeek * inputs.weeksPerYear)) *
      inputs.hoursForProject;

    return [
      {
        name: 'Client PPS',
        percentage: variables.clientPps * 100,
        amount: baseLaborCost * variables.clientPps,
        color: 'blue',
      },
      {
        name: 'Client Sales',
        percentage: variables.clientSales * 100,
        amount: baseLaborCost * variables.clientSales,
        color: 'green',
      },
      {
        name: 'Client License',
        percentage: variables.clientLicense * 100,
        amount: baseLaborCost * variables.clientLicense,
        color: 'purple',
      },
      {
        name: 'Delivery Speed',
        percentage: variables.deliverySpeed * 100,
        amount: baseLaborCost * variables.deliverySpeed,
        color: 'orange',
      },
      {
        name: 'Delivery Risk',
        percentage: variables.deliveryRisk * 100,
        amount: baseLaborCost * variables.deliveryRisk,
        color: 'red',
      },
      {
        name: 'Delivery Quality',
        percentage: variables.deliveryQuality * 100,
        amount: baseLaborCost * variables.deliveryQuality,
        color: 'yellow',
      },
    ];
  }, [inputs, variables]);
}
