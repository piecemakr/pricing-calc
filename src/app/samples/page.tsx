'use client';

import { useState } from 'react';
import {
  Inputs,
  Outputs,
  Variables,
  Extras,
  calculateWithValidation,
} from '../../lib/math';

export default function Home() {
  const [result, setResult] = useState<{
    inputs: Inputs;
    outputs: Outputs;
    variables: Variables;
    extras: Extras;
  } | null>(null);
  const [error, setError] = useState<string>('');

  const [formData, setFormData] = useState<Inputs>({
    hoursPerWeek: 40,
    weeksPerYear: 42,
    hourlyRate: 100,
    annualIncomeGoal: 200000,
    hoursForProject: 20,
    projectExpenses: 3500,
    numberOfAssets: 10,
    projectPrice: 0,
  });

  const [variables, setVariables] = useState<Variables>({
    clientPps: 0.2,
    clientSales: 0.2,
    clientLicense: 2.5,
    deliverySpeed: 0.35,
    deliveryRisk: 0.15,
    deliveryQuality: 0.1,
  });

  const [extras, setExtras] = useState<Extras>({
    numberOfPosts: 3,
    pricePerPost: 450,
  });

  const calculatePrice = () => {
    try {
      setError('');

      const calculationResult = calculateWithValidation(
        formData,
        variables,
        extras,
      );
      setResult(calculationResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setResult(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 text-gray-900">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Project Pricing Calculator
          </h1>
          <p className="text-lg text-gray-900">
            Calculate project pricing based on your income goals, work schedule,
            and project requirements
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Project Inputs
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Basic Work Schedule */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hours Per Week
              </label>
              <input
                type="number"
                value={formData.hoursPerWeek}
                onChange={e =>
                  setFormData({
                    ...formData,
                    hoursPerWeek: Number(e.target.value),
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                min="1"
                max="168"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Weeks Per Year
              </label>
              <input
                type="number"
                value={formData.weeksPerYear}
                onChange={e =>
                  setFormData({
                    ...formData,
                    weeksPerYear: Number(e.target.value),
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                min="1"
                max="52"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hourly Rate ($)
              </label>
              <input
                type="number"
                value={formData.hourlyRate}
                onChange={e =>
                  setFormData({
                    ...formData,
                    hourlyRate: Number(e.target.value),
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                step="0.01"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Annual Income Goal ($)
              </label>
              <input
                type="number"
                value={formData.annualIncomeGoal}
                onChange={e =>
                  setFormData({
                    ...formData,
                    annualIncomeGoal: Number(e.target.value),
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                step="1000"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hours for This Project
              </label>
              <input
                type="number"
                value={formData.hoursForProject}
                onChange={e =>
                  setFormData({
                    ...formData,
                    hoursForProject: Number(e.target.value),
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Expenses ($)
              </label>
              <input
                type="number"
                value={formData.projectExpenses}
                onChange={e =>
                  setFormData({
                    ...formData,
                    projectExpenses: Number(e.target.value),
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                step="100"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Assets
              </label>
              <input
                type="number"
                value={formData.numberOfAssets}
                onChange={e =>
                  setFormData({
                    ...formData,
                    numberOfAssets: Number(e.target.value),
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                min="1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Price ($)
              </label>
              <input
                type="number"
                value={formData.projectPrice}
                onChange={e =>
                  setFormData({
                    ...formData,
                    projectPrice: Number(e.target.value),
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                step="1000"
                min="0"
              />
            </div>
          </div>

          {/* Variables Section */}
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Client & Delivery Variables
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Client PPS
              </label>
              <input
                type="number"
                value={variables.clientPps}
                onChange={e =>
                  setVariables({
                    ...variables,
                    clientPps: Number(e.target.value),
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Client Sales
              </label>
              <input
                type="number"
                value={variables.clientSales}
                onChange={e =>
                  setVariables({
                    ...variables,
                    clientSales: Number(e.target.value),
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Client License
              </label>
              <input
                type="number"
                value={variables.clientLicense}
                onChange={e =>
                  setVariables({
                    ...variables,
                    clientLicense: Number(e.target.value),
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Delivery Speed
              </label>
              <input
                type="number"
                value={variables.deliverySpeed}
                onChange={e =>
                  setVariables({
                    ...variables,
                    deliverySpeed: Number(e.target.value),
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Delivery Risk
              </label>
              <input
                type="number"
                value={variables.deliveryRisk}
                onChange={e =>
                  setVariables({
                    ...variables,
                    deliveryRisk: Number(e.target.value),
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Delivery Quality
              </label>
              <input
                type="number"
                value={variables.deliveryQuality}
                onChange={e =>
                  setVariables({
                    ...variables,
                    deliveryQuality: Number(e.target.value),
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                min="0"
              />
            </div>
          </div>

          {/* Extras Section */}
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Additional Services
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Posts
              </label>
              <input
                type="number"
                value={extras.numberOfPosts}
                onChange={e =>
                  setExtras({
                    ...extras,
                    numberOfPosts: Number(e.target.value),
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Per Post ($)
              </label>
              <input
                type="number"
                value={extras.pricePerPost}
                onChange={e =>
                  setExtras({ ...extras, pricePerPost: Number(e.target.value) })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                step="0.01"
                min="0"
              />
            </div>
          </div>

          <button
            onClick={calculatePrice}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
          >
            Calculate Project Pricing
          </button>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}
        </div>

        {result && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Calculation Results
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-blue-800 mb-1">
                  Workable Hours
                </h3>
                <p className="text-2xl font-bold text-blue-900">
                  {result.outputs.workableHours.toLocaleString()}
                </p>
                <p className="text-xs text-blue-600 mt-1">hours/year</p>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-green-800 mb-1">
                  Worth Per Hour
                </h3>
                <p className="text-2xl font-bold text-green-900">
                  ${result.outputs.worthPerHour.toFixed(2)}
                </p>
                <p className="text-xs text-green-600 mt-1">required rate</p>
              </div>

              <div className="bg-orange-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-orange-800 mb-1">
                  Base Labor Cost
                </h3>
                <p className="text-2xl font-bold text-orange-900">
                  ${result.outputs.baseLaborCost.toLocaleString()}
                </p>
                <p className="text-xs text-orange-600 mt-1">
                  before adjustments
                </p>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-yellow-800 mb-1">
                  Variable-Based Labor
                </h3>
                <p className="text-2xl font-bold text-yellow-900">
                  ${result.outputs.variableAdjustments.toLocaleString()}
                </p>
                <p className="text-xs text-yellow-600 mt-1">
                  replaces base cost
                </p>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-purple-800 mb-1">
                  Total Project Cost
                </h3>
                <p className="text-2xl font-bold text-purple-900">
                  ${result.outputs.projectCost.toLocaleString()}
                </p>
                <p className="text-xs text-purple-600 mt-1">with expenses</p>
              </div>

              <div className="bg-indigo-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-indigo-800 mb-1">
                  Price Per Asset
                </h3>
                <p className="text-2xl font-bold text-indigo-900">
                  ${result.outputs.pricePerAsset.toLocaleString()}
                </p>
                <p className="text-xs text-indigo-600 mt-1">per asset</p>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Calculation Breakdown
              </h3>

              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">
                    Hours Per Week × Weeks Per Year
                  </span>
                  <span className="font-medium">
                    {formData.hoursPerWeek} × {formData.weeksPerYear} ={' '}
                    {result.outputs.workableHours.toLocaleString()} hours
                  </span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">
                    Annual Income Goal ÷ Workable Hours
                  </span>
                  <span className="font-medium">
                    ${formData.annualIncomeGoal.toLocaleString()} ÷{' '}
                    {result.outputs.workableHours.toLocaleString()} = $
                    {result.outputs.worthPerHour.toFixed(2)}/hour
                  </span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">
                    Worth Per Hour × Project Hours
                  </span>
                  <span className="font-medium">
                    ${result.outputs.worthPerHour.toFixed(2)} ×{' '}
                    {formData.hoursForProject} = $
                    {result.outputs.baseLaborCost.toLocaleString()}
                  </span>
                </div>

                {/* Variable-Based Labor Breakdown */}
                <div className="bg-yellow-25 p-3 rounded-lg border border-yellow-200">
                  <h4 className="text-sm font-semibold text-yellow-800 mb-2">
                    Variable-Based Labor Cost (Replaces Base Labor)
                  </h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-yellow-700">
                        Client PPS ({(variables.clientPps * 100).toFixed(1)}%)
                      </span>
                      <span className="font-medium">
                        $
                        {(
                          result.outputs.baseLaborCost * variables.clientPps
                        ).toFixed(0)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-yellow-700">
                        Client Sales ({(variables.clientSales * 100).toFixed(1)}
                        %)
                      </span>
                      <span className="font-medium">
                        $
                        {(
                          result.outputs.baseLaborCost * variables.clientSales
                        ).toFixed(0)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-yellow-700">
                        Client License (
                        {(variables.clientLicense * 100).toFixed(1)}%)
                      </span>
                      <span className="font-medium">
                        $
                        {(
                          result.outputs.baseLaborCost * variables.clientLicense
                        ).toFixed(0)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-yellow-700">
                        Delivery Speed (
                        {(variables.deliverySpeed * 100).toFixed(1)}%)
                      </span>
                      <span className="font-medium">
                        $
                        {(
                          result.outputs.baseLaborCost * variables.deliverySpeed
                        ).toFixed(0)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-yellow-700">
                        Delivery Risk (
                        {(variables.deliveryRisk * 100).toFixed(1)}%)
                      </span>
                      <span className="font-medium">
                        $
                        {(
                          result.outputs.baseLaborCost * variables.deliveryRisk
                        ).toFixed(0)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-yellow-700">
                        Delivery Quality (
                        {(variables.deliveryQuality * 100).toFixed(1)}%)
                      </span>
                      <span className="font-medium">
                        $
                        {(
                          result.outputs.baseLaborCost *
                          variables.deliveryQuality
                        ).toFixed(0)}
                      </span>
                    </div>
                    <div className="flex justify-between border-t border-yellow-300 pt-1 font-semibold">
                      <span className="text-yellow-800">
                        New Labor Cost Total
                      </span>
                      <span>
                        ${result.outputs.variableAdjustments.toFixed(0)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-gray-100 bg-blue-50 px-3 rounded">
                  <span className="text-gray-600">
                    <strong>Variable-Based Labor Cost (Replaces Base)</strong>
                  </span>
                  <span className="font-medium">
                    ${result.outputs.variableAdjustments.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">
                    Variable Labor Cost + Project Expenses
                  </span>
                  <span className="font-medium">
                    ${result.outputs.totalLaborCost.toLocaleString()} + $
                    {formData.projectExpenses.toLocaleString()} = $
                    {result.outputs.projectCost.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">
                    Project Cost ÷ Number of Assets
                  </span>
                  <span className="font-medium">
                    ${result.outputs.projectCost.toLocaleString()} ÷{' '}
                    {formData.numberOfAssets} = $
                    {result.outputs.pricePerAsset.toLocaleString()}/asset
                  </span>
                </div>

                <div className="flex justify-between items-center py-3 bg-gray-50 px-4 rounded-lg font-bold text-lg">
                  <span>Recommended Project Price</span>
                  <span className="text-purple-600">
                    ${result.outputs.projectCost.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Additional Summary */}
            <div className="mt-8 p-6 bg-gray-50 rounded-lg">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">
                Summary
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">
                    <strong>Current Hourly Rate:</strong> ${formData.hourlyRate}
                  </p>
                  <p className="text-gray-600">
                    <strong>Required Rate for Goal:</strong> $
                    {result.outputs.worthPerHour.toFixed(2)}
                  </p>
                  <p className="text-gray-600">
                    <strong>Rate Difference:</strong>
                    <span
                      className={
                        result.outputs.worthPerHour > formData.hourlyRate
                          ? 'text-red-600'
                          : 'text-green-600'
                      }
                    >
                      {result.outputs.worthPerHour > formData.hourlyRate
                        ? '+'
                        : ''}
                      $
                      {(
                        result.outputs.worthPerHour - formData.hourlyRate
                      ).toFixed(2)}
                    </span>
                  </p>
                  <p className="text-gray-600">
                    <strong>Variable vs Base Labor:</strong>
                    <span
                      className={
                        result.outputs.variableAdjustments >
                        result.outputs.baseLaborCost
                          ? 'text-green-600'
                          : 'text-red-600'
                      }
                    >
                      {result.outputs.variableAdjustments >
                      result.outputs.baseLaborCost
                        ? '+'
                        : ''}
                      {(
                        ((result.outputs.variableAdjustments -
                          result.outputs.baseLaborCost) /
                          result.outputs.baseLaborCost) *
                        100
                      ).toFixed(1)}
                      %
                    </span>
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">
                    <strong>Total Posts Revenue:</strong> $
                    {(
                      extras.numberOfPosts * extras.pricePerPost
                    ).toLocaleString()}
                  </p>
                  <p className="text-gray-600">
                    <strong>Project vs Set Price:</strong>
                    <span
                      className={
                        result.outputs.projectCost > formData.projectPrice
                          ? 'text-red-600'
                          : 'text-green-600'
                      }
                    >
                      {formData.projectPrice > 0
                        ? `${(result.outputs.projectCost - formData.projectPrice).toLocaleString()}`
                        : 'No comparison set'}
                    </span>
                  </p>
                  <p className="text-gray-600">
                    <strong>Variable-Based Hourly Rate:</strong>
                    <span className="text-purple-600">
                      $
                      {(
                        result.outputs.totalLaborCost / formData.hoursForProject
                      ).toFixed(2)}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-12 bg-gray-100 rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Calculator Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">✓</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">
                  Income Goal Planning
                </h3>
                <p className="text-sm text-gray-600">
                  Calculate required hourly rate based on your annual income
                  goals
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">✓</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">
                  Project Cost Analysis
                </h3>
                <p className="text-sm text-gray-600">
                  Factor in project hours, expenses, and asset deliverables
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">✓</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">
                  Work Schedule Planning
                </h3>
                <p className="text-sm text-gray-600">
                  Customize hours per week and working weeks per year
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">✓</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Client Variables</h3>
                <p className="text-sm text-gray-600">
                  Track client-specific factors like PPS, sales, and licensing
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">✓</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Input Validation</h3>
                <p className="text-sm text-gray-600">
                  Comprehensive validation with detailed error messages
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">✓</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">
                  TypeScript Support
                </h3>
                <p className="text-sm text-gray-600">
                  Full type safety with comprehensive type definitions
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
