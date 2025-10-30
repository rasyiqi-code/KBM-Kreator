import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen } from "lucide-react";
const Hero = () => {
  return <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5 px-4 py-16 md:py-20">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="container mx-auto relative z-10 py-0 px-0">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-primary-light/20 border border-primary/20 mb-4 md:mb-6 animate-fade-in">
            <BookOpen className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary" />
            <span className="text-xs md:text-sm font-medium text-primary">Jasa Desain & Penerbitan Buku Profesional</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 text-foreground animate-fade-in-up">
            Jasa Desain Cover Buku & Ghost Writing Yogyakarta
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-6 md:mb-8 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
            KBM Kreator - Layanan Layout Buku, Video Promosi & Mockup Profesional
          </p>
          
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-8 md:mb-10 max-w-3xl mx-auto animate-fade-in-up animation-delay-300">
            Jasa desain cover buku, layout buku profesional, ghost writer berpengalaman, video promosi buku menarik, dan mockup buku 3D realistis. Bagian dari Penerbit KBM Indonesia - Anggota IKAPI dengan 3000+ buku ber-ISBN
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center animate-fade-in-up animation-delay-400">
            <Button size="lg" className="w-full sm:w-auto min-h-[48px] text-base md:text-lg group">
              Mulai Proyek Anda
              <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto min-h-[48px] text-base md:text-lg">
              Lihat Portfolio
            </Button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-20 md:h-32 bg-gradient-to-t from-background to-transparent"></div>
    </section>;
};
export default Hero;