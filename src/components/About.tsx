import { Building2, MapPin, Calendar, Award, Shield, ShieldCheck, Lock, Sparkles } from "lucide-react";
const About = () => {
  return <section className="py-12 md:py-20 px-4">
      <div className="container mx-auto px-0">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 text-foreground">
              Partner Kreatif Perusahaan Penerbit di Indonesia
            </h2>
            <p className="text-base md:text-lg text-muted-foreground mb-4 md:mb-6 leading-relaxed">
              KBM Kreator Yogyakarta berdiri sejak 2017 dan mulai fokus pengembangan serta ekspansi bisnis sejak 2023. Lokasi kantor yang berdiri di Depok, Sleman - Yogyakarta sangat didukung dengan mudahnya mencari tenaga kerja yang profesional, peralatan dan mesin yang mumpuni, dan berbagai bahan baku yang cukup mudah didapat dengan harga teman dekat.
            </p>
            <p className="text-base md:text-lg text-muted-foreground mb-4 md:mb-6 leading-relaxed">
              <strong>VISI:</strong> "Berusaha Membantu Meringankan Pekerjaan Setiap Penerbit Buku di Indonesia Secara Cepat, Berintegritas - Berkomitmen Tinggi Dan Saling Menguntungkan."
            </p>
            <p className="text-base md:text-lg text-muted-foreground mb-4 md:mb-6 leading-relaxed">
              <strong>MISI:</strong> 1). Ada kuantitas - ada fasilitas; 2). Ada kuantitas - ada request dan 3). kualitas sultan – harga persahabatan.
            </p>
            
            <div className="mb-6 md:mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6 md:mb-8 text-center">
                Prinsip Kerja Kami
              </h3>
              <div className="grid gap-4 md:gap-6">
                <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/5 via-background to-secondary/5 border border-border/50 p-5 md:p-6 transition-all duration-300 hover:shadow-lg hover:border-primary/30">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Shield className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-base md:text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        Bekerja dibalik Layar
                      </h4>
                      <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                        Siapa pun mitra partner kami maka privasinya akan kami jaga. Label, logo, dan identitas KBM Kreator Yogyakarta tidak akan pernah kami munculkan pada lembar naskah atau jobs yang diberikan oleh mitra partner.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-secondary/5 via-background to-primary/5 border border-border/50 p-5 md:p-6 transition-all duration-300 hover:shadow-lg hover:border-primary/30">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-xl bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                      <ShieldCheck className="w-6 h-6 md:w-7 md:h-7 text-secondary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-base md:text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        Anti Sabotase & Pencurian Pelanggan
                      </h4>
                      <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                        Kepercayaan mitra partner adalah yang terpenting bagi kami. Kepercayaan melahirkan kerjasama dengan komitmen tinggi, dan komitmen tinggi membuat kerjasama berlangsung sangat lama.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/5 via-background to-secondary/5 border border-border/50 p-5 md:p-6 transition-all duration-300 hover:shadow-lg hover:border-primary/30">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Lock className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-base md:text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        Menjaga Privasi Mitra Partner
                      </h4>
                      <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                        Kami tidak pernah membocorkan data dan nama penerbit yang bekerjasama kecuali atas ijin mereka. Ratusan penerbit, puluhan ribu cetakan buku, dan ribuan layout telah dipercayakan kepada kami.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-secondary/5 via-background to-primary/5 border border-border/50 p-5 md:p-6 transition-all duration-300 hover:shadow-lg hover:border-primary/30">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-xl bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                      <Sparkles className="w-6 h-6 md:w-7 md:h-7 text-secondary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-base md:text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        Memudahkan Dalam Pelayanan
                      </h4>
                      <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                        Ketika branding mitra partner kami naik karena pelayanan yang memudahkan, omset kami pun ikut naik. Saling menguntungkan adalah kunci kesuksesan bersama.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-3 md:space-y-4">
              <div className="flex items-start gap-2.5 md:gap-3">
                <Calendar className="w-5 h-5 md:w-6 md:h-6 text-primary flex-shrink-0 mt-0.5 md:mt-1" />
                <div>
                  <h4 className="text-sm md:text-base font-semibold text-foreground mb-0.5 md:mb-1">Didirikan</h4>
                  <p className="text-sm md:text-base text-muted-foreground">2017 | Fokus Ekspansi sejak 2023</p>
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
                  <h4 className="text-sm md:text-base font-semibold text-foreground mb-0.5 md:mb-1">Owner & Pendiri</h4>
                  <p className="text-sm md:text-base text-muted-foreground">Mohammad Imam Junaidi, S.E., M.H.</p>
                  <p className="text-xs md:text-sm text-muted-foreground">Praktisi Advokasi Hukum, Kepenulisan & Motivasi Literasi</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2.5 md:gap-3">
                <Award className="w-5 h-5 md:w-6 md:h-6 text-primary flex-shrink-0 mt-0.5 md:mt-1" />
                <div>
                  <h4 className="text-sm md:text-base font-semibold text-foreground mb-0.5 md:mb-1">Keanggotaan</h4>
                  <p className="text-sm md:text-base text-muted-foreground">Bergabung di PCJ (Paguyuban Cetak Jogjakarta)</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative mt-8 lg:mt-0">
            <div className="rounded-2xl bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/5 p-6 md:p-8 flex items-center justify-center min-h-[300px] md:min-h-[400px]">
              <div className="text-center space-y-6 md:space-y-8">
                <div className="space-y-1 md:space-y-2">
                  <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary">1,000+</div>
                  <p className="text-sm md:text-base lg:text-lg text-muted-foreground">Cover Dibuat</p>
                </div>
                <div className="space-y-1 md:space-y-2">
                  <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-secondary">2,000+</div>
                  <p className="text-sm md:text-base lg:text-lg text-muted-foreground">Layout Selesai</p>
                </div>
                <div className="space-y-1 md:space-y-2">
                  <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-accent">100+</div>
                  <p className="text-sm md:text-base lg:text-lg text-muted-foreground">Mitra Penerbit</p>
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