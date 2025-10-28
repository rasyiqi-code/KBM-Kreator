import { BookOpen, Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-muted/30 border-t border-border/50">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-6 md:mb-8">
          <div className="sm:col-span-2">
            <div className="flex items-center gap-2 mb-3 md:mb-4">
              <BookOpen className="w-6 h-6 md:w-8 md:h-8 text-primary" />
              <div>
                <h3 className="font-bold text-base md:text-lg text-foreground">KBM Kreator</h3>
                <p className="text-xs md:text-sm text-muted-foreground">Penerbit KBM Indonesia Group</p>
              </div>
            </div>
            <p className="text-sm md:text-base text-muted-foreground mb-3 md:mb-4">
              Partner kreatif terpercaya untuk mewujudkan karya terbaik Anda sejak 2017.
            </p>
            <div className="flex gap-2 md:gap-3">
              <a href="#" className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors">
                <Facebook className="w-4 h-4 md:w-5 md:h-5 text-primary" />
              </a>
              <a href="#" className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors">
                <Instagram className="w-4 h-4 md:w-5 md:h-5 text-primary" />
              </a>
              <a href="#" className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors">
                <Twitter className="w-4 h-4 md:w-5 md:h-5 text-primary" />
              </a>
              <a href="#" className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors">
                <Youtube className="w-4 h-4 md:w-5 md:h-5 text-primary" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-sm md:text-base text-foreground mb-3 md:mb-4">Layanan</h4>
            <ul className="space-y-1.5 md:space-y-2 text-sm md:text-base text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors inline-block">Desain Cover & Layout</a></li>
              <li><a href="#" className="hover:text-primary transition-colors inline-block">Ghost Writing</a></li>
              <li><a href="#" className="hover:text-primary transition-colors inline-block">Video Promosi</a></li>
              <li><a href="#" className="hover:text-primary transition-colors inline-block">Mockup Buku</a></li>
              <li><a href="#" className="hover:text-primary transition-colors inline-block">Desain Grafis</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-sm md:text-base text-foreground mb-3 md:mb-4">Informasi</h4>
            <ul className="space-y-1.5 md:space-y-2 text-sm md:text-base text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors inline-block">Tentang Kami</a></li>
              <li><a href="#" className="hover:text-primary transition-colors inline-block">Portfolio</a></li>
              <li><a href="#" className="hover:text-primary transition-colors inline-block">Testimoni</a></li>
              <li><a href="#" className="hover:text-primary transition-colors inline-block">Blog</a></li>
              <li><a href="#" className="hover:text-primary transition-colors inline-block">Kontak</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border/50 pt-6 md:pt-8 text-center text-xs md:text-sm text-muted-foreground">
          <p>&copy; {currentYear} KBM Kreator Yogyakarta - Penerbit KBM Indonesia Group. All rights reserved.</p>
          <p className="mt-1.5 md:mt-2">Paingan, Maguwoharjo, Depok, Sleman, DI Yogyakarta</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
