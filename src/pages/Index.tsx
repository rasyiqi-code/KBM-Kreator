import { lazy, Suspense } from "react";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

// Lazy load main sections for code splitting
const Hero = lazy(() => import("@/components/Hero"));
const About = lazy(() => import("@/components/About"));
const Portfolio = lazy(() => import("@/components/Portfolio"));
const Promo = lazy(() => import("@/components/Promo"));

// Loading component for sections
const SectionLoader = () => (
  <div className="flex items-center justify-center py-12 min-h-[400px]">
    <div className="text-center">
      <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 mb-3">
        <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
      <p className="text-sm text-muted-foreground">Memuat...</p>
    </div>
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen">
      <Suspense fallback={<SectionLoader />}>
        <Hero />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <About />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Portfolio />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Promo />
      </Suspense>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default Index;
