import { Mail, MapPin, Phone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { FaFacebookF } from 'react-icons/fa';

// Footer Component
export function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Brand and Social */}
                    <div className="space-y-4">
                        <Image
                            src="/images/prc-logo.png"
                            alt="Paul Rudd Concreting"
                            width={337}
                            height={341}
                            className="h-auto w-auto mb-4 mix-blend-difference"
                        />
                        <a
                            href="https://www.facebook.com/paulruddconcreting"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 text-gray-300 hover:text-white"
                        >
                            <FaFacebookF className="h-5 w-5" />
                            <span>Follow us on Facebook</span>
                        </a>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="font-semibold text-white mb-4">Contact Information</h4>
                        <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                                <Phone className="h-5 w-5" />
                                <span>0400 000 000</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Mail className="h-5 w-5" />
                                <span>info@paulrudd.com</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <MapPin className="h-5 w-5" />
                                <span>Sydney, NSW</span>
                            </div>
                        </div>
                    </div>

                    {/* Business Hours */}
                    <div>
                        <h4 className="font-semibold text-white mb-4">Business Hours</h4>
                        <div className="space-y-2">
                            <p>Monday - Friday: 7:00 AM - 5:00 PM</p>
                            <p>Saturday: By Appointment</p>
                            <p>Sunday: Closed</p>
                        </div>
                    </div>
                </div>

                {/* Copyright and Legal */}
                <div className="mt-12 pt-8 border-t border-gray-800">
                    <div className="space-y-4 text-sm text-gray-400">
                        <p className="max-w-3xl">
                            Content, including images, displayed on this website is protected by copyright laws.
                            Downloading, republication, retransmission or reproduction of content on this website
                            is strictly prohibited.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link href="/terms" className="hover:text-white">
                                Terms of Use
                            </Link>
                            <Link href="/privacy" className="hover:text-white">
                                Privacy Policy
                            </Link>
                            <p>© {new Date().getFullYear()} Paul Rudd Concreting. All rights reserved.</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}