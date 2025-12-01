import { BookOpen, Instagram } from "lucide-react";
const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-muted/40 border-t border-border/50 backdrop-blur-sm">
      <div className="container mx-auto px-[7px] sm:px-4 py-10 sm:py-12 md:py-16 max-w-6xl">
        <div className="max-w-3xl mx-auto mb-8 sm:mb-10 md:mb-12">
          <div className="text-center space-y-4 sm:space-y-5">
            
            
            <div className="flex items-center justify-center gap-3 mb-4 sm:mb-5">
              <div className="p-2 sm:p-3 rounded-xl bg-primary/10">
                <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-lg sm:text-xl md:text-2xl text-foreground">KBM Kreator</h3>
                <p className="text-xs sm:text-sm md:text-base text-muted-foreground">Mitra Penerbit Buku di Indonesia</p>
              </div>
            </div>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Partner kreatif terpercaya untuk mewujudkan karya terbaik Anda sejak 2017.
            </p>
            <div className="hidden">
              <a 
                href="https://www.instagram.com/kbmkreatoryogyakarta/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </a>
              <a 
                href="https://www.tiktok.com/@kbm.kreator.yogya" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg"
                aria-label="TikTok"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>
              <a 
                href="https://wa.me/6281357555797" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg"
                aria-label="WhatsApp"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border/50 pt-6 sm:pt-8 text-center space-y-2">
          <p className="text-xs sm:text-sm text-muted-foreground">
            &copy; {currentYear} KBM Kreator Yogyakarta. All rights reserved.
          </p>
          <p className="text-xs sm:text-sm text-muted-foreground/80">
            Paingan, Maguwoharjo, Depok, Sleman, DI Yogyakarta
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
