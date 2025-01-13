import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Check, ChevronRight, Clock, Mail, Phone } from 'lucide-react';
import Image from 'next/image';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="absolute inset-0 bg-black/50" />
        <Image
          src="/images/shed-1.jpg"
          alt="Concrete work"
          fill
          className="object-cover"
          priority
        />
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <h1 className="text-5xl font-bold mb-6">
              Transform Your Space With Quality Concrete Solutions
            </h1>
            <p className="text-xl mb-8 text-gray-200">
              Professional concrete services for residential and commercial projects.
              Delivering excellence in every pour.
            </p>
            <div className="flex gap-4">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
                Get a Free Quote
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-black border-white hover:bg-white/90">
                View Our Work
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-24 bg-gray-50">
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
                title: "Driveways & Paths",
                description: "Custom designed driveways that enhance your property's appeal and functionality.",
                image: '/images/driveway.jpg'
              },
              {
                title: "Concrete Slabs",
                description: "Precision-engineered concrete slabs for commercial and residential projects.",
                image: '/images/slab.jpg'
              },
              {
                title: "Decorative Concrete",
                description: "Beautiful and durable decorative concrete solutions for any space.",
                image: '/images/decorative.jpg'
              }
            ].map((service, index) => (
              <Card key={index} className="group hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="h-48 bg-gray-200 mb-4 rounded-md" />
                  <CardTitle>{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="ghost" className="group-hover:translate-x-2 transition-transform">
                    Learn More <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24">
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
            <div className="bg-gray-200 h-96 rounded-lg" /> {/* Placeholder for image */}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-gray-50 py-24">
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
                <div className="flex items-center gap-4">
                  <Phone className="h-6 w-6 text-orange-500" />
                  <div>
                    <h3 className="font-semibold">Call Us</h3>
                    <p className="text-gray-600">0400 000 000</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Mail className="h-6 w-6 text-orange-500" />
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-gray-600">info@paulrudd.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Clock className="h-6 w-6 text-orange-500" />
                  <div>
                    <h3 className="font-semibold">Hours</h3>
                    <p className="text-gray-600">Mon-Fri: 7am-5pm</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}