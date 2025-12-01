import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ExternalLink, Instagram, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import portfolioLayout1 from "@/assets/portfolio-layout-1.jpg";
import portfolioCover1 from "@/assets/portfolio-cover-1.jpg";
import portfolioLayout2 from "@/assets/portfolio-layout-2.jpg";
import portfolioShowcase from "@/assets/portfolio-showcase.jpg";
import portfolioCoverBanner from "@/assets/portfolio-cover-banner.jpg";
import portfolioCover2 from "@/assets/portfolio-cover-2.jpg";
import portfolioAesthetic from "@/assets/portfolio-aesthetic.jpg";
import portfolioBookIslam from "@/assets/portfolio-book-islam.jpg";
import portfolioTeam from "@/assets/portfolio-team.jpg";

interface PortfolioItem {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  category: string;
  youtube_url: string | null;
  instagram_url: string | null;
  featured: boolean;
}

const Portfolio = () => {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Static fallback images
  const staticImages = [
    {
      src: portfolioTeam,
      alt: "KBM Kreator Yogyakarta - Tim Profesional Jasa Desain Cover dan Layout Buku",
      category: "company",
      featured: true
    },
    {
      src: portfolioCoverBanner,
      alt: "Jasa Desain Cover Buku Profesional KBM Kreator sejak 2017",
      category: "banner",
      featured: true
    },
    {
      src: portfolioCover2,
      alt: "Portfolio Desain Cover Buku Premium - Pediatric Medical Books",
      category: "cover"
    },
    {
      src: portfolioShowcase,
      alt: "Portfolio Desain Cover Buku - Teh Bayam Merah, Cerminan Aisyiyah, dan lainnya",
      category: "cover"
    },
    {
      src: portfolioCover1,
      alt: "Desain Cover Buku Kalkulus dan Buku Akademik Profesional",
      category: "cover"
    },
    {
      src: portfolioLayout1,
      alt: "Jasa Layout Naskah Buku Profesional - KBM Kreator Yogyakarta",
      category: "layout",
      featured: true
    },
    {
      src: portfolioLayout2,
      alt: "Contoh Layout Buku Interior Profesional dengan Typography Berkualitas",
      category: "layout"
    },
    {
      src: portfolioAesthetic,
      alt: "Aesthetic Book Photography - Portfolio Desain Cover Buku Novels, Poetry, Textbooks",
      category: "photo"
    },
    {
      src: portfolioBookIslam,
      alt: "Desain Cover Buku Sejarah Pemikiran Islam - Buku Agama Profesional",
      category: "cover"
    }
  ];

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    try {
      const { data, error } = await supabase
        .from("portfolio_items")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;
      setPortfolioItems(data || []);
    } catch (error) {
      console.error("Error fetching portfolio:", error);
    } finally {
      setLoading(false);
    }
  };

  // Use database items if available, otherwise fallback to static
  const items = portfolioItems.length > 0 ? portfolioItems : staticImages.map((img, idx) => ({
    id: `static-${idx}`,
    title: img.alt,
    description: null,
    image_url: img.src,
    category: img.category,
    youtube_url: null,
    instagram_url: null,
    featured: img.featured || false
  }));

  const featuredItems = items.filter(item => item.featured);
  const coverItems = items.filter(item => item.category === "cover");
  const layoutItems = items.filter(item => item.category === "layout");
  const aestheticItems = items.filter(item => item.category === "aesthetic" || item.category === "photo");

  return (
    <section id="portfolio" className="py-12 sm:py-16 md:py-24 px-[7px] sm:px-4 bg-gradient-to-b from-muted/10 via-background to-muted/10">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-10 sm:mb-12 md:mb-16 space-y-3 sm:space-y-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
            Portfolio Karya Kami
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Ratusan penerbit telah mempercayai kami untuk desain cover, layout buku, dan layanan kreatif profesional
          </p>
        </div>

        {loading && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Memuat portfolio...</p>
          </div>
        )}

        {!loading && (
          <>
            {/* Featured Section */}
            {featuredItems.length > 0 && (
              <div id="portfolio-grid" className="mb-10 sm:mb-12 md:mb-16">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-foreground">Tim & Layanan Kami</h3>
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                  {featuredItems.map((item) => (
                    <div 
                      key={item.id}
                      className="relative group overflow-hidden rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-gradient-to-br from-muted/30 via-muted/20 to-muted/10 border border-border/30"
                    >
                      <div className="w-full min-h-[300px] sm:min-h-[400px] flex items-center justify-center p-4 sm:p-6">
                      <img 
                        src={item.image_url} 
                        alt={item.title}
                          className="max-w-full max-h-[500px] w-auto h-auto object-contain transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
                          {item.description && (
                            <p className="text-sm sm:text-base mb-2">{item.description}</p>
                          )}
                          {(item.youtube_url || item.instagram_url) && (
                            <div className="flex gap-3 mt-3">
                              {item.youtube_url && (
                                <a
                                  href={item.youtube_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs sm:text-sm flex items-center gap-1.5 hover:underline bg-white/20 px-3 py-1.5 rounded-full backdrop-blur-sm transition-all hover:bg-white/30"
                                >
                                  <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                                  YouTube
                                </a>
                              )}
                              {item.instagram_url && (
                                <a
                                  href={item.instagram_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs sm:text-sm flex items-center gap-1.5 hover:underline bg-white/20 px-3 py-1.5 rounded-full backdrop-blur-sm transition-all hover:bg-white/30"
                                >
                                  <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                                  Instagram
                                </a>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Cover Design Portfolio */}
            {coverItems.length > 0 && (
              <div className="mb-10 sm:mb-12 md:mb-16">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-foreground">Desain Cover Buku Premium</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
                  {coverItems.map((item) => (
                    <div 
                      key={item.id}
                      className="relative group overflow-hidden rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-gradient-to-br from-primary/10 via-muted/20 to-secondary/10 border border-border/30"
                    >
                      <div className="w-full min-h-[350px] sm:min-h-[400px] flex items-center justify-center p-4 sm:p-6">
                      <img 
                        src={item.image_url} 
                        alt={item.title}
                          className="max-w-full max-h-[500px] w-auto h-auto object-contain transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                        <div className="p-4 sm:p-5 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 w-full">
                          <p className="text-sm sm:text-base font-semibold">{item.description || "Desain Cover Premium"}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Layout Portfolio */}
            {layoutItems.length > 0 && (
              <div className="mb-10 sm:mb-12 md:mb-16">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-foreground">Layout Naskah Profesional</h3>
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                  {layoutItems.map((item) => (
                    <div 
                      key={item.id}
                      className="relative group overflow-hidden rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-gradient-to-br from-secondary/10 via-muted/20 to-primary/10 border border-border/30"
                    >
                      <div className="w-full min-h-[300px] sm:min-h-[400px] flex items-center justify-center p-4 sm:p-6">
                      <img 
                        src={item.image_url} 
                        alt={item.title}
                          className="max-w-full max-h-[500px] w-auto h-auto object-contain transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                        <div className="p-4 sm:p-5 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 w-full">
                          <p className="text-sm sm:text-base font-semibold">{item.description || "Layout Typography Berkualitas"}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Aesthetic Photography */}
            {aestheticItems.length > 0 && (
              <div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-foreground">Fotografi Produk Estetik</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
                  {aestheticItems.map((item) => (
                    <div 
                      key={item.id}
                      className="relative group overflow-hidden rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-gradient-to-br from-muted/30 via-muted/20 to-muted/10 border border-border/30"
                    >
                      <div className="w-full min-h-[300px] sm:min-h-[350px] flex items-center justify-center p-4 sm:p-6">
                      <img 
                        src={item.image_url} 
                        alt={item.title}
                          className="max-w-full max-h-[400px] w-auto h-auto object-contain transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        <div className="text-center mt-10 sm:mt-12">
          <p className="text-base sm:text-lg font-semibold text-foreground">Cek portofolio lebih detail pada akun di bawah ini</p>
          <div className="flex justify-center gap-3 sm:gap-4 mt-3">
            <a
              href="https://www.instagram.com/kbmkreatoryogyakarta/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
            <a
              href="https://www.tiktok.com/@kbm.kreator.yogya"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/90 flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg"
              aria-label="TikTok"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
              </svg>
            </a>
            <a
              href="https://www.youtube.com/@kbmkreator"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-red-600 text-white hover:bg-red-700 flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg"
              aria-label="YouTube"
            >
              <Youtube className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
          </div>
          <div className="flex justify-center mt-4">
            <Button asChild size="lg" variant="secondary" className="rounded-full">
              <a href="#portfolio-grid">Lihat Portofolio</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
