'use client';

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./button";

export function BackToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    if (!isVisible) return null;

    return (
        <Button
            className="fixed bottom-8 right-8 bg-orange-500 hover:bg-orange-600 rounded-full p-3"
            onClick={scrollToTop}
            aria-label="Back to top"
        >
            <ArrowUp className="h-5 w-5" />
        </Button>
    );
}