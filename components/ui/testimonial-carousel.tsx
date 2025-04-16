"use client"

import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"

interface Testimonial {
    id: number
    name: string
    location: string
    quote: string
    image?: string
    projectType: string
}

export function TestimonialCarousel() {
    const [activeIndex, setActiveIndex] = useState(0)
    const [autoplay, setAutoplay] = useState(true)

    const testimonials: Testimonial[] = [
        {
            id: 1,
            name: "Sarah Johnson",
            location: "Orange",
            quote: "The team transformed our driveway completely. The quality of work exceeded our expectations, and they finished ahead of schedule!",
            image: "/images/house-1-1.jpg",
            projectType: "Residential Driveway"
        },
        {
            id: 2,
            name: "Michael Thompson",
            location: "Bathurst",
            quote: "As a business owner, I needed durable concrete flooring that could withstand heavy machinery. Their industrial solution has been perfect for our needs.",
            image: "/images/shed-1.jpg",
            projectType: "Industrial Flooring"
        },
        {
            id: 3,
            name: "Emma Wilson",
            location: "Orange",
            quote: "Our pool area looks amazing! The non-slip concrete surface is both beautiful and practical. Highly recommend their services.",
            image: "/images/pool-2.jpg",
            projectType: "Pool Surround"
        },
        {
            id: 4,
            name: "David Chen",
            location: "Dubbo",
            quote: "The stamped concrete patio they installed has become the highlight of our backyard. Professional service from start to finish.",
            image: "/images/house-2-2.jpg",
            projectType: "Decorative Patio"
        },
        {
            id: 5,
            name: "Lisa Rodriguez",
            location: "Orange",
            quote: "We hired them to restore the concrete elements of our heritage building. Their attention to detail and respect for the original architecture was impressive.",
            image: "/images/rest-1-2.jpg",
            projectType: "Heritage Restoration"
        }
    ]

    const nextTestimonial = () => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    }

    const prevTestimonial = () => {
        setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
    }

    // Pause autoplay on hover
    const pauseAutoplay = () => setAutoplay(false)
    const resumeAutoplay = () => setAutoplay(true)

    // Autoplay functionality
    useEffect(() => {
        if (!autoplay) return

        const interval = setInterval(() => {
            nextTestimonial()
        }, 5000)

        return () => clearInterval(interval)
    }, [autoplay, activeIndex])

    return (
        <div
            className="relative overflow-hidden py-10"
            onMouseEnter={pauseAutoplay}
            onMouseLeave={resumeAutoplay}
        >
            <div className="absolute top-10 left-0 text-gray-200 dark:text-gray-800 opacity-10">
                <Quote size={120} />
            </div>

            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">What Our Clients Say</h2>

                <div className="max-w-4xl mx-auto">
                    <div className="relative">
                        {/* Testimonial Cards */}
                        <div className="overflow-hidden">
                            <div
                                className="flex transition-transform duration-500 ease-in-out"
                                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                            >
                                {testimonials.map((testimonial) => (
                                    <div key={testimonial.id} className="w-full flex-shrink-0">
                                        <Card className="border-none shadow-lg">
                                            <CardContent className="p-6 md:p-8">
                                                <div className="flex flex-col md:flex-row gap-6 items-center">
                                                    {/* Testimonial Image */}
                                                    {testimonial.image && (
                                                        <div className="relative w-full md:w-1/3 h-48 md:h-64 rounded-lg overflow-hidden">
                                                            <Image
                                                                src={testimonial.image}
                                                                alt={`Project for ${testimonial.name}`}
                                                                fill
                                                                className="object-cover"
                                                            />
                                                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                                                                <span className="text-white text-xs font-medium">
                                                                    {testimonial.projectType}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* Testimonial Content */}
                                                    <div className="w-full md:w-2/3">
                                                        <Quote className="h-8 w-8 text-orange-500 mb-4" />
                                                        <p className="text-lg italic mb-6">{testimonial.quote}</p>
                                                        <div className="flex items-center">
                                                            <div>
                                                                <p className="font-bold">{testimonial.name}</p>
                                                                <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.location}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Navigation Buttons */}
                        <button
                            onClick={prevTestimonial}
                            className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            aria-label="Previous testimonial"
                        >
                            <ChevronLeft className="h-6 w-6" />
                        </button>
                        <button
                            onClick={nextTestimonial}
                            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            aria-label="Next testimonial"
                        >
                            <ChevronRight className="h-6 w-6" />
                        </button>
                    </div>

                    {/* Indicators */}
                    <div className="flex justify-center mt-6 gap-2">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveIndex(index)}
                                className={`w-3 h-3 rounded-full transition-colors ${index === activeIndex
                                        ? 'bg-orange-500'
                                        : 'bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600'
                                    }`}
                                aria-label={`Go to testimonial ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
