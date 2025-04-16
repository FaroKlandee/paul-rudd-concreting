'use client';

import { BackToTop } from "@/components/ui/back-to-top";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { TestimonialCarousel } from "@/components/ui/testimonial-carousel";
import { Check, ChevronRight, Clock, Mail, Phone } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from "react";

export default function HomePage() {
  const router = useRouter();
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Handle scroll for parallax effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="min-h-screen">
      {/* Hero Section with Video Background */}
      <section
        ref={heroRef}
        className="relative h-[90vh] bg-gradient-to-r from-gray-900 to-gray-800 overflow-hidden"
      >
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="object-cover w-full h-full"
            poster="/images/shed-1.jpg"
          >
            <source src="https://player.vimeo.com/external/370331493.sd.mp4?s=e90dcaba73c19e0e36f03406b47bbd6992dd6c1c&profile_id=139&oauth2_token_id=57447761" type="video/mp4" />
            {/* Fallback image */}
            <Image
              src="/images/shed-1.jpg"
              alt="Concrete work"
              fill
              className="object-cover"
              priority
            />
          </video>
          <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* Hero Content with Parallax Effect */}
        <div
          className="relative container mx-auto px-4 h-full flex items-center"
          style={{
            transform: `translateY(${scrollY * 0.2}px)`,
            opacity: 1 - (scrollY * 0.001)
          }}
        >
          <div className="max-w-2xl text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
              Transform Your Space With Quality Concrete Solutions
            </h1>
            <p className="text-xl mb-8 text-gray-200 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
              Professional concrete services for residential and commercial projects.
              Delivering excellence in every pour.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
              <Button
                size="lg"
                className="bg-orange-500 hover:bg-orange-600"
                onClick={() => router.push('/contact')}
              >
                Get a Free Quote
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white/20"
                onClick={() => router.push('/gallery')}
              >
                View Our Work
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 rounded-full border-2 border-white flex items-start justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Services Overview with Parallax */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
        {/* Parallax Background Elements */}
        <div
          className="absolute top-0 right-0 w-96 h-96 bg-orange-500/5 rounded-full -translate-y-1/2 translate-x-1/2"
          style={{ transform: `translate(50%, -50%) translateY(${scrollY * 0.05}px)` }}
        ></div>
        <div
          className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500/5 rounded-full translate-y-1/2 -translate-x-1/2"
          style={{ transform: `translate(-50%, 50%) translateY(${scrollY * -0.03}px)` }}
        ></div>
        <div className="container mx-auto px-4">

          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Services</h2>
            <p className="text-gray-600">
              From driveways to foundations, we provide comprehensive concrete solutions
              tailored to your needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Residential Excellence",
                description: "Transform your property with premium concrete solutions. From stunning driveways to entertainment areas, we create spaces that blend beauty with durability.",
                image: '/images/driveway.jpg'
              },
              {
                title: "Commercial & Industrial",
                description: "Robust concrete solutions for businesses. We deliver high-performance flooring and foundations that stand up to the demands of commercial use.",
                image: '/images/rest-2.jpg'
              },
              {
                title: "Architectural Restoration",
                description: "Breathe new life into heritage structures. Our specialized restoration services preserve the character of your building while ensuring structural integrity.",
                image: '/images/rest-1.jpg'
              }
            ].map((service, index) => (
              <Card key={index} className="group hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="relative h-48 mb-4 rounded-md overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardTitle>{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="ghost"
                    className="group-hover:translate-x-2 transition-transform"
                    onClick={() => router.push(`/services#${service.title.toLowerCase().replace(/\s+/g, '-')}`)}
                  >
                    Learn More <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <TestimonialCarousel />
      </section>

      {/* Why Choose Us with Parallax */}
      <section className="py-24 relative overflow-hidden">
        {/* Parallax Background Elements */}
        <div
          className="absolute top-1/2 right-0 w-80 h-80 bg-orange-500/5 rounded-full translate-y-1/2 translate-x-1/2"
          style={{ transform: `translate(50%, 50%) translateY(${scrollY * -0.04}px)` }}
        ></div>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Why Choose Us?</h2>
              <div className="space-y-4">
                {[
                  'Licensed and fully insured',
                  '20+ years of experience',
                  'Premium quality materials',
                  'On-time project completion',
                  'Competitive pricing',
                  'Professional team'
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="bg-green-100 rounded-full p-1">
                      <Check className="h-5 w-5 text-green-600" />
                    </div>
                    <span className="text-lg">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden" >
              <Image
                src="/images/stencil-1.jpg"
                alt="Paul Rudd Concreting logo"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section with Micro-interactions */}
      <section className="bg-gray-50 dark:bg-gray-900 py-24 relative overflow-hidden">
        {/* Parallax Background Elements */}
        <div
          className="absolute top-0 left-1/4 w-72 h-72 bg-orange-500/5 rounded-full -translate-y-1/2"
          style={{ transform: `translateY(-50%) translateY(${scrollY * 0.06}px)` }}
        ></div>
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Ready to Start Your Project?</CardTitle>
              <CardDescription className="text-center">
                Contact us today for a free consultation and quote
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex items-center gap-4 group hover:bg-gray-100 dark:hover:bg-gray-800 p-3 rounded-lg transition-all duration-300">
                  <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-full group-hover:scale-110 transition-transform duration-300">
                    <Phone className="h-6 w-6 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Call Us</h3>
                    <p className="text-gray-600 dark:text-gray-400">0400 000 000</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 group hover:bg-gray-100 dark:hover:bg-gray-800 p-3 rounded-lg transition-all duration-300">
                  <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-full group-hover:scale-110 transition-transform duration-300">
                    <Mail className="h-6 w-6 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-gray-600 dark:text-gray-400">info@paulrudd.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 group hover:bg-gray-100 dark:hover:bg-gray-800 p-3 rounded-lg transition-all duration-300">
                  <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-full group-hover:scale-110 transition-transform duration-300">
                    <Clock className="h-6 w-6 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Hours</h3>
                    <p className="text-gray-600 dark:text-gray-400">Mon-Fri: 7am-5pm</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      <BackToTop />
    </main>
  );
}
