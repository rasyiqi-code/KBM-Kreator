import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Edit, ArrowUp, ArrowDown } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";

interface Principle {
  id: string;
  icon: string;
  title: string;
  description: string;
  display_order: number;
  active: boolean;
}

const PrinciplesManager = () => {
  const { toast } = useToast();
  const [principles, setPrinciples] = useState<Principle[]>([]);
  const [open, setOpen] = useState(false);
  const [editingPrinciple, setEditingPrinciple] = useState<Principle | null>(null);
  const [formData, setFormData] = useState({
    icon: "",
    title: "",
    description: "",
  });

  const fetchPrinciples = useCallback(async () => {
    const { data, error } = await supabase
      .from("principles")
      .select("*")
      .order("display_order", { ascending: true });

    if (error) {
      toast({
        title: "Error",
        description: "Gagal memuat principles",
        variant: "destructive",
      });
    } else {
      setPrinciples(data || []);
    }
  }, [toast]);

  useEffect(() => {
    fetchPrinciples();
  }, [fetchPrinciples]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingPrinciple) {
        const { error } = await supabase
          .from("principles")
          .update(formData)
          .eq("id", editingPrinciple.id);

        if (error) throw error;
        toast({ title: "Berhasil", description: "Prinsip berhasil diupdate" });
      } else {
        // Get max display_order
        const { data: existingPrinciples } = await supabase
          .from("principles")
          .select("display_order")
          .order("display_order", { ascending: false })
          .limit(1);

        const maxOrder = existingPrinciples && existingPrinciples.length > 0 
          ? existingPrinciples[0].display_order + 1 
          : 0;

        const { error } = await supabase
          .from("principles")
          .insert([{ ...formData, display_order: maxOrder }]);

        if (error) throw error;
        toast({ title: "Berhasil", description: "Prinsip berhasil ditambahkan" });
      }

      setFormData({ icon: "", title: "", description: "" });
      setEditingPrinciple(null);
      setOpen(false);
      fetchPrinciples();
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal menyimpan prinsip",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (principle: Principle) => {
    setEditingPrinciple(principle);
    setFormData({
      icon: principle.icon,
      title: principle.title,
      description: principle.description,
    });
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from("principles")
        .delete()
        .eq("id", id);

      if (error) throw error;
      toast({ title: "Berhasil", description: "Prinsip berhasil dihapus" });
      fetchPrinciples();
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal menghapus prinsip",
        variant: "destructive",
      });
    }
  };

  const handleToggleActive = async (id: string, currentActive: boolean) => {
    try {
      const { error } = await supabase
        .from("principles")
        .update({ active: !currentActive })
        .eq("id", id);

      if (error) throw error;
      toast({
        title: "Berhasil",
        description: `Prinsip ${!currentActive ? "diaktifkan" : "dinonaktifkan"}`,
      });
      fetchPrinciples();
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal mengubah status prinsip",
        variant: "destructive",
      });
    }
  };

  const handleReorder = async (id: string, direction: "up" | "down") => {
    const currentIndex = principles.findIndex((p) => p.id === id);
    if (currentIndex === -1) return;

    const newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0 || newIndex >= principles.length) return;

    const currentOrder = principles[currentIndex].display_order;
    const targetOrder = principles[newIndex].display_order;

    try {
      await supabase
        .from("principles")
        .update({ display_order: targetOrder })
        .eq("id", id);

      await supabase
        .from("principles")
        .update({ display_order: currentOrder })
        .eq("id", principles[newIndex].id);

      fetchPrinciples();
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
                <span className="text-lg">🎯</span>
              </div>
              <div>
                <h2 className="text-xl font-bold">Prinsip Kerja</h2>
                <p className="text-sm text-muted-foreground">{principles.length} prinsip tersedia</p>
              </div>
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => { setEditingPrinciple(null); setFormData({ icon: "", title: "", description: "" }); }}>
                  <Plus className="w-4 h-4 mr-2" />
                  Tambah Prinsip
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle className="text-xl">{editingPrinciple ? "Edit Prinsip" : "Tambah Prinsip"}</DialogTitle>
                  <DialogDescription>
                    {editingPrinciple ? "Ubah informasi prinsip kerja" : "Tambahkan prinsip kerja baru untuk ditampilkan di landing page"}
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-5 pt-4">
                  <div>
                    <Label htmlFor="icon">Icon Name (Lucide)</Label>
                    <Input
                      id="icon"
                      value={formData.icon}
                      onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                      placeholder="Shield, Lock, ShieldCheck, dll"
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
                      rows={4}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary shadow-md">
                    {editingPrinciple ? "Update" : "Tambah"}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
      </Card>

      <div className="grid gap-4">
        {principles.map((principle, index) => (
          <Card key={principle.id} className={`border-border/50 shadow-md transition-all hover:shadow-lg ${principle.active ? "" : "opacity-60 bg-muted/30"}`}>
            <CardContent className="p-5">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-medium bg-primary/10 text-primary px-3 py-1.5 rounded-md border border-primary/20">
                      {principle.icon}
                    </span>
                    {!principle.active && (
                      <span className="text-xs font-medium bg-muted text-muted-foreground px-3 py-1.5 rounded-md border border-border">
                        Nonaktif
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold text-lg text-card-foreground mb-2">{principle.title}</h3>
                  <p className="text-sm text-card-foreground/80 leading-relaxed">{principle.description}</p>
                  <div className="flex items-center gap-2 mt-3">
                    <Switch
                      checked={principle.active}
                      onCheckedChange={() => handleToggleActive(principle.id, principle.active)}
                    />
                    <Label className="text-xs text-card-foreground font-medium">
                      {principle.active ? "Aktif" : "Nonaktif"}
                    </Label>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex gap-1.5">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleReorder(principle.id, "up")}
                      disabled={index === 0}
                      title="Pindah ke atas"
                      className="hover:bg-primary/10 hover:border-primary/30 hover:text-primary"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleReorder(principle.id, "down")}
                      disabled={index === principles.length - 1}
                      title="Pindah ke bawah"
                      className="hover:bg-primary/10 hover:border-primary/30 hover:text-primary"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => handleEdit(principle)} className="hover:bg-primary/10 hover:border-primary/30 hover:text-primary">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(principle.id)} className="hover:bg-destructive/90">
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

export default PrinciplesManager;
