'use client';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Building, Building2, ChevronRight, Home } from "lucide-react";

interface ServicesSectionProps {
    onNavigate: (path: string) => void;
}

export function ServicesSection({ onNavigate }: ServicesSectionProps) {
    const residentialServices = [
        {
            title: "Driveways & Pathways",
            description: "Custom designed driveways and pathways that enhance your home's curb appeal and accessibility.",
            features: ["Exposed aggregate", "Colored concrete", "Stamped patterns", "Textured finishes"]
        },
        {
            title: "Pool Surrounds",
            description: "Safe, stylish, and durable pool surrounds that complement your outdoor living space.",
            features: ["Non-slip surfaces", "Heat-resistant options", "Drainage solutions", "Custom designs"]
        },
        {
            title: "House Slabs",
            description: "Strong and precise house slabs that provide the perfect foundation for your home.",
            features: ["Engineer certified", "Moisture barriers", "Steel reinforcement", "Level guarantees"]
        },
        {
            title: "Patios & Entertainment Areas",
            description: "Beautiful outdoor living spaces that extend your home into the garden.",
            features: ["Covered areas", "Seamless indoor-outdoor flow", "Custom designs", "Various finishes"]
        }
    ];

    const commercialServices = [
        {
            title: "Industrial Flooring",
            description: "Heavy-duty concrete flooring solutions for warehouses, factories, and industrial spaces.",
            features: ["High load capacity", "Chemical resistant", "Anti-static options", "Easy maintenance"]
        },
        {
            title: "Commercial Foundations",
            description: "Engineered foundations for commercial buildings and structures.",
            features: ["Structural certification", "Load-bearing capacity", "Seismic considerations", "Quality assurance"]
        },
        {
            title: "Car Parks & Loading Bays",
            description: "Durable concrete solutions for high-traffic commercial areas.",
            features: ["Line marking", "Loading dock specifications", "Drainage systems", "Heavy vehicle rated"]
        },
        {
            title: "Retail & Office Spaces",
            description: "Polished and decorative concrete flooring for commercial spaces.",
            features: ["Polished finish", "Custom logos", "Low maintenance", "Slip resistance"]
        }
    ];

    const restorationServices = [
        {
            title: "Architectural Restoration",
            description: "Expert concrete restoration services to preserve and revitalize historic and damaged concrete structures.",
            features: ["Heritage restoration", "Crack repair", "Surface rehabilitation", "Structural reinforcement"]
        }
    ];

    return (
        <section id="services" className="min-h-screen pt-24">
            {/* Services Header */}
            <div className="bg-gray-50 dark:bg-gray-800 py-16">
                <div className="container mx-auto px-4">
                    <div className="text-center">
                        <h1 className="text-5xl font-bold mb-4">Our Services</h1>
                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            Professional concrete solutions for every project, big or small
                        </p>
                    </div>
                </div>
            </div>

            {/* Service Categories */}
            <div className="py-16 bg-white dark:bg-gray-900">
                <div className="container mx-auto px-4">
                    {/* Residential Services */}
                    <div id="residential-excellence" className="mb-20">
                        <div className="flex items-center gap-3 mb-8">
                            <Home className="h-8 w-8 text-orange-500" />
                            <h2 className="text-3xl font-bold">Residential Services</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {residentialServices.map((service, index) => (
                                <Card key={index} className="group">
                                    <CardHeader>
                                        <CardTitle>{service.title}</CardTitle>
                                        <CardDescription>{service.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-2">
                                            {service.features.map((feature, fIndex) => (
                                                <li key={fIndex} className="flex items-center gap-2">
                                                    <ChevronRight className="h-4 w-4 text-orange-500" />
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Commercial Services */}
                    <div className="mb-20">
                        <div id="commercial-&-industrial" className="flex items-center gap-3 mb-8">
                            <Building2 className="h-8 w-8 text-orange-500" />
                            <h2 className="text-3xl font-bold">Commercial & Industrial Services</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {commercialServices.map((service, index) => (
                                <Card key={index} className="group">
                                    <CardHeader>
                                        <CardTitle>{service.title}</CardTitle>
                                        <CardDescription>{service.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-2">
                                            {service.features.map((feature, fIndex) => (
                                                <li key={fIndex} className="flex items-center gap-2">
                                                    <ChevronRight className="h-4 w-4 text-orange-500" />
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Added new section for architectural restoration with id and scroll margin */}
                    <div id="architectural-restoration" className="mb-20 scroll-mt-16">
                        <div className="flex items-center gap-3 mb-8">
                            <Building className="h-8 w-8 text-orange-500" />
                            <h2 className="text-3xl font-bold">Architectural Restoration</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {restorationServices.map((service, index) => (
                                <Card key={index} className="group">
                                    <CardHeader>
                                        <CardTitle>{service.title}</CardTitle>
                                        <CardDescription>{service.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-2">
                                            {service.features.map((feature, fIndex) => (
                                                <li key={fIndex} className="flex items-center gap-2">
                                                    <ChevronRight className="h-4 w-4 text-orange-500" />
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
