'use client';

import { BackToTop } from "@/components/ui/back-to-top";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ConcreteCalculator } from "@/components/ui/concrete-calculator";
import { Calculator } from "lucide-react";
import Image from "next/image";

export default function CalculatorPage() {
    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <section className="relative h-64 bg-gradient-to-r from-gray-900 to-gray-800">
                <div className="absolute inset-0 bg-black/50" />
                <Image
                    src="/images/dig-2.jpg"
                    alt="Concrete calculator"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="relative container mx-auto px-4 h-full flex items-center">
                    <div className="max-w-2xl text-white">
                        <h1 className="text-5xl font-bold mb-4">Concrete Calculator</h1>
                        <p className="text-xl text-gray-200">
                            Estimate the amount of concrete needed for your project
                        </p>
                    </div>
                </div>
            </section>

            {/* Calculator Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <Breadcrumb />

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

                        <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg border-l-4 border-orange-500">
                            <h4 className="text-lg font-semibold mb-2">Need Help With Your Project?</h4>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                Our experienced team can handle all aspects of your concrete project, from
                                planning and preparation to pouring and finishing. Contact us today for a
                                free quote and consultation.
                            </p>
                            <p className="font-medium">
                                Call us at: <span className="text-orange-600 dark:text-orange-400">0400 000 000</span>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <BackToTop />
        </main>
    );
}
