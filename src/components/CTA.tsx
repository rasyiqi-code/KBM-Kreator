import { Button } from "@/components/ui/button";
import { Mail, Phone, Globe } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-primary via-primary-dark to-secondary rounded-3xl p-12 text-primary-foreground shadow-2xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Siap Wujudkan Karya Impian Anda?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Konsultasikan proyek Anda dengan tim profesional kami. Mari bersama mewujudkan karya terbaik Anda!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <Button 
                size="lg" 
                variant="secondary"
                className="text-lg"
              >
                Hubungi Kami Sekarang
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="text-lg bg-white/10 border-white/30 hover:bg-white/20 text-white hover:text-white"
              >
                Lihat Katalog
              </Button>
            </div>
            
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center text-sm opacity-90">
              <a href="https://penerbitkbm.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:opacity-75 transition-opacity">
                <Globe className="w-4 h-4" />
                <span>penerbitkbm.com</span>
              </a>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>info@penerbitkbm.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+62 xxx xxxx xxxx</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
