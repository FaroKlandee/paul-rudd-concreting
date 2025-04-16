"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"

interface BeforeAfterSliderProps {
    beforeImage: string
    afterImage: string
    beforeAlt: string
    afterAlt: string
}

export function BeforeAfterSlider({
    beforeImage,
    afterImage,
    beforeAlt,
    afterAlt
}: BeforeAfterSliderProps) {
    const [sliderPosition, setSliderPosition] = useState(50)
    const [isDragging, setIsDragging] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    const handleMouseDown = () => {
        setIsDragging(true)
    }

    const handleMouseUp = () => {
        setIsDragging(false)
    }

    const handleMouseMove = (e: MouseEvent) => {
        if (isDragging && containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect()
            const x = e.clientX - rect.left
            const containerWidth = rect.width

            // Calculate position as percentage
            let newPosition = (x / containerWidth) * 100

            // Clamp position between 0 and 100
            newPosition = Math.max(0, Math.min(100, newPosition))

            setSliderPosition(newPosition)
        }
    }

    const handleTouchMove = (e: TouchEvent) => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect()
            const x = e.touches[0].clientX - rect.left
            const containerWidth = rect.width

            // Calculate position as percentage
            let newPosition = (x / containerWidth) * 100

            // Clamp position between 0 and 100
            newPosition = Math.max(0, Math.min(100, newPosition))

            setSliderPosition(newPosition)
        }
    }

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove)
            window.addEventListener('mouseup', handleMouseUp)
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('mouseup', handleMouseUp)
        }
    }, [isDragging])

    return (
        <div
            ref={containerRef}
            className="relative w-full h-[300px] md:h-[400px] overflow-hidden rounded-lg cursor-ew-resize"
            onMouseDown={handleMouseDown}
            onTouchMove={(e) => handleTouchMove(e as unknown as TouchEvent)}
            onTouchEnd={handleMouseUp}
        >
            {/* After Image (Full width) */}
            <div className="absolute inset-0 w-full h-full">
                <Image
                    src={afterImage}
                    alt={afterAlt}
                    fill
                    className="object-cover"
                />
            </div>

            {/* Before Image (Clipped) */}
            <div
                className="absolute inset-0 h-full overflow-hidden"
                style={{ width: `${sliderPosition}%` }}
            >
                <Image
                    src={beforeImage}
                    alt={beforeAlt}
                    fill
                    className="object-cover"
                />
            </div>

            {/* Slider Control */}
            <div
                className="absolute top-0 bottom-0 w-1 bg-white shadow-lg"
                style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
            >
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
                    <div className="w-6 h-6 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 8L22 12L18 16"></path>
                            <path d="M6 8L2 12L6 16"></path>
                            <line x1="2" y1="12" x2="22" y2="12"></line>
                        </svg>
                    </div>
                </div>
            </div>

            {/* Labels */}
            <div className="absolute bottom-4 left-4 bg-black/70 text-white px-2 py-1 text-sm rounded">Before</div>
            <div className="absolute bottom-4 right-4 bg-black/70 text-white px-2 py-1 text-sm rounded">After</div>
        </div>
    )
}
