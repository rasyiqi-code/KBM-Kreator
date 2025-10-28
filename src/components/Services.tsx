import { Palette, PenTool, Video, FileImage, Sparkles, Layout } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
const services = [{
  icon: Layout,
  title: "Desain Cover & Layout",
  description: "Ciptakan kesan pertama yang memukau dengan desain cover profesional dan layout buku yang rapi dan estetik"
}, {
  icon: PenTool,
  title: "Ghost Writing",
  description: "Tim penulis profesional siap membantu mewujudkan ide Anda menjadi karya tulis berkualitas di berbagai bidang"
}, {
  icon: Video,
  title: "Video Promosi Buku",
  description: "Tingkatkan daya tarik buku Anda dengan video promosi yang menarik dan profesional"
}, {
  icon: FileImage,
  title: "Mockup Buku",
  description: "Visualisasi realistis buku Anda sebelum cetak dengan mockup 3D yang memukau"
}, {
  icon: Palette,
  title: "Desain Grafis",
  description: "Solusi desain grafis lengkap untuk semua kebutuhan visual proyek Anda"
}, {
  icon: Sparkles,
  title: "Layanan Kreatif Lainnya",
  description: "Konsultasi dan layanan kreatif custom sesuai kebutuhan proyek spesifik Anda"
}];
const Services = () => {
  return <section className="py-12 md:py-20 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4 text-foreground">
            Layanan Kami
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Solusi kreatif lengkap untuk menghadirkan karya terbaik Anda
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {services.map((service, index) => <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/30 hover:-translate-y-1">
              <CardContent className="p-5 md:p-6">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform">
                  <service.icon className="w-6 h-6 md:w-7 md:h-7 text-primary-foreground" />
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-foreground">{service.title}</h3>
                <p className="text-sm md:text-base leading-relaxed text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>)}
        </div>
      </div>
    </section>;
};
export default Services;