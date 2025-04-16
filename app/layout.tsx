import { ThemeProvider } from '@/components/theme-provider';
import { Chatbot } from '@/components/ui/chatbot';
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
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider defaultTheme="light" storageKey="orange-concrete-theme">
          <Header />
          <NavigationEvents />
          {children}
          <Footer />
          <Chatbot />
        </ThemeProvider>
      </body>
    </html>
  );
}
