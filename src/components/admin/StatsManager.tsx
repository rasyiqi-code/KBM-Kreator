import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Edit } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Stat {
  id: string;
  label: string;
  value: string;
  color: string;
  display_order: number;
}

const StatsManager = () => {
  const { toast } = useToast();
  const [stats, setStats] = useState<Stat[]>([]);
  const [open, setOpen] = useState(false);
  const [editingStat, setEditingStat] = useState<Stat | null>(null);
  const [formData, setFormData] = useState({
    label: "",
    value: "",
    color: "primary",
  });

  const fetchStats = useCallback(async () => {
    const { data, error } = await supabase
      .from("company_stats")
      .select("*")
      .order("display_order", { ascending: true });

    if (error) {
      toast({
        title: "Error",
        description: "Gagal memuat stats",
        variant: "destructive",
      });
    } else {
      setStats(data || []);
    }
  }, [toast]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingStat) {
        const { error } = await supabase
          .from("company_stats")
          .update(formData)
          .eq("id", editingStat.id);

        if (error) throw error;
        toast({ title: "Berhasil", description: "Statistik berhasil diupdate" });
      } else {
        // Get max display_order
        const { data: existingStats } = await supabase
          .from("company_stats")
          .select("display_order")
          .order("display_order", { ascending: false })
          .limit(1);

        const maxOrder = existingStats && existingStats.length > 0 
          ? existingStats[0].display_order + 1 
          : 0;

        const { error } = await supabase
          .from("company_stats")
          .insert([{ ...formData, display_order: maxOrder }]);

        if (error) throw error;
        toast({ title: "Berhasil", description: "Statistik berhasil ditambahkan" });
      }

      setFormData({ label: "", value: "", color: "primary" });
      setEditingStat(null);
      setOpen(false);
      fetchStats();
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal menyimpan statistik",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (stat: Stat) => {
    setEditingStat(stat);
    setFormData({
      label: stat.label,
      value: stat.value,
      color: stat.color,
    });
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from("company_stats")
        .delete()
        .eq("id", id);

      if (error) throw error;
      toast({ title: "Berhasil", description: "Statistik berhasil dihapus" });
      fetchStats();
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal menghapus statistik",
        variant: "destructive",
      });
    }
  };

  const getColorClass = (color: string) => {
    switch (color) {
      case "primary":
        return "text-primary";
      case "secondary":
        return "text-secondary";
      case "accent":
        return "text-accent-foreground";
      case "primary-dark":
        return "text-primary";
      default:
        return "text-foreground";
    }
  };

  const handleReorder = async (id: string, direction: "up" | "down") => {
    const currentIndex = stats.findIndex((s) => s.id === id);
    if (currentIndex === -1) return;

    const newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0 || newIndex >= stats.length) return;

    const currentOrder = stats[currentIndex].display_order;
    const targetOrder = stats[newIndex].display_order;

    try {
      await supabase
        .from("company_stats")
        .update({ display_order: targetOrder })
        .eq("id", id);

      await supabase
        .from("company_stats")
        .update({ display_order: currentOrder })
        .eq("id", stats[newIndex].id);

      fetchStats();
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal mengubah urutan",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-border/50 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5 border-b border-border/50">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <span className="text-lg">📊</span>
              </div>
              <div>
                <h2 className="text-xl font-bold">Company Statistics</h2>
                <p className="text-sm text-muted-foreground">{stats.length} statistik tersedia</p>
              </div>
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => { setEditingStat(null); setFormData({ label: "", value: "", color: "primary" }); }}>
                  <Plus className="w-4 h-4 mr-2" />
                  Tambah Statistik
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle className="text-xl">{editingStat ? "Edit Statistik" : "Tambah Statistik"}</DialogTitle>
                  <DialogDescription>
                    {editingStat ? "Ubah informasi statistik perusahaan" : "Tambahkan statistik baru untuk ditampilkan di landing page"}
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-5 pt-4">
                  <div>
                    <Label htmlFor="value">Nilai</Label>
                    <Input
                      id="value"
                      value={formData.value}
                      onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                      placeholder="1,000+"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="label">Label</Label>
                    <Input
                      id="label"
                      value={formData.label}
                      onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                      placeholder="Cover Dibuat"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="color">Warna</Label>
                    <Select
                      value={formData.color}
                      onValueChange={(value) => setFormData({ ...formData, color: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="primary">Primary</SelectItem>
                        <SelectItem value="secondary">Secondary</SelectItem>
                        <SelectItem value="accent">Accent</SelectItem>
                        <SelectItem value="primary-dark">Primary Dark</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button type="submit" className="w-full bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary shadow-md">
                    {editingStat ? "Update" : "Tambah"}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
      </Card>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={stat.id} className="border-border/50 shadow-md transition-all hover:shadow-lg hover:scale-105">
            <CardContent className="p-6 text-center">
              <div className={`text-4xl font-bold ${getColorClass(stat.color)} mb-2`}>
                {stat.value}
              </div>
              <p className="text-sm font-medium text-card-foreground mb-4">{stat.label}</p>
              <div className="flex justify-center gap-1.5 pt-3 border-t border-border/50">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleReorder(stat.id, "up")}
                  disabled={index === 0}
                  title="Pindah ke atas"
                  className="hover:bg-primary/10 hover:border-primary/30 hover:text-primary"
                >
                  ↑
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleReorder(stat.id, "down")}
                  disabled={index === stats.length - 1}
                  title="Pindah ke bawah"
                  className="hover:bg-primary/10 hover:border-primary/30 hover:text-primary"
                >
                  ↓
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleEdit(stat)} className="hover:bg-primary/10 hover:border-primary/30 hover:text-primary">
                  <Edit className="w-3.5 h-3.5" />
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(stat.id)} className="hover:bg-destructive/90">
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StatsManager;
