import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, Phone } from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';
import { FaFacebook } from "react-icons/fa";

export function Header() {
    const navItems = [
        { name: 'Home', href: '/' },
        { name: 'Services', href: '/services' },
        { name: 'Gallery', href: '/gallery' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
    ];

    return (
        <>
            {/* Top bar with contact and social */}
            <div className="bg-white border-b">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-12">
                        <div className="flex items-center gap-6">
                            <a href="tel:0400000000" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                                <Phone className="h-4 w-4" />
                                <span>0400 000 000</span>
                            </a>
                            <Button variant="default" size="sm" asChild>
                                <Link href="/contact">Contact Us</Link>
                            </Button>
                        </div>
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

            {/* Main header with logo and navigation */}
            <div className="bg-gray-100">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-auto">
                        {/* Brand Logo */}
                        <Link href="/" className="flex items-center justify-center">
                            <Image
                                src="/images/prc-logo.png"
                                alt="Paul Rudd Concreting"
                                width={337}
                                height={341}
                                className="h-auto w-32 mix-blend-multiply -translate-y-0"
                                priority
                            />
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center space-x-12">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="text-2xl text-gray-600 hover:text-gray-900 font-medium"
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
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className="text-xl text-gray-600 hover:text-gray-900"
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </nav>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </>
    );
}