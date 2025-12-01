import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen } from "lucide-react";

interface HeroContent {
  badge: string;
  heading: string;
  subheading1: string;
  subheading2: string;
  cta1_text: string;
  cta2_text: string;
}

const Hero = () => {
  const [content, setContent] = useState<HeroContent>({
    badge: "Professional sejak 2017",
    heading: "Jasa Desain Layout, Pembuatan Sampul, Cetak Buku, Album Foto & Pdf",
    subheading1: "KBM Kreator Yogyakarta berani memberikan klaim garansi sebesar Rp 5.000.000 per naskah",
    subheading2: "Mitra & Partner terbaik untuk perusahaan Penerbit Buku di Indonesia",
    cta1_text: "Mulai Proyek Anda",
    cta2_text: "Lihat Portfolio",
  });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    const { data, error } = await supabase
      .from("site_content")
      .select("content")
      .eq("section", "hero")
      .single();

    if (!error && data?.content) {
      setContent(data.content as unknown as HeroContent);
    }
  };

  return (
    <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/10 via-background via-50% to-secondary/10 px-[7px] sm:px-4 py-12 sm:py-16 md:py-20">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse animation-delay-200"></div>
      
      <div className="container mx-auto relative z-10 max-w-6xl">
        <div className="max-w-5xl mx-auto text-center space-y-6 sm:space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/30 mb-2 sm:mb-4 animate-fade-in shadow-lg">
            <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            <span className="text-xs sm:text-sm font-semibold text-white">{content.badge}</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 text-foreground leading-tight animate-fade-in-up">
            <span className="bg-gradient-to-r from-foreground via-foreground to-foreground/80 bg-clip-text text-transparent">
            {content.heading}
            </span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-4 sm:mb-6 max-w-3xl mx-auto animate-fade-in-up animation-delay-200 leading-relaxed">
            {content.subheading1}
          </p>
          
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground/90 mb-8 sm:mb-10 md:mb-12 max-w-3xl mx-auto animate-fade-in-up animation-delay-300 leading-relaxed">
            {content.subheading2}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center animate-fade-in-up animation-delay-400">
            <Button 
              asChild
              size="lg" 
              variant="outline" 
              className="w-full sm:w-auto min-h-[52px] sm:min-h-[56px] text-base sm:text-lg px-8 sm:px-10 border-2 hover:bg-primary/5 transition-all duration-300 hover:scale-105"
            >
              <a 
                href="#portfolio"
                onClick={(e) => { e.preventDefault(); document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' }); }}
              >
                {content.cta2_text}
              </a>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Smooth gradient transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 md:h-40 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none"></div>
    </section>
  );
};

export default Hero;
