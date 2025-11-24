import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Upload, Trash2, ExternalLink, Edit, ArrowUp, ArrowDown, Image as ImageIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { z } from "zod";

const portfolioSchema = z.object({
  title: z.string()
    .trim()
    .min(1, "Judul tidak boleh kosong")
    .max(200, "Judul maksimal 200 karakter"),
  description: z.string()
    .max(2000, "Deskripsi maksimal 2000 karakter")
    .optional()
    .transform(val => val === "" ? undefined : val),
  category: z.enum(["cover", "layout", "aesthetic", "video"], {
    errorMap: () => ({ message: "Kategori tidak valid" })
  }),
  youtube_url: z.string()
    .optional()
    .refine(
      (val) => !val || val === "" || /^https?:\/\/(www\.)?(youtube\.com|youtu\.be)\/.+/.test(val),
      { message: "URL YouTube tidak valid" }
    )
    .transform(val => val === "" ? undefined : val),
  instagram_url: z.string()
    .optional()
    .refine(
      (val) => !val || val === "" || /^https?:\/\/(www\.)?instagram\.com\/.+/.test(val),
      { message: "URL Instagram tidak valid" }
    )
    .transform(val => val === "" ? undefined : val),
  featured: z.boolean()
});

interface PortfolioItem {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  category: string;
  youtube_url: string | null;
  instagram_url: string | null;
  featured: boolean;
  display_order: number;
}

const PortfolioManager = () => {
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "cover" as "cover" | "layout" | "aesthetic" | "video",
    youtube_url: "",
    instagram_url: "",
    featured: false,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const { data, error } = await supabase
      .from("portfolio_items")
      .select("*")
      .order("display_order", { ascending: true });

    if (error) {
      toast({
        title: "Error",
        description: "Gagal memuat portfolio",
        variant: "destructive",
      });
    } else {
      setItems(data || []);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      portfolioSchema.parse(formData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Validasi Gagal",
          description: error.errors[0].message,
          variant: "destructive",
        });
      }
      return;
    }

    // Only require image for new items
    if (!editingItem && !imageFile) {
      toast({
        title: "Error",
        description: "Pilih gambar terlebih dahulu",
        variant: "destructive",
      });
      return;
    }

    if (imageFile) {
      const maxSize = 5 * 1024 * 1024;
      if (imageFile.size > maxSize) {
        toast({
          title: "Error",
          description: "Ukuran file maksimal 5MB",
          variant: "destructive",
        });
        return;
      }

      const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
      if (!allowedTypes.includes(imageFile.type)) {
        toast({
          title: "Error",
          description: "Format file harus JPG, PNG, atau WebP",
          variant: "destructive",
        });
        return;
      }
    }

    setUploading(true);

    try {
      let imageUrl = editingItem?.image_url;

      // Upload new image if provided
      if (imageFile) {
        const fileExt = imageFile.name.split(".").pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("portfolio")
          .upload(fileName, imageFile, {
            cacheControl: '3600',
            upsert: false
          });

        if (uploadError) {
          console.error("Upload error:", uploadError);
          throw new Error(`Gagal upload gambar: ${uploadError.message}`);
        }

        const { data: { publicUrl } } = supabase.storage
          .from("portfolio")
          .getPublicUrl(fileName);

        imageUrl = publicUrl;
      }

      if (editingItem) {
        // Prepare update data
        const updateData: {
          title: string;
          description: string | null;
          category: "cover" | "layout" | "aesthetic" | "video";
          youtube_url: string | null;
          instagram_url: string | null;
          featured: boolean;
          image_url?: string;
        } = {
          title: formData.title.trim(),
          description: formData.description?.trim() || null,
          category: formData.category,
          youtube_url: formData.youtube_url?.trim() || null,
          instagram_url: formData.instagram_url?.trim() || null,
          featured: formData.featured || false,
        };

        if (imageUrl) {
          updateData.image_url = imageUrl;
        }

        const { error: updateError } = await supabase
          .from("portfolio_items")
          .update(updateData)
          .eq("id", editingItem.id);

        if (updateError) {
          console.error("Update error:", updateError);
          throw new Error(`Gagal memperbarui portfolio: ${updateError.message}`);
        }

        toast({
          title: "Berhasil",
          description: "Portfolio berhasil diperbarui",
        });
      } else {
        // Ensure image_url is present for new items
        if (!imageUrl) {
          throw new Error("Gambar wajib diisi untuk portfolio baru");
        }
        
        // Prepare insert data with all required fields
        const insertData = {
          title: formData.title.trim(),
          description: formData.description?.trim() || null,
          category: formData.category,
          image_url: imageUrl,
          youtube_url: formData.youtube_url?.trim() || null,
          instagram_url: formData.instagram_url?.trim() || null,
          featured: formData.featured || false,
          display_order: items.length > 0 ? Math.max(...items.map(i => i.display_order)) + 1 : 0
        };
        
        const { error: insertError } = await supabase
          .from("portfolio_items")
          .insert([insertData]);

        if (insertError) {
          console.error("Insert error:", insertError);
          throw new Error(`Gagal menambahkan portfolio: ${insertError.message}`);
        }

        toast({
          title: "Berhasil",
          description: "Portfolio berhasil ditambahkan",
        });
      }

      setFormData({
        title: "",
        description: "",
        category: "cover",
        youtube_url: "",
        instagram_url: "",
        featured: false,
      });
      setImageFile(null);
      setEditingItem(null);
      setEditDialogOpen(false);
      fetchItems();
    } catch (error) {
      toast({
        title: "Error",
        description: editingItem ? "Gagal memperbarui portfolio" : "Gagal menambahkan portfolio",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (item: PortfolioItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description || "",
      category: item.category as "cover" | "layout" | "aesthetic" | "video",
      youtube_url: item.youtube_url || "",
      instagram_url: item.instagram_url || "",
      featured: item.featured,
    });
    setImageFile(null);
    setEditDialogOpen(true);
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
    setFormData({
      title: "",
      description: "",
      category: "cover",
      youtube_url: "",
      instagram_url: "",
      featured: false,
    });
    setImageFile(null);
    setEditDialogOpen(false);
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
        .from("portfolio_items")
        .update({ display_order: targetOrder })
        .eq("id", id);

      await supabase
        .from("portfolio_items")
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

  const handleDelete = async (id: string, imageUrl: string) => {
    try {
      const fileName = imageUrl.split("/").pop();
      
      if (fileName) {
        await supabase.storage.from("portfolio").remove([fileName]);
      }

      const { error } = await supabase
        .from("portfolio_items")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Berhasil",
        description: "Portfolio berhasil dihapus",
      });
      fetchItems();
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal menghapus portfolio",
        variant: "destructive",
      });
    }
  };

  const renderForm = () => (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <Label htmlFor="title">Judul *</Label>
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
        />
      </div>

      <div>
        <Label id="category-label" htmlFor="category-select">Kategori *</Label>
        <Select
          value={formData.category}
          onValueChange={(value) => setFormData({ ...formData, category: value as "cover" | "layout" | "aesthetic" | "video" })}
        >
          <SelectTrigger id="category-select" aria-labelledby="category-label">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cover">Cover Buku</SelectItem>
            <SelectItem value="layout">Layout Buku</SelectItem>
            <SelectItem value="aesthetic">Fotografi Estetik</SelectItem>
            <SelectItem value="video">Video</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="image">Gambar {editingItem ? "(kosongkan jika tidak ingin mengubah)" : "*"}</Label>
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
        <Label htmlFor="youtube">URL YouTube (opsional)</Label>
        <Input
          id="youtube"
          type="url"
          placeholder="https://youtube.com/..."
          value={formData.youtube_url}
          onChange={(e) => setFormData({ ...formData, youtube_url: e.target.value })}
        />
      </div>

      <div>
        <Label htmlFor="instagram">URL Instagram (opsional)</Label>
        <Input
          id="instagram"
          type="url"
          placeholder="https://instagram.com/..."
          value={formData.instagram_url}
          onChange={(e) => setFormData({ ...formData, instagram_url: e.target.value })}
        />
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="featured"
          checked={formData.featured}
          onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
          className="w-4 h-4"
        />
        <Label htmlFor="featured">Tampilkan sebagai Featured</Label>
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
            {uploading ? "Menyimpan..." : editingItem ? "Update Portfolio" : "Upload Portfolio"}
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
              <ImageIcon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl">{editingItem ? "Edit Portfolio" : "Tambah Portfolio Baru"}</CardTitle>
              <CardDescription>Kelola portfolio items untuk landing page</CardDescription>
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
            <CardTitle className="text-xl">Portfolio Saat Ini</CardTitle>
            <CardDescription>{items.length} item tersedia</CardDescription>
          </CardHeader>
        </Card>
        <div className="space-y-4">
          {items.map((item, index) => (
            <Card key={item.id} className="border-border/50 shadow-md transition-all hover:shadow-lg">
              <CardContent className="p-5">
                <div className="flex gap-4">
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-28 h-28 object-cover rounded-lg border border-border/50 shadow-sm"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-card-foreground mb-1">{item.title}</h3>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-medium bg-secondary/10 text-secondary px-2.5 py-1 rounded-md border border-secondary/20">
                        {item.category}
                      </span>
                      {item.featured && (
                        <span className="text-xs font-medium bg-primary/10 text-primary px-2.5 py-1 rounded-md border border-primary/20">
                          ⭐ Featured
                        </span>
                      )}
                    </div>
                    {item.description && (
                      <p className="text-sm text-card-foreground/80 mt-1">{item.description}</p>
                    )}
                    <div className="flex gap-3 mt-3">
                      {item.youtube_url && (
                        <a
                          href={item.youtube_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-medium text-primary hover:text-primary-dark hover:underline flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-primary/5 transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          YouTube
                        </a>
                      )}
                      {item.instagram_url && (
                        <a
                          href={item.instagram_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-medium text-primary hover:text-primary-dark hover:underline flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-primary/5 transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          Instagram
                        </a>
                      )}
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
                        className="hover:bg-primary/10 hover:border-primary/30 hover:text-primary"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleReorder(item.id, "down")}
                        disabled={index === items.length - 1}
                        title="Pindah ke bawah"
                        className="hover:bg-primary/10 hover:border-primary/30 hover:text-primary"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(item)}
                      className="hover:bg-primary/10 hover:border-primary/30 hover:text-primary"
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
        </div>
      </div>
    </div>
  );
};

export default PortfolioManager;
