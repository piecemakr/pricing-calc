export type Inputs = {
  hoursPerWeek: number;
  weeksPerYear: number;
  hourlyRate: number;
  annualIncomeGoal: number;
  hoursForProject: number;
  projectExpenses: number;
  numberOfAssets: number;
  projectPrice: number;
};

export type Outputs = {
  // Core calculations
  workableHours: number; // hoursPerWeek * weeksPerYear
  worthPerHour: number; // annualIncomeGoal / workableHours
  baseLaborCost: number; // worthPerHour * hoursForProject
  variableAdjustments: number; // sum of all variable calculations
  totalLaborCost: number; // variableAdjustments (replaces base)
  projectCost: number; // totalLaborCost + projectExpenses
  projectFloorPrice: number; // same as projectCost (for compatibility)
  pricePerAsset: number; // projectCost / numberOfAssets

  // Individual variable calculations
  individualVariables: {
    clientPps: { percentage: number; amount: number };
    clientSales: { percentage: number; amount: number };
    clientLicense: { percentage: number; amount: number };
    deliverySpeed: { percentage: number; amount: number };
    deliveryRisk: { percentage: number; amount: number };
    deliveryQuality: { percentage: number; amount: number };
  };

  // Comparison metrics
  comparisons: {
    variableVsBasePercentage: number; // How much variables differ from base
    effectiveHourlyRate: number; // Total labor / hours
    targetVsCurrentRateDiff: number; // Required vs current rate difference
    postsRevenue: number; // Total revenue from posts
    projectVsSetPriceDiff: number; // Difference from set price
  };

  // Breakdown for UI display
  breakdown: {
    workCalculation: string; // "40 × 42 = 1,680 hours"
    rateCalculation: string; // "$200,000 ÷ 1,680 = $119.05/hour"
    baseLaborCalculation: string; // "$119.05 × 20 = $2,381"
    totalLaborCalculation: string; // Sum of all variables
    finalProjectCalculation: string; // Labor + expenses
    perAssetCalculation: string; // Project ÷ assets
  };

  // Formatting helpers
  formatted: {
    workableHours: string; // "1,680"
    worthPerHour: string; // "$119.05"
    baseLaborCost: string; // "$2,381"
    variableAdjustments: string; // "$7,143"
    totalLaborCost: string; // "$7,143"
    projectCost: string; // "$10,643"
    pricePerAsset: string; // "$1,064"
    postsRevenue: string; // "$1,350"
  };
};

export type Variables = {
  clientPps: number;
  clientSales: number;
  clientLicense: number;
  deliverySpeed: number;
  deliveryRisk: number;
  deliveryQuality: number;
};

export type Extras = {
  numberOfPosts: number;
  pricePerPost: number;
};
