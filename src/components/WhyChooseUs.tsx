import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import * as LucideIcons from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Benefit {
  id: string;
  icon: string;
  title: string;
  description: string;
}

const WhyChooseUs = () => {
  const [benefits, setBenefits] = useState<Benefit[]>([]);

  useEffect(() => {
    fetchBenefits();
  }, []);

  const fetchBenefits = async () => {
    const { data, error } = await supabase
      .from("benefits")
      .select("*")
      .eq("active", true)
      .order("display_order");

    if (!error && data) {
      setBenefits(data);
    }
  };

  const getIcon = (iconName: string) => {
    const Icon = (LucideIcons as any)[iconName];
    return Icon || LucideIcons.Star;
  };

  return (
    <section className="py-12 md:py-20 px-4 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container mx-auto px-px">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4 text-foreground">
            Mengapa Memilih Kami?
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Komitmen kami adalah kesuksesan karya Anda
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 gap-4 md:gap-6 max-w-5xl mx-auto">
          {benefits.map((benefit) => {
            const BenefitIcon = getIcon(benefit.icon);
            
            return (
              <Card
                key={benefit.id}
                className="border-border/50 hover:border-secondary/50 transition-all duration-300 hover:shadow-lg"
              >
                <CardContent className="p-5 md:p-6 flex gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-br from-secondary to-secondary/80 flex items-center justify-center flex-shrink-0">
                    <BenefitIcon className="w-5 h-5 md:w-6 md:h-6 text-secondary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg font-bold mb-1.5 md:mb-2 text-slate-950">
                      {benefit.title}
                    </h3>
                    <p className="text-sm md:text-base text-stone-900">
                      {benefit.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
