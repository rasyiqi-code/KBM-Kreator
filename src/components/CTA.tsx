import { Button } from "@/components/ui/button";
import { Mail, Phone, Globe } from "lucide-react";
const CTA = () => {
  return <section className="py-12 md:py-20 px-4">
      <div className="container mx-auto px-px">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-primary via-primary-dark to-secondary rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-12 text-primary-foreground shadow-2xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-center">
              Siap Wujudkan Karya Impian Anda?
            </h2>
            <p className="text-base sm:text-lg md:text-xl mb-6 md:mb-8 opacity-90 text-center">
              Konsultasikan proyek Anda dengan tim profesional kami. Mari bersama mewujudkan karya terbaik Anda!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-8 md:mb-10">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto min-h-[48px] text-base md:text-lg">
                Hubungi Kami Sekarang
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto min-h-[48px] text-base md:text-lg bg-white/10 border-white/30 hover:bg-white/20 text-white hover:text-white">
                Lihat Katalog
              </Button>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center text-xs sm:text-sm opacity-90">
              <a href="https://penerbitkbm.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:opacity-75 transition-opacity">
                <Globe className="w-3.5 h-3.5 md:w-4 md:h-4" />
                <span>penerbitkbm.com</span>
              </a>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 md:w-4 md:h-4" />
                <span className="break-all sm:break-normal">info@penerbitkbm.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 md:w-4 md:h-4" />
                <span>+62 xxx xxxx xxxx</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default CTA;