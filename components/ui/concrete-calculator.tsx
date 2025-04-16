"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calculator, Info } from "lucide-react"
import { useState } from "react"

type CalculatorShape = "rectangular" | "circular" | "triangular"

interface CalculatorFormData {
    shape: CalculatorShape
    length: number
    width: number
    depth: number
    diameter: number
    base: number
    height: number
}

export function ConcreteCalculator() {
    const [formData, setFormData] = useState<CalculatorFormData>({
        shape: "rectangular",
        length: 0,
        width: 0,
        depth: 0.1, // Default depth 10cm
        diameter: 0,
        base: 0,
        height: 0
    })

    const [result, setResult] = useState<number | null>(null)
    const [unit, setUnit] = useState<"metric" | "imperial">("metric")

    // Handle input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target

        if (name === "shape") {
            setFormData({
                ...formData,
                shape: value as CalculatorShape
            })
            setResult(null)
            return
        }

        // Convert string input to number
        const numValue = parseFloat(value) || 0

        setFormData({
            ...formData,
            [name]: numValue
        })
    }

    // Calculate concrete volume
    const calculateVolume = () => {
        let volume = 0

        switch (formData.shape) {
            case "rectangular":
                volume = formData.length * formData.width * formData.depth
                break
            case "circular":
                // πr²h
                const radius = formData.diameter / 2
                volume = Math.PI * radius * radius * formData.depth
                break
            case "triangular":
                // 0.5 * base * height * depth
                volume = 0.5 * formData.base * formData.height * formData.depth
                break
        }

        // Convert to cubic meters if in metric
        if (unit === "imperial") {
            // Convert cubic feet to cubic yards (1 cubic yard = 27 cubic feet)
            volume = volume / 27
        }

        setResult(volume)
    }

    // Format the result with appropriate units
    const formatResult = () => {
        if (result === null) return ""

        // Round to 2 decimal places
        const roundedResult = Math.round(result * 100) / 100

        if (unit === "metric") {
            return `${roundedResult} cubic meters`
        } else {
            return `${roundedResult} cubic yards`
        }
    }

    // Calculate bags of concrete needed (approximate)
    const calculateBags = () => {
        if (result === null) return ""

        // Approximate bags needed (40kg bag covers about 0.01 cubic meters)
        // or (80lb bag covers about 0.6 cubic feet)
        let bags = 0

        if (unit === "metric") {
            bags = Math.ceil(result / 0.01) // 40kg bags
            return `≈ ${bags} bags (40kg)`
        } else {
            bags = Math.ceil(result * 27 / 0.6) // 80lb bags
            return `≈ ${bags} bags (80lb)`
        }
    }

    return (
        <Card className="w-full max-w-3xl mx-auto">
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Calculator className="h-6 w-6 text-orange-500" />
                    <CardTitle>Concrete Calculator</CardTitle>
                </div>
                <CardDescription>
                    Estimate the amount of concrete needed for your project
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {/* Unit Selection */}
                    <div className="flex justify-center mb-6">
                        <div className="inline-flex rounded-md shadow-sm" role="group">
                            <button
                                type="button"
                                className={`px-4 py-2 text-sm font-medium rounded-l-lg ${unit === "metric"
                                        ? "bg-orange-500 text-white"
                                        : "bg-white border border-gray-200 text-gray-900 hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600"
                                    }`}
                                onClick={() => setUnit("metric")}
                            >
                                Metric (m)
                            </button>
                            <button
                                type="button"
                                className={`px-4 py-2 text-sm font-medium rounded-r-lg ${unit === "imperial"
                                        ? "bg-orange-500 text-white"
                                        : "bg-white border border-gray-200 text-gray-900 hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600"
                                    }`}
                                onClick={() => setUnit("imperial")}
                            >
                                Imperial (ft)
                            </button>
                        </div>
                    </div>

                    {/* Shape Selection */}
                    <div className="grid grid-cols-1 gap-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Shape
                        </label>
                        <select
                            name="shape"
                            value={formData.shape}
                            onChange={handleInputChange}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600"
                        >
                            <option value="rectangular">Rectangular (Slab, Driveway, Patio)</option>
                            <option value="circular">Circular (Column, Pool)</option>
                            <option value="triangular">Triangular (Special Shapes)</option>
                        </select>
                    </div>

                    {/* Dimensions Inputs */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {formData.shape === "rectangular" && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Length ({unit === "metric" ? "meters" : "feet"})
                                    </label>
                                    <input
                                        type="number"
                                        name="length"
                                        value={formData.length || ""}
                                        onChange={handleInputChange}
                                        min="0"
                                        step="0.1"
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Width ({unit === "metric" ? "meters" : "feet"})
                                    </label>
                                    <input
                                        type="number"
                                        name="width"
                                        value={formData.width || ""}
                                        onChange={handleInputChange}
                                        min="0"
                                        step="0.1"
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600"
                                    />
                                </div>
                            </>
                        )}

                        {formData.shape === "circular" && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Diameter ({unit === "metric" ? "meters" : "feet"})
                                </label>
                                <input
                                    type="number"
                                    name="diameter"
                                    value={formData.diameter || ""}
                                    onChange={handleInputChange}
                                    min="0"
                                    step="0.1"
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600"
                                />
                            </div>
                        )}

                        {formData.shape === "triangular" && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Base ({unit === "metric" ? "meters" : "feet"})
                                    </label>
                                    <input
                                        type="number"
                                        name="base"
                                        value={formData.base || ""}
                                        onChange={handleInputChange}
                                        min="0"
                                        step="0.1"
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Height ({unit === "metric" ? "meters" : "feet"})
                                    </label>
                                    <input
                                        type="number"
                                        name="height"
                                        value={formData.height || ""}
                                        onChange={handleInputChange}
                                        min="0"
                                        step="0.1"
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600"
                                    />
                                </div>
                            </>
                        )}

                        {/* Depth is common to all shapes */}
                        <div className={formData.shape === "circular" ? "col-span-2" : ""}>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Depth/Thickness ({unit === "metric" ? "meters" : "feet"})
                            </label>
                            <input
                                type="number"
                                name="depth"
                                value={formData.depth || ""}
                                onChange={handleInputChange}
                                min="0"
                                step="0.01"
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600"
                            />
                        </div>
                    </div>

                    {/* Calculate Button */}
                    <div className="mt-6">
                        <Button
                            onClick={calculateVolume}
                            className="w-full bg-orange-500 hover:bg-orange-600"
                        >
                            Calculate
                        </Button>
                    </div>

                    {/* Results */}
                    {result !== null && (
                        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Results</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-3 bg-white dark:bg-gray-700 rounded-md shadow">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Volume Needed</p>
                                    <p className="text-2xl font-bold text-orange-500">{formatResult()}</p>
                                </div>

                                <div className="p-3 bg-white dark:bg-gray-700 rounded-md shadow">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Estimated Bags</p>
                                    <p className="text-2xl font-bold text-orange-500">{calculateBags()}</p>
                                </div>
                            </div>

                            <div className="mt-4 flex items-start gap-2 text-sm text-gray-500 dark:text-gray-400">
                                <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                <p>
                                    This is an estimate only. We recommend adding 5-10% extra to account for waste and variations in depth.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
