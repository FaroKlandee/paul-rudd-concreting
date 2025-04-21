"use client";

import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { motion, useScroll, useTransform } from "framer-motion";
import { Menu, Phone } from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from "react";
import { FaFacebook } from "react-icons/fa";

export function Header() {
    const [lastScrollY, setLastScrollY] = useState(0);
    const [shouldShowHeader, setShouldShowHeader] = useState(true);
    const { scrollY } = useScroll();

    // Track scroll direction and position
    useEffect(() => {
        const updateScrollDirection = () => {
            const currentScrollY = window.scrollY;

            // Show header when scrolling up or at the top
            if (currentScrollY <= 100) {
                setShouldShowHeader(true);
            } else if (currentScrollY < lastScrollY) {
                // Scrolling up
                setShouldShowHeader(true);
            } else if (currentScrollY > 100 && currentScrollY > lastScrollY) {
                // Scrolling down and past first section
                setShouldShowHeader(false);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", updateScrollDirection);

        return () => {
            window.removeEventListener("scroll", updateScrollDirection);
        };
    }, [lastScrollY]);

    // Opacity transform for smooth fade in/out
    const headerOpacity = useTransform(
        scrollY,
        [0, 100],
        [1, 0.95]
    );
    const navItems = [
        { name: 'Home', href: '/' },
        { name: 'Services', href: '/services' },
        { name: 'Gallery', href: '/gallery' },
        { name: 'Models', href: '/models' },
        { name: 'Calculator', href: '/calculator' },
        { name: 'Contact', href: '/contact' },
    ];

    return (
        <>
            {/* Top bar with contact and social */}
            <motion.div
                className="bg-white border-b fixed top-0 left-0 right-0 z-50"
                initial={{ y: 0 }}
                animate={{
                    y: shouldShowHeader ? 0 : -200,
                    opacity: shouldShowHeader ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                style={{ opacity: headerOpacity }}
            >
                <div className="container mx-auto px-4">
                    <div className="flex items-center h-10">
                        <div className="flex-1 flex items-center">
                            <a href="tel:0400000000" className="hidden md:flex items-center gap-2 text-gray-600 hover:text-gray-900">
                                <Phone className="h-4 w-4" />
                                <span>0400 000 000</span>
                            </a>
                        </div>
                        <div className="flex-1 flex justify-center items-center">
                            <Button variant="default" size="sm" asChild>
                                <Link href="/contact">Contact Us</Link>
                            </Button>
                        </div>
                        <div className="flex-1 flex justify-end items-center gap-4">
                            <ThemeToggle />
                            <a
                                href="https://www.facebook.com/paulruddconcreting"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex gap-2 text-gray-600 hover:text-gray-900"
                            >
                                <FaFacebook className="h-6 w-6" />
                            </a>
                        </div>

                    </div>
                </div>
            </motion.div>

            {/* Main header with logo and navigation */}
            <motion.div
                className="bg-gray-100 fixed top-10 left-0 right-0 z-40"
                initial={{ y: 0 }}
                animate={{
                    y: shouldShowHeader ? 0 : -200,
                    opacity: shouldShowHeader ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                style={{ opacity: headerOpacity }}
            >
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        {/* Brand Logo */}
                        <Link href="/" className="flex items-center justify-center">
                            <Image
                                src="/images/prc-logo.png"
                                alt="Paul Rudd Concreting"
                                width={337}
                                height={341}
                                className="h-20 w-20 mix-blend-lighter translate-y-2"
                                priority
                            />
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center space-x-12">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="text-lg text-gray-600 hover:text-gray-900 font-medium"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </nav>

                        {/* Mobile Navigation */}
                        <Sheet>
                            <SheetTrigger className="md:hidden p-2">
                                <Menu className="h-6 w-6" />
                            </SheetTrigger>
                            <SheetContent>
                                <nav className="flex flex-col space-y-4 mt-8">
                                    {navItems.map((item) => (
                                        <SheetClose key={item.name} asChild>
                                            <Link
                                                href={item.href}
                                                className="text-xl text-gray-600 hover:text-gray-900"
                                            >
                                                {item.name}
                                            </Link>
                                        </SheetClose>
                                    ))}
                                </nav>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </motion.div>

            {/* Spacer to prevent content from being hidden under fixed header */}
            <div className="h-[90px]"></div>
        </>
    );
}
