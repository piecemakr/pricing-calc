import { Inputs, Outputs, Variables, Extras } from './types';

export type Result = {
  inputs: Inputs;
  outputs: Outputs;
  variables: Variables;
  extras: Extras;
};

export default function calc(
  inputs: Inputs,
  variables: Variables,
  extras: Extras,
): Result {
  // Get base calculations
  const baseResult = calculateBasic(inputs, variables);

  // Calculate individual variable amounts
  const individualVariables = {
    clientPps: {
      percentage: variables.clientPps * 100,
      amount: baseResult.baseLaborCost * variables.clientPps,
    },
    clientSales: {
      percentage: variables.clientSales * 100,
      amount: baseResult.baseLaborCost * variables.clientSales,
    },
    clientLicense: {
      percentage: variables.clientLicense * 100,
      amount: baseResult.baseLaborCost * variables.clientLicense,
    },
    deliverySpeed: {
      percentage: variables.deliverySpeed * 100,
      amount: baseResult.baseLaborCost * variables.deliverySpeed,
    },
    deliveryRisk: {
      percentage: variables.deliveryRisk * 100,
      amount: baseResult.baseLaborCost * variables.deliveryRisk,
    },
    deliveryQuality: {
      percentage: variables.deliveryQuality * 100,
      amount: baseResult.baseLaborCost * variables.deliveryQuality,
    },
  };

  // Calculate comparison metrics
  const postsRevenue = extras.numberOfPosts * extras.pricePerPost;
  const variableVsBasePercentage =
    ((baseResult.variableAdjustments - baseResult.baseLaborCost) /
      baseResult.baseLaborCost) *
    100;
  const effectiveHourlyRate =
    baseResult.totalLaborCost / inputs.hoursForProject;
  const targetVsCurrentRateDiff = baseResult.worthPerHour - inputs.hourlyRate;
  const projectVsSetPriceDiff =
    inputs.projectPrice > 0 ? baseResult.projectCost - inputs.projectPrice : 0;

  // Create breakdown strings
  const breakdown = {
    workCalculation: `${inputs.hoursPerWeek} × ${inputs.weeksPerYear} = ${baseResult.workableHours.toLocaleString()} hours`,
    rateCalculation: `$${inputs.annualIncomeGoal.toLocaleString()} ÷ ${baseResult.workableHours.toLocaleString()} = $${baseResult.worthPerHour.toFixed(2)}/hour`,
    baseLaborCalculation: `$${baseResult.worthPerHour.toFixed(2)} × ${inputs.hoursForProject} = $${baseResult.baseLaborCost.toLocaleString()}`,
    totalLaborCalculation: `$${baseResult.variableAdjustments.toLocaleString()} (replaces base)`,
    finalProjectCalculation: `$${baseResult.totalLaborCost.toLocaleString()} + $${inputs.projectExpenses.toLocaleString()} = $${baseResult.projectCost.toLocaleString()}`,
    perAssetCalculation: `$${baseResult.projectCost.toLocaleString()} ÷ ${inputs.numberOfAssets} = $${baseResult.pricePerAsset.toLocaleString()}/asset`,
  };

  // Create formatted strings
  const formatted = {
    workableHours: baseResult.workableHours.toLocaleString(),
    worthPerHour: `$${baseResult.worthPerHour.toFixed(2)}`,
    baseLaborCost: `$${baseResult.baseLaborCost.toLocaleString()}`,
    variableAdjustments: `$${baseResult.variableAdjustments.toLocaleString()}`,
    totalLaborCost: `$${baseResult.totalLaborCost.toLocaleString()}`,
    projectCost: `$${baseResult.projectCost.toLocaleString()}`,
    pricePerAsset: `$${baseResult.pricePerAsset.toLocaleString()}`,
    postsRevenue: `$${postsRevenue.toLocaleString()}`,
  };

  // Create full outputs
  const outputs: Outputs = {
    ...baseResult,
    individualVariables,
    comparisons: {
      variableVsBasePercentage,
      effectiveHourlyRate,
      targetVsCurrentRateDiff,
      postsRevenue,
      projectVsSetPriceDiff,
    },
    breakdown,
    formatted,
  };

  return {
    inputs,
    outputs,
    variables,
    extras,
  };
}

// Internal function for basic calculations
function calculateBasic(inputs: Inputs, variables: Variables) {
  // Calculate basic work metrics
  const workableHours = inputs.hoursPerWeek * inputs.weeksPerYear;
  const worthPerHour = inputs.annualIncomeGoal / workableHours;
  const baseLaborCost = worthPerHour * inputs.hoursForProject;

  // Calculate variable adjustments (each variable is calculated independently and summed)
  // These adjustments REPLACE the base labor cost, not add to it
  const variableAdjustments = calculateVariableAdjustments(
    baseLaborCost,
    variables,
  );

  // Calculate total costs - variable adjustments become the new labor cost
  const totalLaborCost = variableAdjustments; // Variables replace base cost entirely
  const projectCost = totalLaborCost + inputs.projectExpenses;
  const pricePerAsset = projectCost / inputs.numberOfAssets;

  return {
    workableHours,
    worthPerHour,
    baseLaborCost,
    variableAdjustments,
    totalLaborCost,
    projectCost,
    projectFloorPrice: projectCost, // For compatibility
    pricePerAsset,
  };
}

// Calculate variable adjustments - each variable is applied independently and summed
export function calculateVariableAdjustments(
  baseLaborCost: number,
  variables: Variables,
): number {
  // Each variable is calculated as a percentage/multiplier of the base labor cost
  // These are additive, not compounded
  const clientPpsAdjustment = baseLaborCost * variables.clientPps;
  const clientSalesAdjustment = baseLaborCost * variables.clientSales;
  const clientLicenseAdjustment = baseLaborCost * variables.clientLicense;
  const deliverySpeedAdjustment = baseLaborCost * variables.deliverySpeed;
  const deliveryRiskAdjustment = baseLaborCost * variables.deliveryRisk;
  const deliveryQualityAdjustment = baseLaborCost * variables.deliveryQuality;

  return (
    clientPpsAdjustment +
    clientSalesAdjustment +
    clientLicenseAdjustment +
    deliverySpeedAdjustment +
    deliveryRiskAdjustment +
    deliveryQualityAdjustment
  );
}

// Export individual calculation functions for better modularity
export function calculateWorkableHours(
  hoursPerWeek: number,
  weeksPerYear: number,
): number {
  return hoursPerWeek * weeksPerYear;
}

export function calculateWorthPerHour(
  annualIncomeGoal: number,
  workableHours: number,
): number {
  if (workableHours === 0) {
    throw new Error('Workable hours cannot be zero');
  }
  return annualIncomeGoal / workableHours;
}

export function calculateProjectCost(
  worthPerHour: number,
  hoursForProject: number,
): number {
  return worthPerHour * hoursForProject;
}

export function calculateProjectFloorPrice(
  projectCost: number,
  projectExpenses: number,
): number {
  return projectCost + projectExpenses;
}

export function calculatePricePerAsset(
  projectFloorPrice: number,
  numberOfAssets: number,
): number {
  if (numberOfAssets === 0) {
    throw new Error('Number of assets cannot be zero');
  }
  return projectFloorPrice / numberOfAssets;
}

// Utility function to validate inputs
export function validateInputs(inputs: Inputs): void {
  if (inputs.hoursPerWeek <= 0) {
    throw new Error('Hours per week must be greater than 0');
  }
  if (inputs.weeksPerYear <= 0) {
    throw new Error('Weeks per year must be greater than 0');
  }
  if (inputs.annualIncomeGoal <= 0) {
    throw new Error('Annual income goal must be greater than 0');
  }
  if (inputs.hoursForProject < 0) {
    throw new Error('Hours for project cannot be negative');
  }
  if (inputs.projectExpenses < 0) {
    throw new Error('Project expenses cannot be negative');
  }
  if (inputs.numberOfAssets <= 0) {
    throw new Error('Number of assets must be greater than 0');
  }
}

// Calculator function with validation
export function calculateWithValidation(
  inputs: Inputs,
  variables: Variables,
  extras: Extras,
): Result {
  validateInputs(inputs);
  return calc(inputs, variables, extras);
}
