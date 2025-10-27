import { BookOpen, Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-muted/30 border-t border-border/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-8 h-8 text-primary" />
              <div>
                <h3 className="font-bold text-lg text-foreground">KBM Kreator</h3>
                <p className="text-sm text-muted-foreground">Penerbit KBM Indonesia Group</p>
              </div>
            </div>
            <p className="text-muted-foreground mb-4">
              Partner kreatif terpercaya untuk mewujudkan karya terbaik Anda sejak 2017.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors">
                <Facebook className="w-5 h-5 text-primary" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors">
                <Instagram className="w-5 h-5 text-primary" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors">
                <Twitter className="w-5 h-5 text-primary" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors">
                <Youtube className="w-5 h-5 text-primary" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-foreground mb-4">Layanan</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Desain Cover & Layout</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Ghost Writing</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Video Promosi</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Mockup Buku</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Desain Grafis</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-foreground mb-4">Informasi</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Tentang Kami</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Portfolio</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Testimoni</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Kontak</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border/50 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} KBM Kreator Yogyakarta - Penerbit KBM Indonesia Group. All rights reserved.</p>
          <p className="mt-2">Paingan, Maguwoharjo, Depok, Sleman, DI Yogyakarta</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
