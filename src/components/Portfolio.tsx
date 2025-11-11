import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ExternalLink } from "lucide-react";
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
    <section className="py-12 md:py-20 px-4 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4 text-foreground">
            Portfolio Karya Kami
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
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
              <div className="mb-8 md:mb-12">
                <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-foreground">Tim & Layanan Kami</h3>
                <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                  {featuredItems.map((item) => (
                    <div 
                      key={item.id}
                      className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
                    >
                      <img 
                        src={item.image_url} 
                        alt={item.title}
                        className="w-full h-auto object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-4 left-4 right-4 text-white">
                          {item.description && (
                            <p className="text-sm">{item.description}</p>
                          )}
                          {(item.youtube_url || item.instagram_url) && (
                            <div className="flex gap-2 mt-2">
                              {item.youtube_url && (
                                <a
                                  href={item.youtube_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs flex items-center gap-1 hover:underline"
                                >
                                  <ExternalLink className="w-3 h-3" />
                                  YouTube
                                </a>
                              )}
                              {item.instagram_url && (
                                <a
                                  href={item.instagram_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs flex items-center gap-1 hover:underline"
                                >
                                  <ExternalLink className="w-3 h-3" />
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
              <div className="mb-8 md:mb-12">
                <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-foreground">Desain Cover Buku Premium</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {coverItems.map((item) => (
                    <div 
                      key={item.id}
                      className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                    >
                      <img 
                        src={item.image_url} 
                        alt={item.title}
                        className="w-full h-auto object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                        <div className="p-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          <p className="text-sm font-semibold">{item.description || "Desain Cover Premium"}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Layout Portfolio */}
            {layoutItems.length > 0 && (
              <div className="mb-8 md:mb-12">
                <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-foreground">Layout Naskah Profesional</h3>
                <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
                  {layoutItems.map((item) => (
                    <div 
                      key={item.id}
                      className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                    >
                      <img 
                        src={item.image_url} 
                        alt={item.title}
                        className="w-full h-auto object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-secondary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                        <div className="p-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          <p className="text-sm font-semibold">{item.description || "Layout Typography Berkualitas"}</p>
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
                <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-foreground">Fotografi Produk Estetik</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {aestheticItems.map((item) => (
                    <div 
                      key={item.id}
                      className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                    >
                      <img 
                        src={item.image_url} 
                        alt={item.title}
                        className="w-full h-auto object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Portfolio;
