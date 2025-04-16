'use client';

import { BackToTop } from "@/components/ui/back-to-top";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ModelViewer } from "@/components/ui/model-viewer";
import { Box } from "lucide-react";
import Image from "next/image";

export default function ModelsPage() {
    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <section className="relative h-64 bg-gradient-to-r from-gray-900 to-gray-800">
                <div className="absolute inset-0 bg-black/50" />
                <Image
                    src="/images/house-2-2.jpg"
                    alt="3D Models"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="relative container mx-auto px-4 h-full flex items-center">
                    <div className="max-w-2xl text-white">
                        <h1 className="text-5xl font-bold mb-4">3D Concrete Models</h1>
                        <p className="text-xl text-gray-200">
                            Visualize your concrete project with our interactive 3D models
                        </p>
                    </div>
                </div>
            </section>

            {/* Models Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <Breadcrumb />

                    <div className="max-w-4xl mx-auto mb-12">
                        <div className="flex items-center gap-3 mb-6">
                            <Box className="h-8 w-8 text-orange-500" />
                            <h2 className="text-3xl font-bold">Interactive Models</h2>
                        </div>

                        <p className="text-gray-600 dark:text-gray-400 mb-8">
                            Explore our interactive 3D models to visualize your concrete project.
                            These models allow you to rotate, zoom, and examine different concrete
                            elements from all angles, helping you make informed decisions about your project.
                        </p>

                        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-8">
                            <h3 className="text-xl font-semibold mb-4">How to Use the Models</h3>
                            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                                <li>Click and drag to rotate the model</li>
                                <li>Scroll to zoom in and out</li>
                                <li>Right-click and drag to pan</li>
                                <li>Use the reset button to return to the default view</li>
                                <li>Click the fullscreen button for a larger view</li>
                            </ul>
                        </div>
                    </div>

                    {/* Models Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                        <div className="col-span-1 lg:col-span-2">
                            <ModelViewer
                                modelType="countertop"
                                title="Concrete Countertop"
                                description="Explore our premium concrete countertop design with integrated sink. Perfect for kitchens and bathrooms."
                            />
                        </div>

                        <ModelViewer
                            modelType="driveway"
                            title="Concrete Driveway"
                            description="Visualize how a new concrete driveway would enhance your home's curb appeal and functionality."
                        />

                        <ModelViewer
                            modelType="stamped"
                            title="Stamped Concrete Patio"
                            description="Discover the beauty of stamped concrete for your outdoor entertainment area."
                        />
                    </div>

                    {/* Additional Information */}
                    <div className="max-w-4xl mx-auto mt-16">
                        <h3 className="text-2xl font-bold mb-6">Why Choose 3D Visualization?</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                            <div className="space-y-4">
                                <h4 className="text-lg font-semibold">Better Decision Making</h4>
                                <p className="text-gray-600 dark:text-gray-400">
                                    3D models help you visualize the final result before any work begins,
                                    allowing you to make informed decisions about your concrete project.
                                </p>

                                <h4 className="text-lg font-semibold">Accurate Planning</h4>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Visualizing your project in 3D helps with accurate planning, ensuring
                                    that the final result meets your expectations.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <h4 className="text-lg font-semibold">Design Exploration</h4>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Explore different design options and configurations to find the
                                    perfect concrete solution for your space.
                                </p>

                                <h4 className="text-lg font-semibold">Communication Tool</h4>
                                <p className="text-gray-600 dark:text-gray-400">
                                    3D models serve as an excellent communication tool between you and
                                    our team, ensuring we're all on the same page regarding your project.
                                </p>
                            </div>
                        </div>

                        <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg border-l-4 border-orange-500">
                            <h4 className="text-lg font-semibold mb-2">Custom 3D Visualization</h4>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                Need a custom 3D visualization for your specific project? Our team can create
                                detailed 3D models tailored to your exact specifications. Contact us to discuss
                                your requirements.
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
