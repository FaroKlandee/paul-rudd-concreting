'use client';

import { CalculatorSection } from "@/components/sections/calculator-section";
import { ContactSection } from "@/components/sections/contact-section";
import { GallerySection } from "@/components/sections/gallery-section";
import { HomeSection } from "@/components/sections/home-section";
import { BackToTop } from "@/components/ui/back-to-top";
import { scrollToHashSection, scrollToSection } from "@/lib/scroll-utils";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";


export default function HomePage() {
  const router = useRouter();
  const headerHeight = 90; // Height of the fixed header in pixels

  // Reference to track if this is the first render
  const isFirstRender = useRef(true);

  // Handle navigation between sections
  const handleNavigate = (sectionId: string) => {
    scrollToSection(sectionId, headerHeight);
  };

  // Handle navigation to models page (separate page)
  const handleNavigateToModels = () => {
    router.push('/models');
  };

  // Handle hash-based navigation on initial load
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      scrollToHashSection(headerHeight);
    }

    // Handle browser back/forward navigation
    const handleHashChange = () => {
      scrollToHashSection(headerHeight);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [headerHeight]);

  return (
    <main className="min-h-screen">
      {/* All sections combined into a single page with improved spacing */}
      <div className="mb-8">
        <HomeSection onNavigate={handleNavigate} />
      </div>

      <div className="mb-16">
        <CalculatorSection />
      </div>

      <div className="mb-16">
        <ContactSection />
      </div>

      <div>
        <GallerySection />
      </div>

      <BackToTop />
    </main>
  );
}
