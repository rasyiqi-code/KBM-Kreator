import { useEffect, useState, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { LogOut, LayoutDashboard, Sparkles } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Lazy load admin managers for code splitting
const PortfolioManager = lazy(() => import("@/components/admin/PortfolioManager"));
const HeroManager = lazy(() => import("@/components/admin/HeroManager"));
const AboutManager = lazy(() => import("@/components/admin/AboutManager"));
const PrinciplesManager = lazy(() => import("@/components/admin/PrinciplesManager"));
const StatsManager = lazy(() => import("@/components/admin/StatsManager"));
const PromoManager = lazy(() => import("@/components/admin/PromoManager"));

// Loading component for tabs
const TabLoader = () => (
  <div className="flex items-center justify-center py-12">
    <div className="text-center">
      <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 mb-3">
        <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
      <p className="text-sm text-muted-foreground">Memuat...</p>
    </div>
  </div>
);

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/login");
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
            <LayoutDashboard className="w-6 h-6 text-primary animate-pulse" />
          </div>
          <p className="text-muted-foreground font-medium">Memuat dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-md">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-xs text-muted-foreground">KBM Kreator Yogyakarta</p>
            </div>
          </div>
          <Button onClick={handleLogout} variant="outline" className="gap-2 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/20 transition-colors">
            <LogOut className="w-4 h-4" />
            Keluar
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 md:py-8">
        <Tabs defaultValue="portfolio" className="w-full">
          <TabsList className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 mb-6 md:mb-8 w-full bg-card/50 border border-border/50 shadow-sm overflow-x-auto">
            <TabsTrigger value="portfolio" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground whitespace-nowrap">
              Portfolio
            </TabsTrigger>
            <TabsTrigger value="hero" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground whitespace-nowrap">
              Hero
            </TabsTrigger>
            <TabsTrigger value="about" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground whitespace-nowrap">
              About
            </TabsTrigger>
            <TabsTrigger value="principles" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground whitespace-nowrap">
              Prinsip
            </TabsTrigger>
            <TabsTrigger value="stats" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground whitespace-nowrap">
              Statistik
            </TabsTrigger>
            <TabsTrigger value="promo" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground whitespace-nowrap">
              Promo
            </TabsTrigger>
          </TabsList>

          <TabsContent value="portfolio" className="mt-6">
            <Suspense fallback={<TabLoader />}>
              <PortfolioManager />
            </Suspense>
          </TabsContent>

          <TabsContent value="hero" className="mt-6">
            <Suspense fallback={<TabLoader />}>
              <HeroManager />
            </Suspense>
          </TabsContent>

          <TabsContent value="about" className="mt-6">
            <Suspense fallback={<TabLoader />}>
              <AboutManager />
            </Suspense>
          </TabsContent>

          <TabsContent value="principles" className="mt-6">
            <Suspense fallback={<TabLoader />}>
              <PrinciplesManager />
            </Suspense>
          </TabsContent>

          <TabsContent value="stats" className="mt-6">
            <Suspense fallback={<TabLoader />}>
              <StatsManager />
            </Suspense>
          </TabsContent>

          <TabsContent value="promo" className="mt-6">
            <Suspense fallback={<TabLoader />}>
              <PromoManager />
            </Suspense>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
