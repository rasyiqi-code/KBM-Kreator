import { Building2, MapPin, Calendar, Award } from "lucide-react";

const About = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Tentang Penerbit KBM Indonesia Group
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              KBM Kreator adalah bagian dari Penerbit KBM Indonesia Group, penerbit terkemuka yang telah dipercaya oleh ribuan penulis di seluruh Indonesia.
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Dengan pengalaman lebih dari 7 tahun, kami berkomitmen memberikan layanan terbaik untuk mewujudkan karya impian Anda.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Calendar className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Didirikan</h4>
                  <p className="text-muted-foreground">17 Agustus 2017</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Lokasi</h4>
                  <p className="text-muted-foreground">Paingan, Maguwoharjo, Depok, Sleman, DI Yogyakarta</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Building2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Pendiri</h4>
                  <p className="text-muted-foreground">Mohammad Imam Junaidi S.E.I., M.H.</p>
                  <p className="text-sm text-muted-foreground">(Mohammad IJ / Satrio Imam Panjalu)</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Award className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Anggota Resmi</h4>
                  <p className="text-muted-foreground">IKAPI (Ikatan Penerbit Indonesia)</p>
                  <p className="text-sm text-muted-foreground">Hak legal memproses HAKI melalui KEMENKUMHAM RI</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/5 p-8 flex items-center justify-center">
              <div className="text-center space-y-8">
                <div className="space-y-2">
                  <div className="text-6xl font-bold text-primary">3,000+</div>
                  <p className="text-lg text-muted-foreground">Judul Buku Ber-ISBN</p>
                </div>
                <div className="space-y-2">
                  <div className="text-6xl font-bold text-secondary">200K+</div>
                  <p className="text-lg text-muted-foreground">Eksemplar Dicetak</p>
                </div>
                <div className="space-y-2">
                  <div className="text-6xl font-bold text-primary-dark">2,500+</div>
                  <p className="text-lg text-muted-foreground">Penulis Bergabung</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
