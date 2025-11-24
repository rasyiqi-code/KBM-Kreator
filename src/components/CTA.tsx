import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-16 sm:py-20 md:py-24 px-[7px] sm:px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center space-y-8 sm:space-y-10">
          <div className="space-y-4 sm:space-y-5">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              Hubungi KBM Kreator Indonesia
            </h2>
          </div>
          
          <div className="flex justify-center">
            <Button 
              size="lg" 
              className="group min-h-[56px] sm:min-h-[60px] text-base sm:text-lg px-8 sm:px-12 md:px-16 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
            >
              Dapatkan Promo
              <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
export default CTA;