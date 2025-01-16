import { Footer } from '@/components/ui/footer';
import { Header } from '@/components/ui/header';
import { NavigationEvents } from "@/components/ui/navigation-events";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Paul Rudd Concreting",
  description: "Best Concreter in Orange.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <NavigationEvents />
        {children}
        <Footer />
      </body>
    </html>
  );
}
