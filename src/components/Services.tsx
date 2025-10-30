import { Palette, PenTool, Video, FileImage, Sparkles, Layout } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
const services = [{
  icon: Layout,
  title: "Jasa Desain Cover & Layout Buku",
  description: "Jasa desain cover buku profesional yang memukau dengan layout buku rapi dan estetik. Desain cover menarik untuk semua genre buku"
}, {
  icon: PenTool,
  title: "Jasa Ghost Writing Profesional",
  description: "Ghost writer berpengalaman siap membantu menulis buku Anda. Jasa penulis profesional untuk biografi, novel, non-fiksi, dan berbagai genre"
}, {
  icon: Video,
  title: "Jasa Video Promosi Buku",
  description: "Jasa pembuatan video promosi buku yang menarik dan profesional untuk meningkatkan penjualan dan awareness buku Anda"
}, {
  icon: FileImage,
  title: "Jasa Mockup Buku 3D",
  description: "Jasa mockup buku 3D realistis untuk visualisasi buku sebelum cetak. Mockup profesional untuk promosi dan presentasi"
}, {
  icon: Palette,
  title: "Jasa Desain Grafis Buku",
  description: "Jasa desain grafis lengkap untuk kebutuhan visual buku: ilustrasi, infografis, banner, dan material promosi"
}, {
  icon: Sparkles,
  title: "Jasa Penerbitan Buku ISBN",
  description: "Konsultasi penerbitan buku ber-ISBN melalui Penerbit KBM Indonesia. Self publishing dan indie publishing dengan standar profesional"
}];
const Services = () => {
  return <section className="py-12 md:py-20 px-4 bg-muted/30">
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
          {services.map((service, index) => <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/30 hover:-translate-y-1">
              <CardContent className="p-5 md:p-6">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform">
                  <service.icon className="w-6 h-6 md:w-7 md:h-7 text-primary-foreground" />
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-slate-950">{service.title}</h3>
                <p className="text-sm md:text-base leading-relaxed text-slate-950">{service.description}</p>
              </CardContent>
            </Card>)}
        </div>
      </div>
    </section>;
};
export default Services;