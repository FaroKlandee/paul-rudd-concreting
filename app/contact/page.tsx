'use client';

import { BackToTop } from "@/components/ui/back-to-top";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function ContactPage() {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        projectType: '',
        projectSize: '',
        timeline: '',
        details: '',
        submitted: false,
        loading: false
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormState(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFormState(prev => ({ ...prev, loading: true }));

        // Simulate form submission
        setTimeout(() => {
            setFormState(prev => ({
                ...prev,
                submitted: true,
                loading: false
            }));
        }, 1500);
    };

    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <section className="relative h-64 bg-gradient-to-r from-gray-900 to-gray-800">
                <div className="absolute inset-0 bg-black/50" />
                <Image
                    src="/images/rest-3.jpg"
                    alt="Contact us"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="relative container mx-auto px-4 h-full flex items-center">
                    <div className="max-w-2xl text-white">
                        <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
                        <p className="text-xl text-gray-200">
                            Get in touch for a free consultation and quote
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <Breadcrumb />

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8">
                        {/* Contact Information */}
                        <div>
                            <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>
                            <p className="text-gray-600 dark:text-gray-400 mb-8">
                                Have questions about our concrete services? Need a quote for your project?
                                We're here to help. Contact us using the information below or fill out the
                                quote request form.
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4 group">
                                    <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-full group-hover:scale-110 transition-transform duration-300">
                                        <Phone className="h-6 w-6 text-orange-500" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">Phone</h3>
                                        <p className="text-gray-600 dark:text-gray-400">0400 000 000</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                                            Available Monday-Friday, 7am-5pm
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 group">
                                    <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-full group-hover:scale-110 transition-transform duration-300">
                                        <Mail className="h-6 w-6 text-orange-500" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">Email</h3>
                                        <p className="text-gray-600 dark:text-gray-400">info@paulrudd.com</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                                            We'll respond within 24 hours
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 group">
                                    <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-full group-hover:scale-110 transition-transform duration-300">
                                        <MapPin className="h-6 w-6 text-orange-500" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">Location</h3>
                                        <p className="text-gray-600 dark:text-gray-400">Orange, NSW</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                                            Serving Orange and surrounding areas
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 group">
                                    <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-full group-hover:scale-110 transition-transform duration-300">
                                        <Clock className="h-6 w-6 text-orange-500" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">Business Hours</h3>
                                        <p className="text-gray-600 dark:text-gray-400">Monday-Friday: 7am-5pm</p>
                                        <p className="text-gray-600 dark:text-gray-400">Saturday: By appointment</p>
                                        <p className="text-gray-600 dark:text-gray-400">Sunday: Closed</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12">
                                <h3 className="text-2xl font-bold mb-4">Service Areas</h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-4">
                                    We provide concrete services throughout Orange and surrounding areas including:
                                </p>
                                <div className="grid grid-cols-2 gap-2">
                                    {['Orange', 'Bathurst', 'Dubbo', 'Parkes', 'Forbes', 'Cowra', 'Blayney', 'Molong'].map((area) => (
                                        <div key={area} className="bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-md text-center">
                                            {area}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Quote Request Form */}
                        <div>
                            <Card className="border-orange-200 dark:border-orange-900/20">
                                <CardHeader className="bg-orange-50 dark:bg-orange-900/10 border-b border-orange-100 dark:border-orange-900/20">
                                    <CardTitle className="text-2xl">Request a Quote</CardTitle>
                                    <CardDescription>
                                        Fill out the form below and we'll get back to you with a free estimate
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="pt-6">
                                    {formState.submitted ? (
                                        <div className="text-center py-8 space-y-4 animate-in fade-in slide-in-from-bottom-5 duration-500">
                                            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <h3 className="text-xl font-bold">Thank You!</h3>
                                            <p className="text-gray-600 dark:text-gray-400">
                                                Your quote request has been submitted successfully. We'll get back to you within 24 hours.
                                            </p>
                                            <Button
                                                onClick={() => setFormState(prev => ({ ...prev, submitted: false }))}
                                                className="mt-4"
                                                variant="outline"
                                            >
                                                Submit Another Request
                                            </Button>
                                        </div>
                                    ) : (
                                        <form onSubmit={handleSubmit} className="space-y-4">
                                            {/* Personal Information */}
                                            <div className="space-y-4">
                                                <h3 className="font-medium text-lg">Personal Information</h3>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                            Full Name *
                                                        </label>
                                                        <input
                                                            type="text"
                                                            id="name"
                                                            name="name"
                                                            value={formState.name}
                                                            onChange={handleChange}
                                                            required
                                                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                            Email Address *
                                                        </label>
                                                        <input
                                                            type="email"
                                                            id="email"
                                                            name="email"
                                                            value={formState.email}
                                                            onChange={handleChange}
                                                            required
                                                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                            Phone Number *
                                                        </label>
                                                        <input
                                                            type="tel"
                                                            id="phone"
                                                            name="phone"
                                                            value={formState.phone}
                                                            onChange={handleChange}
                                                            required
                                                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                            Project Address *
                                                        </label>
                                                        <input
                                                            type="text"
                                                            id="address"
                                                            name="address"
                                                            value={formState.address}
                                                            onChange={handleChange}
                                                            required
                                                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Project Details */}
                                            <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                                                <h3 className="font-medium text-lg">Project Details</h3>
                                                <div>
                                                    <label htmlFor="projectType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                        Project Type *
                                                    </label>
                                                    <select
                                                        id="projectType"
                                                        name="projectType"
                                                        value={formState.projectType}
                                                        onChange={handleChange}
                                                        required
                                                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white"
                                                    >
                                                        <option value="">Select Project Type</option>
                                                        <option value="driveway">Driveway</option>
                                                        <option value="patio">Patio/Entertainment Area</option>
                                                        <option value="pool">Pool Surround</option>
                                                        <option value="foundation">Foundation/Slab</option>
                                                        <option value="commercial">Commercial Flooring</option>
                                                        <option value="restoration">Concrete Restoration</option>
                                                        <option value="other">Other</option>
                                                    </select>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <label htmlFor="projectSize" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                            Approximate Size
                                                        </label>
                                                        <input
                                                            type="text"
                                                            id="projectSize"
                                                            name="projectSize"
                                                            value={formState.projectSize}
                                                            onChange={handleChange}
                                                            placeholder="e.g., 20 sq meters"
                                                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                            Preferred Timeline
                                                        </label>
                                                        <select
                                                            id="timeline"
                                                            name="timeline"
                                                            value={formState.timeline}
                                                            onChange={handleChange}
                                                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white"
                                                        >
                                                            <option value="">Select Timeline</option>
                                                            <option value="asap">As Soon As Possible</option>
                                                            <option value="1month">Within 1 Month</option>
                                                            <option value="3months">Within 3 Months</option>
                                                            <option value="flexible">Flexible</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div>
                                                    <label htmlFor="details" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                        Project Details
                                                    </label>
                                                    <textarea
                                                        id="details"
                                                        name="details"
                                                        value={formState.details}
                                                        onChange={handleChange}
                                                        rows={4}
                                                        placeholder="Please provide any additional details about your project..."
                                                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white"
                                                    ></textarea>
                                                </div>
                                            </div>

                                            {/* Submit Button */}
                                            <div className="pt-4">
                                                <Button
                                                    type="submit"
                                                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-md transition-colors"
                                                    disabled={formState.loading}
                                                >
                                                    {formState.loading ? (
                                                        <div className="flex items-center justify-center">
                                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                            </svg>
                                                            Submitting...
                                                        </div>
                                                    ) : (
                                                        'Submit Quote Request'
                                                    )}
                                                </Button>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                                                    * Required fields
                                                </p>
                                            </div>
                                        </form>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className="py-12 bg-gray-50 dark:bg-gray-900">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-8 text-center">Our Location</h2>
                    <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d53406.38001655112!2d149.07676233936686!3d-33.28578522678477!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b0f58fe7974cde7%3A0x50609b490442940!2sOrange%20NSW%202800!5e0!3m2!1sen!2sau!4v1650000000000!5m2!1sen!2sau"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen={false}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Orange NSW Map"
                        ></iframe>
                    </div>
                </div>
            </section>
            <BackToTop />
        </main>
    );
}
