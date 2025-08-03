'use client';

import { ConcreteCalculator } from "@/components/ui/concrete-calculator";
import { Calculator } from "lucide-react";

export function CalculatorSection() {
    return (
        <section id="calculator" className="min-h-screen pt-24">
            {/* Calculator Header */}
            <div className="bg-gray-50 dark:bg-gray-800 py-16 transform -translate-y-1 relative z-10">
                <div className="container mx-auto px-4">
                    <div className="text-center">
                        <h1 className="text-5xl font-bold mb-4">Concrete Calculator</h1>
                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            Estimate the amount of concrete needed for your project
                        </p>
                    </div>
                </div>
            </div>

            {/* Calculator Section */}
            <div className="py-16 bg-white dark:bg-gray-900">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto mb-12">
                        <div className="flex items-center gap-3 mb-6">
                            <Calculator className="h-8 w-8 text-orange-500" />
                            <h2 className="text-3xl font-bold">Concrete Volume Calculator</h2>
                        </div>

                        <p className="text-gray-600 dark:text-gray-400 mb-8">
                            Use our concrete calculator to estimate the volume of concrete needed for your project.
                            Simply select the shape, enter the dimensions, and get an instant calculation of the
                            required concrete volume and approximate number of bags needed.
                        </p>

                        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-8">
                            <h3 className="text-xl font-semibold mb-4">How to Use the Calculator</h3>
                            <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
                                <li>Select your preferred unit system (Metric or Imperial)</li>
                                <li>Choose the shape that best matches your project</li>
                                <li>Enter the dimensions of your concrete area</li>
                                <li>Click "Calculate" to get your results</li>
                            </ol>
                        </div>
                    </div>

                    {/* Calculator Component */}
                    <ConcreteCalculator />

                    {/* Additional Information */}
                    <div className="max-w-4xl mx-auto mt-16">
                        <h3 className="text-2xl font-bold mb-4">Tips for Accurate Measurements</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                            <div className="space-y-4">
                                <h4 className="text-lg font-semibold">Measuring Your Area</h4>
                                <p className="text-gray-600 dark:text-gray-400">
                                    For the most accurate results, measure your project area carefully.
                                    Take multiple measurements and use the average if the area is irregular.
                                </p>

                                <h4 className="text-lg font-semibold">Accounting for Waste</h4>
                                <p className="text-gray-600 dark:text-gray-400">
                                    It's recommended to add 5-10% extra concrete to your calculated amount
                                    to account for spillage, uneven ground, and other variables.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <h4 className="text-lg font-semibold">Concrete Mix Types</h4>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Different projects require different concrete mixes. For driveways and
                                    patios, a 3000-4000 PSI mix is typically recommended. For foundations,
                                    a higher strength mix may be required.
                                </p>

                                <h4 className="text-lg font-semibold">Professional Assistance</h4>
                                <p className="text-gray-600 dark:text-gray-400">
                                    While this calculator provides a good estimate, our team can help you
                                    determine the exact amount needed for your specific project. Contact us
                                    for a free consultation.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
