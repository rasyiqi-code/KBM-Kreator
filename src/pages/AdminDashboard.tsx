import { useEffect, useState, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  LogOut, 
  LayoutDashboard, 
  Sparkles,
  FolderKanban,
  Home,
  Info,
  Target,
  BarChart3,
  Tag
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

// Lazy load admin managers for code splitting
const PortfolioManager = lazy(() => import("@/components/admin/PortfolioManager"));
const HeroManager = lazy(() => import("@/components/admin/HeroManager"));
const AboutManager = lazy(() => import("@/components/admin/AboutManager"));
const PrinciplesManager = lazy(() => import("@/components/admin/PrinciplesManager"));
const StatsManager = lazy(() => import("@/components/admin/StatsManager"));
const PromoManager = lazy(() => import("@/components/admin/PromoManager"));

// Loading component
const ContentLoader = () => (
  <div className="flex items-center justify-center py-12 min-h-[400px]">
    <div className="text-center">
      <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 mb-3">
        <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
      <p className="text-sm text-muted-foreground">Memuat...</p>
    </div>
  </div>
);

type MenuItem = {
  title: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  component: React.LazyExoticComponent<() => JSX.Element>;
};

const menuItems: MenuItem[] = [
  {
    title: "Portfolio",
    value: "portfolio",
    icon: FolderKanban,
    component: PortfolioManager,
  },
  {
    title: "Hero",
    value: "hero",
    icon: Home,
    component: HeroManager,
  },
  {
    title: "About",
    value: "about",
    icon: Info,
    component: AboutManager,
  },
  {
    title: "Prinsip",
    value: "principles",
    icon: Target,
    component: PrinciplesManager,
  },
  {
    title: "Statistik",
    value: "stats",
    icon: BarChart3,
    component: StatsManager,
  },
  {
    title: "Promo",
    value: "promo",
    icon: Tag,
    component: PromoManager,
  },
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("portfolio");

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

  const ActiveComponent = menuItems.find(item => item.value === activeTab)?.component || PortfolioManager;

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar variant="inset" collapsible="icon">
          <SidebarHeader className="border-b border-sidebar-border">
            <div className="flex items-center gap-2 px-2 py-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-md">
                <Sparkles className="w-4 h-4 text-primary-foreground" />
              </div>
              <div className="flex flex-col group-data-[collapsible=icon]:hidden">
                <h2 className="text-sm font-bold text-sidebar-foreground">Admin Dashboard</h2>
                <p className="text-xs text-sidebar-foreground/70">KBM Kreator</p>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <SidebarMenuItem key={item.value}>
                        <SidebarMenuButton
                          onClick={() => setActiveTab(item.value)}
                          isActive={activeTab === item.value}
                          tooltip={item.title}
                        >
                          <Icon />
                          <span>{item.title}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="border-t border-sidebar-border">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleLogout} className="text-destructive hover:text-destructive hover:bg-destructive/10">
                  <LogOut />
                  <span>Keluar</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="flex-1" />
            <div className="flex items-center gap-2">
              <div className="text-sm text-muted-foreground">
                {menuItems.find(item => item.value === activeTab)?.title || "Dashboard"}
              </div>
            </div>
          </header>
          <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
            <Suspense fallback={<ContentLoader />}>
              <ActiveComponent />
            </Suspense>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboard;
