import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ExternalLink } from "lucide-react";

interface PromoItem {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  link_url: string | null;
  active: boolean;
  display_order: number;
}

const Promo = () => {
  const [promoItems, setPromoItems] = useState<PromoItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPromo();
  }, []);

  const fetchPromo = async () => {
    try {
      const { data, error } = await supabase
        .from("promo_items")
        .select("*")
        .eq("active", true)
        .order("display_order", { ascending: true });

      if (error) {
        console.error("Error fetching promo:", error);
        // Log error details for debugging
        console.error("Error details:", {
          message: error.message,
          details: error.details,
          hint: error.hint,
        });
        throw error;
      }
      
      console.log("Promo items fetched:", data?.length || 0);
      setPromoItems((data || []) as PromoItem[]);
    } catch (error) {
      console.error("Error fetching promo:", error);
      // Set empty array on error to prevent infinite loading
      setPromoItems([]);
    } finally {
      setLoading(false);
    }
  };

  // Show nothing while loading (to prevent flash)
  if (loading) {
    return null;
  }

  // Show nothing if no promo items (this is expected behavior)
  if (promoItems.length === 0) {
    return null;
  }

  return (
    <section className="py-12 sm:py-16 md:py-24 px-[7px] sm:px-4 bg-gradient-to-b from-muted/10 via-background to-muted/10">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-10 sm:mb-12 md:mb-16 space-y-3 sm:space-y-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
            Promo & Penawaran Spesial
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Dapatkan penawaran menarik untuk layanan desain dan penerbitan buku Anda
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
          {promoItems.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-border/50 bg-gradient-to-br from-muted/30 via-muted/20 to-muted/10"
            >
              {item.link_url ? (
                <a
                  href={item.link_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="w-full min-h-[250px] sm:min-h-[300px] flex items-center justify-center p-4 sm:p-6">
                  <img
                    src={item.image_url}
                    alt={item.title}
                      className="max-w-full max-h-[400px] w-auto h-auto object-contain transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 md:p-8 text-white">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3">{item.title}</h3>
                      {item.description && (
                        <p className="text-sm sm:text-base opacity-90 mb-4">{item.description}</p>
                      )}
                      <div className="flex items-center gap-2 text-sm sm:text-base font-medium bg-white/20 px-4 py-2 rounded-full w-fit backdrop-blur-sm hover:bg-white/30 transition-colors">
                        <span>Lihat Detail</span>
                        <ExternalLink className="w-4 h-4 sm:w-5 sm:h-4" />
                      </div>
                    </div>
                  </div>
                </a>
              ) : (
                <>
                  <div className="w-full min-h-[250px] sm:min-h-[300px] flex items-center justify-center p-4 sm:p-6">
                  <img
                    src={item.image_url}
                    alt={item.title}
                      className="max-w-full max-h-[400px] w-auto h-auto object-contain transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 md:p-8 text-white">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3">{item.title}</h3>
                      {item.description && (
                        <p className="text-sm sm:text-base opacity-90">{item.description}</p>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Promo;

