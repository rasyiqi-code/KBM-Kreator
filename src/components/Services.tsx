import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import * as LucideIcons from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
}

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .eq("active", true)
      .order("display_order");

    if (!error && data) {
      setServices(data);
    }
  };

  const getIcon = (iconName: string) => {
    const Icon = (LucideIcons as any)[iconName];
    return Icon || LucideIcons.Star;
  };

  return (
    <section className="py-12 md:py-20 px-4 bg-muted/30">
      <div className="container mx-auto px-px">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4 text-foreground">
            Layanan Jasa Desain & Penerbitan Buku
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Jasa profesional untuk desain cover, layout, ghost writing, video promosi, mockup buku 3D, dan penerbitan ISBN
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {services.map((service) => {
            const ServiceIcon = getIcon(service.icon);
            
            return (
              <Card
                key={service.id}
                className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/30 hover:-translate-y-1"
              >
                <CardContent className="p-5 md:p-6">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform">
                    <ServiceIcon className="w-6 h-6 md:w-7 md:h-7 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-slate-950">
                    {service.title}
                  </h3>
                  <p className="text-sm md:text-base leading-relaxed text-slate-950">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
