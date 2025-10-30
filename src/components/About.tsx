import { Building2, MapPin, Calendar, Award } from "lucide-react";
const About = () => {
  return <section className="py-12 md:py-20 px-4">
      <div className="container mx-auto px-0">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 text-foreground">
              Penerbit & Jasa Desain Buku Yogyakarta
            </h2>
            <p className="text-base md:text-lg text-muted-foreground mb-4 md:mb-6 leading-relaxed">
              KBM Kreator Yogyakarta adalah penyedia jasa desain cover buku, jasa layout buku profesional, jasa ghost writing, jasa video promosi buku, dan jasa mockup buku 3D. Kami fokus memberikan solusi kreatif lengkap untuk kebutuhan penerbitan buku Anda.
            </p>
            <p className="text-base md:text-lg text-muted-foreground mb-6 md:mb-8 leading-relaxed">
              Sebagai bagian dari Penerbit KBM Indonesia Group sejak 2017 dan anggota resmi IKAPI (Ikatan Penerbit Indonesia), kami telah menerbitkan 3000+ buku ber-ISBN dengan standar profesional. Tim kami berpengalaman dalam desain grafis, penulisan, dan penerbitan di Yogyakarta.
            </p>
            
            <div className="space-y-3 md:space-y-4">
              <div className="flex items-start gap-2.5 md:gap-3">
                <Calendar className="w-5 h-5 md:w-6 md:h-6 text-primary flex-shrink-0 mt-0.5 md:mt-1" />
                <div>
                  <h4 className="text-sm md:text-base font-semibold text-foreground mb-0.5 md:mb-1">Didirikan</h4>
                  <p className="text-sm md:text-base text-muted-foreground">17 Agustus 2017</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2.5 md:gap-3">
                <MapPin className="w-5 h-5 md:w-6 md:h-6 text-primary flex-shrink-0 mt-0.5 md:mt-1" />
                <div>
                  <h4 className="text-sm md:text-base font-semibold text-foreground mb-0.5 md:mb-1">Lokasi</h4>
                  <p className="text-sm md:text-base text-muted-foreground">Paingan, Maguwoharjo, Depok, Sleman, DI Yogyakarta</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2.5 md:gap-3">
                <Building2 className="w-5 h-5 md:w-6 md:h-6 text-primary flex-shrink-0 mt-0.5 md:mt-1" />
                <div>
                  <h4 className="text-sm md:text-base font-semibold text-foreground mb-0.5 md:mb-1">Pendiri</h4>
                  <p className="text-sm md:text-base text-muted-foreground">Mohammad Imam Junaidi S.E.I., M.H.</p>
                  <p className="text-xs md:text-sm text-muted-foreground">(Mohammad IJ / Satrio Imam Panjalu)</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2.5 md:gap-3">
                <Award className="w-5 h-5 md:w-6 md:h-6 text-primary flex-shrink-0 mt-0.5 md:mt-1" />
                <div>
                  <h4 className="text-sm md:text-base font-semibold text-foreground mb-0.5 md:mb-1">Anggota Resmi</h4>
                  <p className="text-sm md:text-base text-muted-foreground">IKAPI (Ikatan Penerbit Indonesia)</p>
                  <p className="text-xs md:text-sm text-muted-foreground">Hak legal memproses HAKI melalui KEMENKUMHAM RI</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative mt-8 lg:mt-0">
            <div className="rounded-2xl bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/5 p-6 md:p-8 flex items-center justify-center min-h-[300px] md:min-h-[400px]">
              <div className="text-center space-y-6 md:space-y-8">
                <div className="space-y-1 md:space-y-2">
                  <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary">500+</div>
                  <p className="text-sm md:text-base lg:text-lg text-muted-foreground">Proyek Kreatif Selesai</p>
                </div>
                <div className="space-y-1 md:space-y-2">
                  <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-secondary">1,000+</div>
                  <p className="text-sm md:text-base lg:text-lg text-muted-foreground">Desain Cover Dibuat</p>
                </div>
                <div className="space-y-1 md:space-y-2">
                  <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary-dark">7+</div>
                  <p className="text-sm md:text-base lg:text-lg text-muted-foreground">Tahun Pengalaman</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default About;