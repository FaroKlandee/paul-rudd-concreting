import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Building2, ChevronRight, Home, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ServicesPage() {
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

    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <section className="relative h-64 bg-gradient-to-r from-gray-900 to-gray-800">
                <div className="absolute inset-0 bg-black/50" />
                <Image
                    src="/api/placeholder/1920/1080"
                    alt="Concrete services"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="relative container mx-auto px-4 h-full flex items-center">
                    <div className="max-w-2xl text-white">
                        <h1 className="text-5xl font-bold mb-4">Our Services</h1>
                        <p className="text-xl text-gray-200">
                            Professional concrete solutions for every project, big or small
                        </p>
                    </div>
                </div>
            </section>

            {/* Service Categories */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    {/* Residential Services */}
                    <div className="mb-20">
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
                        <div className="flex items-center gap-3 mb-8">
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

                    {/* Call to Action */}
                    <div className="bg-gray-50 rounded-lg p-8 text-center">
                        <h3 className="text-2xl font-bold mb-4">Ready to Start Your Project?</h3>
                        <p className="text-gray-600 mb-6">
                            Contact us for a free consultation and quote. We're here to help bring your vision to life.
                        </p>
                        <div className="flex justify-center gap-4">
                            <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
                                <Phone className="mr-2 h-5 w-5" />
                                Call Us Now
                            </Button>
                            <Button size="lg" variant="outline" asChild>
                                <Link href="/contact">
                                    Request Quote
                                    <ChevronRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
