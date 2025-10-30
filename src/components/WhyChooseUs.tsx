import { CheckCircle, Shield, RefreshCcw, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
const benefits = [{
  icon: Sparkles,
  title: "Royalti 100% untuk Penulis",
  description: "Kami percaya karya Anda adalah aset berharga. Dapatkan royalti penuh tanpa potongan"
}, {
  icon: Shield,
  title: "Garansi Hasil Cetakan",
  description: "Kepuasan Anda prioritas kami. Garansi kualitas hasil cetakan dan pelayanan profesional"
}, {
  icon: RefreshCcw,
  title: "Cetak Ulang dari Penerbit Lain",
  description: "Ingin cetak ulang buku dari penerbit lain? Kami siap membantu dengan proses yang mudah"
}, {
  icon: CheckCircle,
  title: "Pelayanan Profesional",
  description: "Tim berpengalaman siap mendampingi dari konsultasi hingga buku Anda terbit"
}];
const WhyChooseUs = () => {
  return <section className="py-12 md:py-20 px-4 bg-gradient-to-br from-primary/5 to-secondary/5">
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
          {benefits.map((benefit, index) => <Card key={index} className="border-border/50 hover:border-secondary/50 transition-all duration-300 hover:shadow-lg">
              <CardContent className="p-5 md:p-6 flex gap-3 md:gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-br from-secondary to-secondary/80 flex items-center justify-center flex-shrink-0">
                  <benefit.icon className="w-5 h-5 md:w-6 md:h-6 text-secondary-foreground" />
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-bold mb-1.5 md:mb-2 text-slate-950">{benefit.title}</h3>
                  <p className="text-sm md:text-base text-stone-900">{benefit.description}</p>
                </div>
              </CardContent>
            </Card>)}
        </div>
      </div>
    </section>;
};
export default WhyChooseUs;