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
  return <section className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-stone-50">
            Layanan Kami
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Solusi kreatif lengkap untuk menghadirkan karya terbaik Anda
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/30 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center mb-4 group-hover:scale-110 transition-transform bg-rose-600">
                  <service.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-950">{service.title}</h3>
                <p className="leading-relaxed text-slate-950">{service.description}</p>
              </CardContent>
            </Card>)}
        </div>
      </div>
    </section>;
};
export default Services;