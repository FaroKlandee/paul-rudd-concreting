'use client';

import { BackToTop } from "@/components/ui/back-to-top";
import { BeforeAfterSlider } from "@/components/ui/before-after-slider";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Filter } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

// Define project types for filtering
type ProjectType = 'all' | 'residential' | 'commercial' | 'restoration';
type ProjectLocation = 'all' | 'orange' | 'bathurst' | 'dubbo' | 'other';

// Define project interface
interface Project {
    id: number;
    title: string;
    description: string;
    type: Exclude<ProjectType, 'all'>;
    location: Exclude<ProjectLocation, 'all'>;
    beforeImage?: string;
    afterImage?: string;
    images: string[];
}

export default function GalleryPage() {
    // State for active filters
    const [activeType, setActiveType] = useState<ProjectType>('all');
    const [activeLocation, setActiveLocation] = useState<ProjectLocation>('all');
    const [showFilters, setShowFilters] = useState(false);

    // Project data
    const projects: Project[] = [
        {
            id: 1,
            title: "Modern Driveway Transformation",
            description: "Complete driveway renovation with exposed aggregate finish.",
            type: "residential",
            location: "orange",
            beforeImage: "/images/house-1.jpg",
            afterImage: "/images/house-1-1.jpg",
            images: ["/images/house-1.jpg", "/images/house-1-1.jpg"]
        },
        {
            id: 2,
            title: "Commercial Parking Lot",
            description: "Heavy-duty concrete parking area for a retail complex.",
            type: "commercial",
            location: "bathurst",
            beforeImage: "/images/rest-2.jpg",
            afterImage: "/images/rest-2-1.jpg",
            images: ["/images/rest-2.jpg", "/images/rest-2-1.jpg", "/images/rest-2-2.jpg"]
        },
        {
            id: 3,
            title: "Heritage Building Restoration",
            description: "Careful restoration of concrete elements in a historic building.",
            type: "restoration",
            location: "orange",
            beforeImage: "/images/rest-1.jpg",
            afterImage: "/images/rest-1-1.jpg",
            images: ["/images/rest-1.jpg", "/images/rest-1-1.jpg", "/images/rest-1-2.jpg"]
        },
        {
            id: 4,
            title: "Residential Pool Surround",
            description: "Non-slip concrete pool deck with decorative elements.",
            type: "residential",
            location: "dubbo",
            beforeImage: "/images/pool-1.jpg",
            afterImage: "/images/pool-2.jpg",
            images: ["/images/pool-1.jpg", "/images/pool-2.jpg", "/images/pool-3.jpg"]
        },
        {
            id: 5,
            title: "Industrial Warehouse Floor",
            description: "High-performance concrete flooring for heavy machinery.",
            type: "commercial",
            location: "other",
            beforeImage: "/images/shed-2-1.jpg",
            afterImage: "/images/shed-2-2.jpg",
            images: ["/images/shed-1.jpg", "/images/shed-2-1.jpg", "/images/shed-2-2.jpg"]
        },
        {
            id: 6,
            title: "Stamped Concrete Patio",
            description: "Decorative stamped concrete for an outdoor living area.",
            type: "residential",
            location: "orange",
            beforeImage: "/images/house-2-1.jpg",
            afterImage: "/images/house-2-2.jpg",
            images: ["/images/house-2-1.jpg", "/images/house-2-2.jpg"]
        },
        {
            id: 7,
            title: "Excavation and Foundation",
            description: "Complete excavation and foundation work for new construction.",
            type: "commercial",
            location: "bathurst",
            images: ["/images/dig-1.jpg", "/images/dig-2.jpg", "/images/dig-3.jpg"]
        },
        {
            id: 8,
            title: "Decorative Steps Installation",
            description: "Custom concrete steps with integrated lighting.",
            type: "residential",
            location: "orange",
            images: ["/images/step-1.jpg", "/images/step-2.jpg", "/images/step-3.jpg"]
        }
    ];

    // Filter projects based on active filters
    const filteredProjects = projects.filter(project => {
        const matchesType = activeType === 'all' || project.type === activeType;
        const matchesLocation = activeLocation === 'all' || project.location === activeLocation;
        return matchesType && matchesLocation;
    });

    // Filter options
    const typeOptions: { value: ProjectType; label: string }[] = [
        { value: 'all', label: 'All Projects' },
        { value: 'residential', label: 'Residential' },
        { value: 'commercial', label: 'Commercial' },
        { value: 'restoration', label: 'Restoration' }
    ];

    const locationOptions: { value: ProjectLocation; label: string }[] = [
        { value: 'all', label: 'All Locations' },
        { value: 'orange', label: 'Orange' },
        { value: 'bathurst', label: 'Bathurst' },
        { value: 'dubbo', label: 'Dubbo' },
        { value: 'other', label: 'Other Areas' }
    ];

    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <section className="relative h-64 bg-gradient-to-r from-gray-900 to-gray-800">
                <div className="absolute inset-0 bg-black/50" />
                <Image
                    src="/images/stencil-1.jpg"
                    alt="Project gallery"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="relative container mx-auto px-4 h-full flex items-center">
                    <div className="max-w-2xl text-white">
                        <h1 className="text-5xl font-bold mb-4">Project Gallery</h1>
                        <p className="text-xl text-gray-200">
                            Browse our completed concrete projects throughout Orange and surrounding areas
                        </p>
                    </div>
                </div>
            </section>

            {/* Gallery Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <Breadcrumb />

                    {/* Filters */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-2xl font-bold">Our Projects</h2>
                            <Button
                                variant="outline"
                                onClick={() => setShowFilters(!showFilters)}
                                className="flex items-center gap-2"
                            >
                                <Filter className="h-4 w-4" />
                                Filters
                            </Button>
                        </div>

                        {showFilters && (
                            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-6 animate-in fade-in duration-300">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <h3 className="font-medium mb-2">Project Type</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {typeOptions.map(option => (
                                                <Button
                                                    key={option.value}
                                                    variant={activeType === option.value ? "default" : "outline"}
                                                    size="sm"
                                                    onClick={() => setActiveType(option.value)}
                                                    className={activeType === option.value ? "bg-orange-500 hover:bg-orange-600" : ""}
                                                >
                                                    {option.label}
                                                </Button>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-medium mb-2">Location</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {locationOptions.map(option => (
                                                <Button
                                                    key={option.value}
                                                    variant={activeLocation === option.value ? "default" : "outline"}
                                                    size="sm"
                                                    onClick={() => setActiveLocation(option.value)}
                                                    className={activeLocation === option.value ? "bg-orange-500 hover:bg-orange-600" : ""}
                                                >
                                                    {option.label}
                                                </Button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Projects Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProjects.map(project => (
                            <Card key={project.id} className="overflow-hidden group hover:shadow-lg transition-all duration-300">
                                <CardContent className="p-0">
                                    {/* Before/After Slider or Single Image */}
                                    {project.beforeImage && project.afterImage ? (
                                        <BeforeAfterSlider
                                            beforeImage={project.beforeImage}
                                            afterImage={project.afterImage}
                                            beforeAlt={`${project.title} - Before`}
                                            afterAlt={`${project.title} - After`}
                                        />
                                    ) : (
                                        <div className="relative h-[300px]">
                                            <Image
                                                src={project.images[0]}
                                                alt={project.title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    )}

                                    {/* Project Info */}
                                    <div className="p-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-lg font-bold">{project.title}</h3>
                                            <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                                                {project.location.charAt(0).toUpperCase() + project.location.slice(1)}
                                            </span>
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-300 text-sm">{project.description}</p>

                                        {/* Project Type Badge */}
                                        <div className="mt-4">
                                            <span className="text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 px-2 py-1 rounded-full">
                                                {project.type.charAt(0).toUpperCase() + project.type.slice(1)}
                                            </span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* No Results Message */}
                    {filteredProjects.length === 0 && (
                        <div className="text-center py-12">
                            <h3 className="text-xl font-medium mb-2">No projects match your filters</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">Try adjusting your filter criteria</p>
                            <Button
                                onClick={() => {
                                    setActiveType('all');
                                    setActiveLocation('all');
                                }}
                                className="bg-orange-500 hover:bg-orange-600"
                            >
                                Reset Filters
                            </Button>
                        </div>
                    )}
                </div>
            </section>
            <BackToTop />
        </main>
    );
}
