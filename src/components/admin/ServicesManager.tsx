import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Edit } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
  display_order: number;
  active: boolean;
}

const ServicesManager = () => {
  const { toast } = useToast();
  const [services, setServices] = useState<Service[]>([]);
  const [open, setOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    icon: "",
    title: "",
    description: "",
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .order("display_order", { ascending: true });

    if (error) {
      toast({
        title: "Error",
        description: "Gagal memuat services",
        variant: "destructive",
      });
    } else {
      setServices(data || []);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingService) {
        const { error } = await supabase
          .from("services")
          .update(formData)
          .eq("id", editingService.id);

        if (error) throw error;
        toast({ title: "Berhasil", description: "Service berhasil diupdate" });
      } else {
        const { error } = await supabase
          .from("services")
          .insert([formData]);

        if (error) throw error;
        toast({ title: "Berhasil", description: "Service berhasil ditambahkan" });
      }

      setFormData({ icon: "", title: "", description: "" });
      setEditingService(null);
      setOpen(false);
      fetchServices();
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal menyimpan service",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setFormData({
      icon: service.icon,
      title: service.title,
      description: service.description,
    });
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from("services")
        .delete()
        .eq("id", id);

      if (error) throw error;
      toast({ title: "Berhasil", description: "Service berhasil dihapus" });
      fetchServices();
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal menghapus service",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Services ({services.length})</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { setEditingService(null); setFormData({ icon: "", title: "", description: "" }); }}>
              <Plus className="w-4 h-4 mr-2" />
              Tambah Service
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingService ? "Edit Service" : "Tambah Service"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="icon">Icon Name (Lucide)</Label>
                <Input
                  id="icon"
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  placeholder="Layout, PenTool, Video, dll"
                  required
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Lihat icon di: lucide.dev
                </p>
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
                {editingService ? "Update" : "Tambah"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {services.map((service) => (
          <Card key={service.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                      {service.icon}
                    </span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{service.title}</h3>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(service)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(service.id)}>
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

export default ServicesManager;
