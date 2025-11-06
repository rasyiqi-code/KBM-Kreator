import portfolioLayout1 from "@/assets/portfolio-layout-1.jpg";
import portfolioCover1 from "@/assets/portfolio-cover-1.jpg";
import portfolioLayout2 from "@/assets/portfolio-layout-2.jpg";
import portfolioShowcase from "@/assets/portfolio-showcase.jpg";
import portfolioCoverBanner from "@/assets/portfolio-cover-banner.jpg";
import portfolioCover2 from "@/assets/portfolio-cover-2.jpg";
import portfolioAesthetic from "@/assets/portfolio-aesthetic.jpg";
import portfolioBookIslam from "@/assets/portfolio-book-islam.jpg";
import portfolioTeam from "@/assets/portfolio-team.jpg";

const Portfolio = () => {
  const portfolioImages = [
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

  const featuredImages = portfolioImages.filter(img => img.featured);
  const coverImages = portfolioImages.filter(img => img.category === "cover");
  const layoutImages = portfolioImages.filter(img => img.category === "layout");
  const otherImages = portfolioImages.filter(img => img.category === "photo");

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

        {/* Featured Section - Full Width Banner */}
        <div className="mb-8 md:mb-12">
          <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-foreground">Tim & Layanan Kami</h3>
          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            {featuredImages.map((image, index) => (
              <div 
                key={index}
                className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <img 
                  src={image.src} 
                  alt={image.alt}
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </div>

        {/* Cover Design Portfolio */}
        <div className="mb-8 md:mb-12">
          <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-foreground">Desain Cover Buku Premium</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {coverImages.map((image, index) => (
              <div 
                key={index}
                className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <img 
                  src={image.src} 
                  alt={image.alt}
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-sm font-semibold">Desain Cover Premium</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Layout Portfolio */}
        <div className="mb-8 md:mb-12">
          <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-foreground">Layout Naskah Profesional</h3>
          <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
            {layoutImages.map((image, index) => (
              <div 
                key={index}
                className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <img 
                  src={image.src} 
                  alt={image.alt}
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-secondary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-sm font-semibold">Layout Typography Berkualitas</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Aesthetic Photography */}
        {otherImages.length > 0 && (
          <div>
            <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-foreground">Fotografi Produk Estetik</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {otherImages.map((image, index) => (
                <div 
                  key={index}
                  className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                >
                  <img 
                    src={image.src} 
                    alt={image.alt}
                    className="w-full h-auto object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;
