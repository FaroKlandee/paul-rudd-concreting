'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

export function ContactSection() {
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
        <section id="contact" className="min-h-screen pt-24">
            {/* Contact Section with Integrated Header and Form */}
            <div className="bg-white dark:bg-gray-900 py-16">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            Have questions about our concrete services? Need a quote for your project?
                            We're here to help. Fill out the form below.
                        </p>
                    </div>
                    <div className="flex justify-center">
                        {/* Quote Request Form */}
                        <div className="max-w-2xl w-full">
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
                                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                                                    * No fees are charged for quotes
                                                </p>
                                            </div>
                                        </form>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>

            {/* Map Section */}
            <div className="py-16 bg-gray-50 dark:bg-gray-800">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-8 text-center">Our Location</h2>
                    <div className="relative h-96 rounded-lg overflow-hidden">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d53385.534532408885!2d149.02056705200667!3d-33.25088832877374!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b102cd0e28c4861%3A0x50609b4904423f0!2sOrange%20NSW%202800!5e0!3m2!1sen!2sau!4v1749979543357!5m2!1sen!2sau"
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
            </div>
        </section>
    );
}
