import { Building2, MapPin, Calendar, Award } from "lucide-react";
const About = () => {
  return <section className="py-12 md:py-20 px-4">
      <div className="container mx-auto px-0">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 text-foreground">
              Partner Kreatif Perusahaan Penerbit di Indonesia
            </h2>
            <p className="text-base md:text-lg text-muted-foreground mb-4 md:mb-6 leading-relaxed">
              KBM Kreator Yogyakarta berdiri sejak 2017 dan mulai fokus pengembangan serta ekspansi bisnis sejak 2023. Lokasi kantor yang berdiri di Depok, Sleman - Yogyakarta sangat didukung dengan mudahnya mencari tenaga kerja yang profesional, peralatan dan mesin yang mumpuni, dan bahan berbagai baku yang cukup mudah didapat dengan harga teman dekat.
            </p>
            <p className="text-base md:text-lg text-muted-foreground mb-4 md:mb-6 leading-relaxed">
              <strong>VISI:</strong> "Berusaha Membantu Meringankan Pekerjaan Setiap Penerbit Buku di Indonesia Secara Cepat, Berintegritas - Berkomitmen Tinggi Dan Saling Menguntungkan."
            </p>
            <p className="text-base md:text-lg text-muted-foreground mb-4 md:mb-6 leading-relaxed">
              <strong>MISI:</strong> Ada kuantitas - ada fasilitas, Ada kuantitas - ada request dan kualitas sultan – harga persahabatan.
            </p>
            
            <div className="bg-muted/30 rounded-xl p-4 md:p-6 mb-6 md:mb-8">
              <h3 className="text-lg md:text-xl font-bold text-foreground mb-3 md:mb-4">Prinsip Kerja Kami</h3>
              <div className="space-y-3 md:space-y-4">
                <div>
                  <h4 className="text-sm md:text-base font-semibold text-primary mb-1">1. "BEKERJA DIBALIK LAYER (working behind the scenes)"</h4>
                  <p className="text-sm md:text-base text-muted-foreground">Siapa pun mitra partner kami maka privasinya akan kami jaga. Dan label, serta logo termasuk identitas dari KBM Kreator Yogyakarta tidak akan pernah kami munculkan pada lembar naskah / kerja / jobs yang diberikan oleh mitra partner.</p>
                </div>
                <div>
                  <h4 className="text-sm md:text-base font-semibold text-primary mb-1">2. "ANTI SABOTASE / PENYEROBOTAN / PENCURIAN PELANGGAN"</h4>
                  <p className="text-sm md:text-base text-muted-foreground">Karena yang terpenting bagi kami adalah kepercayaan milik mitra partner. Kepercayaan itu akan melahirkan kerjasama dengan komitmen tinggi. Dan komitmen tinggi akan membuat kerjasama berlangsung sangat lama.</p>
                </div>
                <div>
                  <h4 className="text-sm md:text-base font-semibold text-primary mb-1">3. "MENJAGA PRIVASI MITRA PARTNER"</h4>
                  <p className="text-sm md:text-base text-muted-foreground">Kami tidak pernah membocorkan siapa saja penerbit yang bekerjasama dengan KBM Kreator Yogyakarta kecuali atas ijin Penerbit terkait. Melalui prinsip ini, sudah ada ratusan penerbit yang bekerja sama, puluhan ribu cetakan buku, ribuan layout dan desain sampul serta berbagai pelayanan lainnya.</p>
                </div>
                <div>
                  <h4 className="text-sm md:text-base font-semibold text-primary mb-1">4. "MEMUDAHKAN DALAM PELAYANAN"</h4>
                  <p className="text-sm md:text-base text-muted-foreground">Apabila branding atau bendera perusahaan mitra partner kami naik karena kerjasama yang kami berikan selalu memberikan pelayanan apa pun yang sifatnya memudahkan, maka sudah pasti omset kami pun ikutan naik.</p>
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
                  <h4 className="text-sm md:text-base font-semibold text-foreground mb-0.5 md:mb-1">Komitmen</h4>
                  <p className="text-sm md:text-base text-muted-foreground">Working Behind The Scenes</p>
                  <p className="text-xs md:text-sm text-muted-foreground">Menjaga privasi & kepercayaan mitra partner</p>
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