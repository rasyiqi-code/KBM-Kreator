import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Edit, ArrowUp, ArrowDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";

interface Benefit {
  id: string;
  icon: string;
  title: string;
  description: string;
  display_order: number;
  active: boolean;
}

const BenefitsManager = () => {
  const { toast } = useToast();
  const [benefits, setBenefits] = useState<Benefit[]>([]);
  const [open, setOpen] = useState(false);
  const [editingBenefit, setEditingBenefit] = useState<Benefit | null>(null);
  const [formData, setFormData] = useState({
    icon: "",
    title: "",
    description: "",
  });

  useEffect(() => {
    fetchBenefits();
  }, []);

  const fetchBenefits = async () => {
    const { data, error } = await supabase
      .from("benefits")
      .select("*")
      .order("display_order", { ascending: true });

    if (error) {
      toast({
        title: "Error",
        description: "Gagal memuat benefits",
        variant: "destructive",
      });
    } else {
      setBenefits(data || []);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingBenefit) {
        const { error } = await supabase
          .from("benefits")
          .update(formData)
          .eq("id", editingBenefit.id);

        if (error) throw error;
        toast({ title: "Berhasil", description: "Benefit berhasil diupdate" });
      } else {
        const { error } = await supabase
          .from("benefits")
          .insert([formData]);

        if (error) throw error;
        toast({ title: "Berhasil", description: "Benefit berhasil ditambahkan" });
      }

      setFormData({ icon: "", title: "", description: "" });
      setEditingBenefit(null);
      setOpen(false);
      fetchBenefits();
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal menyimpan benefit",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (benefit: Benefit) => {
    setEditingBenefit(benefit);
    setFormData({
      icon: benefit.icon,
      title: benefit.title,
      description: benefit.description,
    });
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from("benefits")
        .delete()
        .eq("id", id);

      if (error) throw error;
      toast({ title: "Berhasil", description: "Benefit berhasil dihapus" });
      fetchBenefits();
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal menghapus benefit",
        variant: "destructive",
      });
    }
  };

  const handleToggleActive = async (id: string, currentActive: boolean) => {
    try {
      const { error } = await supabase
        .from("benefits")
        .update({ active: !currentActive })
        .eq("id", id);

      if (error) throw error;
      toast({
        title: "Berhasil",
        description: `Benefit ${!currentActive ? "diaktifkan" : "dinonaktifkan"}`,
      });
      fetchBenefits();
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal mengubah status benefit",
        variant: "destructive",
      });
    }
  };

  const handleReorder = async (id: string, direction: "up" | "down") => {
    const currentIndex = benefits.findIndex((b) => b.id === id);
    if (currentIndex === -1) return;

    const newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0 || newIndex >= benefits.length) return;

    const currentOrder = benefits[currentIndex].display_order;
    const targetOrder = benefits[newIndex].display_order;

    try {
      await supabase
        .from("benefits")
        .update({ display_order: targetOrder })
        .eq("id", id);

      await supabase
        .from("benefits")
        .update({ display_order: currentOrder })
        .eq("id", benefits[newIndex].id);

      fetchBenefits();
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal mengubah urutan",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Benefits / Why Choose Us ({benefits.length})</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { setEditingBenefit(null); setFormData({ icon: "", title: "", description: "" }); }}>
              <Plus className="w-4 h-4 mr-2" />
              Tambah Benefit
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingBenefit ? "Edit Benefit" : "Tambah Benefit"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="icon">Icon Name (Lucide)</Label>
                <Input
                  id="icon"
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  placeholder="Shield, CheckCircle, Sparkles, dll"
                  required
                />
              </div>

              <div>
                <Label htmlFor="title">Judul</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Deskripsi</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                {editingBenefit ? "Update" : "Tambah"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {benefits.map((benefit, index) => (
          <Card key={benefit.id} className={benefit.active ? "" : "opacity-60"}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded">
                      {benefit.icon}
                    </span>
                    {!benefit.active && (
                      <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                        Nonaktif
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  <div className="flex items-center gap-2 mt-3">
                    <Switch
                      checked={benefit.active}
                      onCheckedChange={() => handleToggleActive(benefit.id, benefit.active)}
                    />
                    <Label className="text-xs text-muted-foreground">
                      {benefit.active ? "Aktif" : "Nonaktif"}
                    </Label>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleReorder(benefit.id, "up")}
                      disabled={index === 0}
                      title="Pindah ke atas"
                    >
                      <ArrowUp className="w-3 h-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleReorder(benefit.id, "down")}
                      disabled={index === benefits.length - 1}
                      title="Pindah ke bawah"
                    >
                      <ArrowDown className="w-3 h-3" />
                    </Button>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => handleEdit(benefit)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(benefit.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BenefitsManager;
