import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Building2, MapPin, Calendar, Award } from "lucide-react";
import * as LucideIcons from "lucide-react";

interface AboutContent {
  heading: string;
  intro: string;
  visi: string;
  misi: string;
  founding_year: string;
  location: string;
  owner: string;
  owner_title: string;
  membership: string;
}

interface Principle {
  id: string;
  icon: string;
  title: string;
  description: string;
}

interface CompanyStat {
  id: string;
  label: string;
  value: string;
  color: string;
}

const About = () => {
  const [content, setContent] = useState<AboutContent>({
    heading: "Partner Kreatif Perusahaan Penerbit di Indonesia",
    intro: "",
    visi: "",
    misi: "",
    founding_year: "2017",
    location: "",
    owner: "",
    owner_title: "",
    membership: "",
  });
  const [principles, setPrinciples] = useState<Principle[]>([]);
  const [stats, setStats] = useState<CompanyStat[]>([]);

  useEffect(() => {
    fetchContent();
    fetchPrinciples();
    fetchStats();
  }, []);

  const fetchContent = async () => {
    const { data, error } = await supabase
      .from("site_content")
      .select("content")
      .eq("section", "about")
      .single();

    if (!error && data?.content) {
      setContent(data.content as unknown as AboutContent);
    }
  };

  const fetchPrinciples = async () => {
    const { data, error } = await supabase
      .from("principles")
      .select("*")
      .eq("active", true)
      .order("display_order");

    if (!error && data) {
      setPrinciples(data);
    }
  };

  const fetchStats = async () => {
    const { data, error } = await supabase
      .from("company_stats")
      .select("*")
      .order("display_order");

    if (!error && data) {
      setStats(data);
    }
  };

  const getIcon = (iconName: string) => {
    const Icon = (LucideIcons as any)[iconName];
    return Icon || LucideIcons.Star;
  };

  return (
    <section className="py-12 md:py-20 px-4">
      <div className="container mx-auto px-0">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 text-foreground">
              {content.heading}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground mb-4 md:mb-6 leading-relaxed">
              {content.intro}
            </p>
            <p className="text-base md:text-lg text-muted-foreground mb-4 md:mb-6 leading-relaxed">
              <strong>VISI:</strong> "{content.visi}"
            </p>
            <p className="text-base md:text-lg text-muted-foreground mb-4 md:mb-6 leading-relaxed">
              <strong>MISI:</strong> {content.misi}
            </p>
            
            <div className="mb-6 md:mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6 md:mb-8 text-center">
                Prinsip Kerja Kami
              </h3>
              <div className="grid gap-4 md:gap-6">
                {principles.map((principle, index) => {
                  const Icon = getIcon(principle.icon);
                  const bgColor = index % 2 === 0 ? "from-primary/5 via-background to-secondary/5" : "from-secondary/5 via-background to-primary/5";
                  const iconBg = index % 2 === 0 ? "bg-primary/10 group-hover:bg-primary/20" : "bg-secondary/10 group-hover:bg-secondary/20";
                  const iconColor = index % 2 === 0 ? "text-primary" : "text-secondary";
                  
                  return (
                    <div key={principle.id} className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${bgColor} border border-border/50 p-5 md:p-6 transition-all duration-300 hover:shadow-lg hover:border-primary/30`}>
                      <div className="flex items-start gap-4">
                        <div className={`flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-xl ${iconBg} flex items-center justify-center transition-colors`}>
                          <Icon className={`w-6 h-6 md:w-7 md:h-7 ${iconColor}`} />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-base md:text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                            {principle.title}
                          </h4>
                          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                            {principle.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="space-y-3 md:space-y-4">
              <div className="flex items-start gap-2.5 md:gap-3">
                <Calendar className="w-5 h-5 md:w-6 md:h-6 text-primary flex-shrink-0 mt-0.5 md:mt-1" />
                <div>
                  <h4 className="text-sm md:text-base font-semibold text-foreground mb-0.5 md:mb-1">Didirikan</h4>
                  <p className="text-sm md:text-base text-muted-foreground">{content.founding_year}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2.5 md:gap-3">
                <MapPin className="w-5 h-5 md:w-6 md:h-6 text-primary flex-shrink-0 mt-0.5 md:mt-1" />
                <div>
                  <h4 className="text-sm md:text-base font-semibold text-foreground mb-0.5 md:mb-1">Lokasi</h4>
                  <p className="text-sm md:text-base text-muted-foreground">{content.location}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2.5 md:gap-3">
                <Building2 className="w-5 h-5 md:w-6 md:h-6 text-primary flex-shrink-0 mt-0.5 md:mt-1" />
                <div>
                  <h4 className="text-sm md:text-base font-semibold text-foreground mb-0.5 md:mb-1">Owner & Pendiri</h4>
                  <p className="text-sm md:text-base text-muted-foreground">{content.owner}</p>
                  <p className="text-xs md:text-sm text-muted-foreground">{content.owner_title}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2.5 md:gap-3">
                <Award className="w-5 h-5 md:w-6 md:h-6 text-primary flex-shrink-0 mt-0.5 md:mt-1" />
                <div>
                  <h4 className="text-sm md:text-base font-semibold text-foreground mb-0.5 md:mb-1">Keanggotaan</h4>
                  <p className="text-sm md:text-base text-muted-foreground">{content.membership}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative mt-8 lg:mt-0">
            <div className="rounded-2xl bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/5 p-6 md:p-8 flex items-center justify-center min-h-[300px] md:min-h-[400px]">
              <div className="text-center space-y-6 md:space-y-8">
                {stats.map((stat) => (
                  <div key={stat.id} className="space-y-1 md:space-y-2">
                    <div className={`text-4xl sm:text-5xl md:text-6xl font-bold text-${stat.color}`}>
                      {stat.value}
                    </div>
                    <p className="text-sm md:text-base lg:text-lg text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
