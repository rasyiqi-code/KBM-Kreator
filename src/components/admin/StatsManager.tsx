import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Edit } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
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

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
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
  };

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
        const { error } = await supabase
          .from("company_stats")
          .insert([formData]);

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

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Company Statistics ({stats.length})</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { setEditingStat(null); setFormData({ label: "", value: "", color: "primary" }); }}>
              <Plus className="w-4 h-4 mr-2" />
              Tambah Statistik
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingStat ? "Edit Statistik" : "Tambah Statistik"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
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

              <Button type="submit" className="w-full">
                {editingStat ? "Update" : "Tambah"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.id}>
            <CardContent className="p-4 text-center">
              <div className={`text-3xl font-bold text-${stat.color} mb-1`}>
                {stat.value}
              </div>
              <p className="text-sm text-muted-foreground mb-3">{stat.label}</p>
              <div className="flex justify-center gap-2">
                <Button size="sm" variant="outline" onClick={() => handleEdit(stat)}>
                  <Edit className="w-3 h-3" />
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(stat.id)}>
                  <Trash2 className="w-3 h-3" />
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
