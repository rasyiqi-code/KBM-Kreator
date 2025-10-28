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
  return <section className="py-20 px-4 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-white">
            Mengapa Memilih Kami?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Komitmen kami adalah kesuksesan karya Anda
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {benefits.map((benefit, index) => <Card key={index} className="border-border/50 hover:border-secondary/50 transition-all duration-300 hover:shadow-lg">
              <CardContent className="p-6 flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-secondary to-secondary/80 flex items-center justify-center flex-shrink-0">
                  <benefit.icon className="w-6 h-6 text-secondary-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2 text-slate-950">{benefit.title}</h3>
                  <p className="text-slate-950">{benefit.description}</p>
                </div>
              </CardContent>
            </Card>)}
        </div>
      </div>
    </section>;
};
export default WhyChooseUs;