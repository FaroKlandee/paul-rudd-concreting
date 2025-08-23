'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import DOMPurify from "isomorphic-dompurify";
import { AlertCircle, CheckCircle } from "lucide-react";
import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import validator from "validator";

// TypeScript interfaces
interface FormState {
    name: string;
    email: string;
    phone: string;
    address: string;
    projectType: string;
    projectSize: string;
    timeline: string;
    details: string;
    honeypot: string;
    submitted: boolean;
    loading: boolean;
    errors: FormErrors;
}

interface FormErrors {
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
    projectType?: string;
    projectSize?: string;
    timeline?: string;
    details?: string;
    recaptcha?: string;
    submit?: string;
    honeypot?: string;
}

export function ContactSection() {
    const [formState, setFormState] = useState<FormState>({
        name: '',
        email: '',
        phone: '',
        address: '',
        projectType: '',
        projectSize: '',
        timeline: '',
        details: '',
        honeypot: '', // Bot trap field
        submitted: false,
        loading: false,
        errors: {} // Now properly typed as FormErrors
    });

    const recaptchaRef = useRef<ReCAPTCHA>(null);

    // Client-side validation function
    const validateForm = (): FormErrors => {
        const errors: FormErrors = {};

        // Name validation
        if (!formState.name.trim() || formState.name.length < 2) {
            errors.name = 'Name must be at least 2 characters long';
        }
        if (formState.name.length > 50) {
            errors.name = 'Name must be less than 50 characters';
        }

        // Email validation
        if (!validator.isEmail(formState.email)) {
            errors.email = 'Please enter a valid email address';
        }

        // Phone validation (Australian format)
        const phoneRegex = /^(\+61|0)[2-9]\d{8}$/;
        if (!phoneRegex.test(formState.phone.replace(/\s/g, ''))) {
            errors.phone = 'Please enter a valid Australian phone number';
        }

        // Address validation
        if (!formState.address.trim() || formState.address.length < 5) {
            errors.address = 'Please enter a valid project address';
        }

        // Project type validation
        if (!formState.projectType) {
            errors.projectType = 'Please select a project type';
        }

        // Details validation (optional but if provided, should be reasonable length)
        if (formState.details && formState.details.length > 1000) {
            errors.details = 'Project details must be less than 1000 characters';
        }

        // Honeypot check (should be empty)
        if (formState.honeypot) {
            errors.honeypot = 'Bot detected';
        }

        return errors;
    };

    // Sanitize input data
    const sanitizeData = (data: FormState) => {
        return {
            name: DOMPurify.sanitize(validator.escape(data.name.trim())),
            email: validator.normalizeEmail(data.email.trim()) || '',
            phone: data.phone.replace(/\s/g, ''),
            address: DOMPurify.sanitize(data.address.trim()),
            projectType: DOMPurify.sanitize(data.projectType),
            projectSize: DOMPurify.sanitize(data.projectSize),
            timeline: DOMPurify.sanitize(data.timeline),
            details: DOMPurify.sanitize(data.details.trim())
        };
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormState(prev => ({
            ...prev,
            [name]: value,
            errors: { ...prev.errors, [name]: '' } // Clear error when user starts typing
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate form
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setFormState(prev => ({ ...prev, errors: validationErrors }));
            return;
        }

        // Check reCAPTCHA (only if environment variable is set)
        if (process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) {
            const recaptchaValue = recaptchaRef.current?.getValue();
            if (!recaptchaValue) {
                setFormState(prev => ({
                    ...prev,
                    errors: { recaptcha: 'Please complete the reCAPTCHA verification' }
                }));
                return;
            }
        }

        setFormState(prev => ({ ...prev, loading: true }));

        try {
            const sanitizedData = sanitizeData(formState);

            const formData = new FormData();
            formData.append('name', sanitizedData.name);
            formData.append('email', sanitizedData.email);
            formData.append('phone', sanitizedData.phone);
            formData.append('address', sanitizedData.address);
            formData.append('projectType', sanitizedData.projectType);
            formData.append('projectSize', sanitizedData.projectSize);
            formData.append('timeline', sanitizedData.timeline);
            formData.append('details', sanitizedData.details);

            // Add reCAPTCHA response if available
            if (process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) {
                const recaptchaValue = recaptchaRef.current?.getValue();
                if (recaptchaValue) {
                    formData.append('g-recaptcha-response', recaptchaValue);
                }
            }

            formData.append('_replyto', 'paul.rudd27@bigpond.com');
            formData.append('_subject', 'New Contact Form Submission - Orange Concrete Services');

            const formspreeFormId = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID;
            if (!formspreeFormId) {
                throw new Error('Formspree configuration missing');
            }

            const response = await fetch(`https://formspree.io/f/${formspreeFormId}`, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                setFormState(prev => ({
                    ...prev,
                    submitted: true,
                    loading: false
                }));
                // Reset reCAPTCHA
                recaptchaRef.current?.reset();
            } else {
                throw new Error('Failed to submit form');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setFormState(prev => ({
                ...prev,
                loading: false,
                errors: { submit: 'There was an error submitting your form. Please try again.' }
            }));
        }
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
                                            <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
                                            <h3 className="text-xl font-bold">Thank You!</h3>
                                            <p className="text-gray-600 dark:text-gray-400">
                                                Your quote request has been submitted successfully. We'll get back to you within 24 hours.
                                            </p>
                                            <Button
                                                onClick={() => setFormState(prev => ({
                                                    ...prev,
                                                    submitted: false,
                                                    name: '', email: '', phone: '', address: '',
                                                    projectType: '', projectSize: '', timeline: '', details: '',
                                                    errors: {}
                                                }))}
                                                className="mt-4"
                                                variant="outline"
                                            >
                                                Submit Another Request
                                            </Button>
                                        </div>
                                    ) : (
                                        <form onSubmit={handleSubmit} className="space-y-4">
                                            {/* General Error Message */}
                                            {formState.errors.submit && (
                                                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md flex items-center">
                                                    <AlertCircle className="h-5 w-5 mr-2" />
                                                    {formState.errors.submit}
                                                </div>
                                            )}

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
                                                            className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white ${formState.errors?.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                                                }`}
                                                        />
                                                        {formState.errors?.name && (
                                                            <p className="text-red-500 text-xs mt-1">{formState.errors.name}</p>
                                                        )}
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
                                                            className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white ${formState.errors?.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                                                }`}
                                                        />
                                                        {formState.errors?.email && (
                                                            <p className="text-red-500 text-xs mt-1">{formState.errors.email}</p>
                                                        )}
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
                                                            placeholder="0400 000 000"
                                                            className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white ${formState.errors?.phone ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                                                }`}
                                                        />
                                                        {formState.errors?.phone && (
                                                            <p className="text-red-500 text-xs mt-1">{formState.errors.phone}</p>
                                                        )}
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
                                                            className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white ${formState.errors.address ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                                                }`}
                                                        />
                                                        {formState.errors.address && (
                                                            <p className="text-red-500 text-xs mt-1">{formState.errors.address}</p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Honeypot field (hidden from users, trap for bots) */}
                                            <input
                                                type="text"
                                                name="honeypot"
                                                value={formState.honeypot}
                                                onChange={handleChange}
                                                style={{ display: 'none' }}
                                                tabIndex={-1}
                                                autoComplete="off"
                                            />

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
                                                        className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white ${formState.errors.projectType ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                                            }`}
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
                                                    {formState.errors.projectType && (
                                                        <p className="text-red-500 text-xs mt-1">{formState.errors.projectType}</p>
                                                    )}
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
                                                            className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white ${formState.errors.projectSize ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                                                }`}
                                                        />
                                                        {formState.errors.projectSize && (
                                                            <p className="text-red-500 text-xs mt-1">{formState.errors.projectSize}</p>
                                                        )}
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
                                                            className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white ${formState.errors.timeline ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                                                }`}
                                                        >
                                                            <option value="">Select Timeline</option>
                                                            <option value="asap">As Soon As Possible</option>
                                                            <option value="1month">Within 1 Month</option>
                                                            <option value="3months">Within 3 Months</option>
                                                            <option value="flexible">Flexible</option>
                                                        </select>
                                                        {formState.errors.timeline && (
                                                            <p className="text-red-500 text-xs mt-1">{formState.errors.timeline}</p>
                                                        )}
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
                                                        className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white ${formState.errors.details ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                                            }`}
                                                    ></textarea>
                                                    {formState.errors.details && (
                                                        <p className="text-red-500 text-xs mt-1">{formState.errors.details}</p>
                                                    )}
                                                </div>
                                            </div>

                                            {/* reCAPTCHA Section */}
                                            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                                                <h3 className="font-medium text-lg mb-4">Verification</h3>
                                                <div className="flex justify-center">
                                                    {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ? (
                                                        <ReCAPTCHA
                                                            ref={recaptchaRef}
                                                            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                                                            theme="light"
                                                            size="normal"
                                                        />
                                                    ) : (
                                                        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-md">
                                                            <AlertCircle className="h-5 w-5 mr-2 inline" />
                                                            reCAPTCHA configuration missing. Please add NEXT_PUBLIC_RECAPTCHA_SITE_KEY to your environment variables.
                                                        </div>
                                                    )}
                                                </div>
                                                {formState.errors?.recaptcha && (
                                                    <p className="text-red-500 text-xs mt-2 text-center">{formState.errors.recaptcha}</p>
                                                )}
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
                                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-center">
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