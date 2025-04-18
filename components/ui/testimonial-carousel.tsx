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
            name: "Spread the Word Orange Community Member",
            location: "Orange",
            quote: `Just wanted to give a big thumbs up to a local business Paul Rudd Concreting!
            We had some work done and could not be happier with the outcome.
            Fantastic concreting job and landscaping.
            They got the job done super quick and at a great price.
            Also Paul and the team were so kind and patient with
            my three year old son who was absolutely fascinated with their work and
            wanted to be involved. Highly recommend 👍`,
            image: "",
            projectType: ""
        },
        {
            id: 2,
            name: "Michael Thompson",
            location: "Bathurst",
            quote: "As a business owner, I needed durable concrete flooring that could withstand heavy machinery. Their industrial solution has been perfect for our needs.",
            image: "/images/shed-1.jpg",
            projectType: "Industrial Flooring"
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
                                                    <div className={`w-full ${testimonial.image ? 'md:w-2/3' : 'text-center mx-auto max-w-2xl'}`}>
                                                        <div className={`${!testimonial.image && 'flex justify-center'}`}>
                                                            <Quote className="h-8 w-8 text-orange-500 mb-4" />
                                                        </div>
                                                        <p className="text-lg italic mb-6">{testimonial.quote}</p>
                                                        <div className={`flex ${!testimonial.image ? 'justify-center' : ''} items-center`}>
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
                        <div className="absolute top-1/2 left-2 transform -translate-y-1/2 h-10 w-10">
                            <button
                                onClick={prevTestimonial}
                                className="absolute inset-0 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors will-change-auto"
                                style={{ willChange: 'background-color' }}
                                aria-label="Previous testimonial"
                            >
                                <ChevronLeft className="h-6 w-6" />
                            </button>
                        </div>
                        <div className="absolute top-1/2 right-2 transform -translate-y-1/2 h-10 w-10">
                            <button
                                onClick={nextTestimonial}
                                className="absolute inset-0 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors will-change-auto"
                                style={{ willChange: 'background-color' }}
                                aria-label="Next testimonial"
                            >
                                <ChevronRight className="h-6 w-6" />
                            </button>
                        </div>
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
