import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Upload, Trash2, ExternalLink, Edit, ArrowUp, ArrowDown, Image as ImageIcon, Tag } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { z } from "zod";

const promoSchema = z.object({
  title: z.string()
    .trim()
    .min(1, "Judul tidak boleh kosong")
    .max(200, "Judul maksimal 200 karakter"),
  description: z.string()
    .max(2000, "Deskripsi maksimal 2000 karakter")
    .optional()
    .transform(val => val === "" ? undefined : val),
  link_url: z.string()
    .optional()
    .refine(
      (val) => !val || val === "" || /^https?:\/\/.+/.test(val),
      { message: "URL tidak valid" }
    )
    .transform(val => val === "" ? undefined : val),
  active: z.boolean()
});

interface PromoItem {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  link_url: string | null;
  active: boolean;
  display_order: number;
}

const PromoManager = () => {
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const [items, setItems] = useState<PromoItem[]>([]);
  const [editingItem, setEditingItem] = useState<PromoItem | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    link_url: "",
    active: true,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    fetchItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchItems = async () => {
    const { data, error } = await supabase
      .from("promo_items")
      .select("*")
      .order("display_order", { ascending: true });

    if (error) {
      toast({
        title: "Error",
        description: "Gagal memuat promo",
        variant: "destructive",
      });
    } else {
      setItems((data || []) as PromoItem[]);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Error",
          description: "Ukuran file maksimal 5MB",
          variant: "destructive",
        });
        return;
      }
      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Error",
          description: "File harus berupa gambar",
          variant: "destructive",
        });
        return;
      }
      setImageFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      // Validate form data
      const validatedData = promoSchema.parse(formData);

      let imageUrl = editingItem?.image_url || "";

      // Upload image if new file selected
      if (imageFile) {
        const fileName = `${Date.now()}-${imageFile.name}`;
        const { error: uploadError } = await supabase.storage
          .from("promo")
          .upload(fileName, imageFile, {
            cacheControl: "3600",
            upsert: false,
          });

        if (uploadError) {
          throw new Error(`Gagal upload gambar: ${uploadError.message}`);
        }

        const { data: { publicUrl } } = supabase.storage
          .from("promo")
          .getPublicUrl(fileName);

        imageUrl = publicUrl;
      }

      if (editingItem) {
        // Update existing
        const updateData: {
          title: string;
          description: string | null;
          link_url: string | null;
          active: boolean;
          image_url?: string;
        } = {
          title: validatedData.title.trim(),
          description: validatedData.description?.trim() || null,
          link_url: validatedData.link_url?.trim() || null,
          active: validatedData.active,
        };

        if (imageUrl && imageUrl !== editingItem.image_url) {
          updateData.image_url = imageUrl;
        }

        const { error: updateError } = await supabase
          .from("promo_items")
          .update(updateData)
          .eq("id", editingItem.id);

        if (updateError) {
          throw new Error(`Gagal memperbarui promo: ${updateError.message}`);
        }

        toast({
          title: "Berhasil",
          description: "Promo berhasil diperbarui",
        });
      } else {
        // Insert new
        if (!imageUrl) {
          throw new Error("Gambar wajib diisi untuk promo baru");
        }
        
        const maxOrder = items.length > 0 ? Math.max(...items.map(i => i.display_order)) + 1 : 0;
        
        const { error: insertError } = await supabase
          .from("promo_items")
          .insert([{
            title: validatedData.title.trim(),
            description: validatedData.description?.trim() || null,
            image_url: imageUrl,
            link_url: validatedData.link_url?.trim() || null,
            active: validatedData.active,
            display_order: maxOrder
          }]);

        if (insertError) {
          throw new Error(`Gagal menambahkan promo: ${insertError.message}`);
        }

        toast({
          title: "Berhasil",
          description: "Promo berhasil ditambahkan",
        });
      }

      setFormData({
        title: "",
        description: "",
        link_url: "",
        active: true,
      });
      setImageFile(null);
      setEditingItem(null);
      setEditDialogOpen(false);
      fetchItems();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Gagal menyimpan promo";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (item: PromoItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description || "",
      link_url: item.link_url || "",
      active: item.active,
    });
    setImageFile(null);
    setEditDialogOpen(true);
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
    setFormData({
      title: "",
      description: "",
      link_url: "",
      active: true,
    });
    setImageFile(null);
    setEditDialogOpen(false);
  };

  const handleDelete = async (id: string, imageUrl: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus promo ini?")) {
      return;
    }

    try {
      // Delete image from storage
      const fileName = imageUrl.split("/").pop();
      if (fileName) {
        await supabase.storage.from("promo").remove([fileName]);
      }

      const { error } = await supabase
        .from("promo_items")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Berhasil",
        description: "Promo berhasil dihapus",
      });
      fetchItems();
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal menghapus promo",
        variant: "destructive",
      });
    }
  };

  const handleReorder = async (id: string, direction: "up" | "down") => {
    const currentIndex = items.findIndex((item) => item.id === id);
    if (currentIndex === -1) return;

    const newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0 || newIndex >= items.length) return;

    const currentOrder = items[currentIndex].display_order;
    const targetOrder = items[newIndex].display_order;

    try {
      await supabase
        .from("promo_items")
        .update({ display_order: targetOrder })
        .eq("id", id);

      await supabase
        .from("promo_items")
        .update({ display_order: currentOrder })
        .eq("id", items[newIndex].id);

      fetchItems();
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal mengubah urutan",
        variant: "destructive",
      });
    }
  };

  const handleToggleActive = async (id: string, currentActive: boolean) => {
    try {
      const { error } = await supabase
        .from("promo_items")
        .update({ active: !currentActive })
        .eq("id", id);

      if (error) throw error;
      toast({
        title: "Berhasil",
        description: `Promo ${!currentActive ? "diaktifkan" : "dinonaktifkan"}`,
      });
      fetchItems();
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal mengubah status promo",
        variant: "destructive",
      });
    }
  };

  const renderForm = () => (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <Label htmlFor="title">Judul Promo *</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
          placeholder="Contoh: Promo Spesial Bulan Ini"
        />
      </div>

      <div>
        <Label htmlFor="description">Deskripsi</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
          placeholder="Deskripsi promo (opsional)"
        />
      </div>

      <div>
        <Label htmlFor="image">Gambar Promo {editingItem ? "(kosongkan jika tidak ingin mengubah)" : "*"}</Label>
        <Input
          id="image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          required={!editingItem}
        />
        {editingItem && imageFile && (
          <p className="text-xs text-muted-foreground mt-1">Gambar baru dipilih</p>
        )}
      </div>

      <div>
        <Label htmlFor="link_url">Link URL (opsional)</Label>
        <Input
          id="link_url"
          type="url"
          placeholder="https://example.com/promo"
          value={formData.link_url}
          onChange={(e) => setFormData({ ...formData, link_url: e.target.value })}
        />
        <p className="text-xs text-muted-foreground mt-1">Link yang akan dibuka saat promo diklik</p>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="active"
          checked={formData.active}
          onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
          className="w-4 h-4"
        />
        <Label htmlFor="active">Aktif (tampilkan di landing page)</Label>
      </div>

      <div className="pt-4 border-t border-border/50">
        <div className="flex gap-2">
          {editingItem && (
            <Button type="button" variant="outline" onClick={handleCancelEdit} className="flex-1">
              Batal
            </Button>
          )}
          <Button type="submit" disabled={uploading} className={`${editingItem ? "flex-1" : "w-full"} bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary shadow-md`}>
            <Upload className="w-4 h-4 mr-2" />
            {uploading ? "Menyimpan..." : editingItem ? "Update Promo" : "Upload Promo"}
          </Button>
        </div>
      </div>
    </form>
  );

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <Card className="border-border/50 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5 border-b border-border/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Tag className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl">{editingItem ? "Edit Promo" : "Tambah Promo Baru"}</CardTitle>
              <CardDescription>Kelola gambar promo untuk landing page</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          {renderForm()}
        </CardContent>
      </Card>

      <div>
        <Card className="border-border/50 shadow-lg mb-4">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5 border-b border-border/50">
            <CardTitle className="text-xl">Promo Saat Ini</CardTitle>
            <CardDescription>{items.length} promo tersedia</CardDescription>
          </CardHeader>
        </Card>
        <div className="space-y-4">
          {items.map((item, index) => (
            <Card key={item.id} className={`border-border/50 shadow-md transition-all hover:shadow-lg ${!item.active ? "opacity-60 bg-muted/30" : ""}`}>
              <CardContent className="p-5">
                <div className="flex gap-4">
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-28 h-28 object-cover rounded-lg border border-border/50 shadow-sm"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-lg text-foreground">{item.title}</h3>
                      {!item.active && (
                        <span className="text-xs font-medium bg-muted text-muted-foreground px-2.5 py-1 rounded-md border border-border">
                          Nonaktif
                        </span>
                      )}
                    </div>
                    {item.description && (
                      <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                    )}
                    {item.link_url && (
                      <a
                        href={item.link_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-medium text-primary hover:text-primary-dark hover:underline flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-primary/5 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        {item.link_url}
                      </a>
                    )}
                    <div className="flex items-center gap-2 mt-3">
                      <Switch
                        checked={item.active}
                        onCheckedChange={() => handleToggleActive(item.id, item.active)}
                      />
                      <Label className="text-xs text-muted-foreground">
                        {item.active ? "Aktif" : "Nonaktif"}
                      </Label>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-1.5">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleReorder(item.id, "up")}
                        disabled={index === 0}
                        title="Pindah ke atas"
                        className="hover:bg-primary/10 hover:border-primary/30"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleReorder(item.id, "down")}
                        disabled={index === items.length - 1}
                        title="Pindah ke bawah"
                        className="hover:bg-primary/10 hover:border-primary/30"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(item)}
                      className="hover:bg-primary/10 hover:border-primary/30"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(item.id, item.image_url)}
                      className="hover:bg-destructive/90"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          {items.length === 0 && (
            <Card className="border-border/50">
              <CardContent className="p-8 text-center">
                <ImageIcon className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                <p className="text-muted-foreground">Belum ada promo. Tambahkan promo pertama Anda!</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default PromoManager;

