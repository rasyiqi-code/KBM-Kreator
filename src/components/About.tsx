import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { 
  Building2, 
  MapPin, 
  Calendar, 
  Award,
  Star,
  Shield,
  Lock,
  ShieldCheck,
  CheckCircle,
  Target,
  Zap,
  Heart,
  Lightbulb,
  Users,
  Award as AwardIcon,
  TrendingUp,
  Globe,
  BookOpen,
  PenTool,
  Palette,
  Code,
  Rocket,
  Sparkles,
  ThumbsUp,
  Eye,
  Handshake,
  Briefcase,
  Clock,
  DollarSign,
  FileText,
  Image as ImageIcon,
  Video,
  Music,
  Camera,
  Mail,
  Phone,
  MessageCircle,
  type LucideIcon
} from "lucide-react";

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

// Icon mapping for commonly used icons - only import what we need
const iconMap: Record<string, LucideIcon> = {
  Star,
  Shield,
  Lock,
  ShieldCheck,
  CheckCircle,
  Target,
  Zap,
  Heart,
  Lightbulb,
  Users,
  Award: AwardIcon,
  TrendingUp,
  Globe,
  BookOpen,
  PenTool,
  Palette,
  Code,
  Rocket,
  Sparkles,
  ThumbsUp,
  Eye,
  Handshake,
  Briefcase,
  Clock,
  DollarSign,
  FileText,
  Image: ImageIcon,
  Video,
  Music,
  Camera,
  Mail,
  Phone,
  MessageCircle,
};

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

  const getIcon = (iconName: string): LucideIcon => {
    return iconMap[iconName] || Star;
  };

  return (
    <section className="py-12 sm:py-16 md:py-24 px-[7px] sm:px-4 bg-gradient-to-b from-background via-muted/5 to-background">
      <div className="container mx-auto max-w-6xl">
        {/* Stats Section - Top */}
        {stats.length > 0 && (
          <div className="mb-12 sm:mb-16 md:mb-20">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {stats.map((stat, index) => (
                <div
                  key={stat.id}
                  className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-secondary/5 p-6 sm:p-8 border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1"
                >
                  <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-full blur-2xl"></div>
                  <div className="relative text-center space-y-2">
                    <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                      {stat.value}
                    </div>
                    <p className="text-xs sm:text-sm md:text-base text-white font-semibold leading-tight">
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Main Content Section */}
        <div className="space-y-12 sm:space-y-16 md:space-y-20">
          {/* Header Section */}
          <div className="text-center space-y-4 sm:space-y-6 max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              {content.heading}
            </h2>
            {content.intro && (
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
                {content.intro}
              </p>
            )}
          </div>

          {/* Visi & Misi Cards */}
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            {content.visi && (
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-6 sm:p-8 border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
                <div className="relative">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/30 border border-primary/40 mb-4">
                    <Target className="w-4 h-4 text-white" />
                    <span className="text-sm font-bold text-white">VISI</span>
                  </div>
                  <p className="text-base sm:text-lg text-white leading-relaxed font-semibold">
                    "{content.visi}"
                  </p>
                </div>
              </div>
            )}
            
            {content.misi && (
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-secondary/10 via-secondary/5 to-transparent p-6 sm:p-8 border border-secondary/20 hover:border-secondary/40 transition-all duration-300 hover:shadow-lg">
                <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-3xl"></div>
                <div className="relative">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/30 border border-secondary/40 mb-4">
                    <Target className="w-4 h-4 text-white" />
                    <span className="text-sm font-bold text-white">MISI</span>
                  </div>
                  <p className="text-base sm:text-lg text-white leading-relaxed font-semibold">
                    {content.misi}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Principles Section */}
          {principles.length > 0 && (
            <div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-8 sm:mb-10 text-center">
                Prinsip Kerja Kami
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {principles.map((principle, index) => {
                  const Icon = getIcon(principle.icon);
                  const colors = [
                    { bg: "from-primary/10 to-primary/5", icon: "bg-primary/15", text: "text-primary" },
                    { bg: "from-secondary/10 to-secondary/5", icon: "bg-secondary/15", text: "text-secondary" },
                    { bg: "from-primary/8 to-secondary/8", icon: "bg-primary/12", text: "text-primary" },
                  ];
                  const color = colors[index % colors.length];
                  
                  return (
                    <div
                      key={principle.id}
                      className={`group relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br ${color.bg} border border-border/50 p-5 sm:p-6 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/40 hover:-translate-y-1`}
                    >
                      <div className="space-y-4">
                        <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl ${color.icon} flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                          <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                        </div>
                        <div>
                          <h4 className="text-base sm:text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                            {principle.title}
                          </h4>
                          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                            {principle.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Company Info Section */}
          <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-br from-muted/20 via-muted/10 to-muted/20 p-6 sm:p-8 md:p-10 border border-border/50">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6 sm:mb-8 text-center">
              Informasi Perusahaan
            </h3>
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="flex items-start gap-4 p-4 sm:p-5 rounded-xl bg-background/50 hover:bg-background/80 transition-colors border border-border/30">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-semibold text-foreground mb-1">Didirikan</h4>
                  <p className="text-sm sm:text-base text-muted-foreground">{content.founding_year}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 sm:p-5 rounded-xl bg-background/50 hover:bg-background/80 transition-colors border border-border/30">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-semibold text-foreground mb-1">Lokasi</h4>
                  <p className="text-sm sm:text-base text-muted-foreground">{content.location}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 sm:p-5 rounded-xl bg-background/50 hover:bg-background/80 transition-colors border border-border/30">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-semibold text-foreground mb-1">Owner & Pendiri</h4>
                  <p className="text-sm sm:text-base text-muted-foreground">{content.owner}</p>
                  {content.owner_title && (
                    <p className="text-xs sm:text-sm text-muted-foreground/80 mt-1">{content.owner_title}</p>
                  )}
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 sm:p-5 rounded-xl bg-background/50 hover:bg-background/80 transition-colors border border-border/30">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-semibold text-foreground mb-1">Keanggotaan</h4>
                  <p className="text-sm sm:text-base text-muted-foreground">{content.membership}</p>
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
