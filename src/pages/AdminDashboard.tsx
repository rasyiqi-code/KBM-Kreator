import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { LogOut, Upload, Trash2, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PortfolioItem {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  category: string;
  external_url: string | null;
  youtube_url: string | null;
  instagram_url: string | null;
  featured: boolean;
  display_order: number;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [items, setItems] = useState<PortfolioItem[]>([]);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "cover",
    youtube_url: "",
    instagram_url: "",
    featured: false,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    checkAuth();
    fetchItems();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/login");
    }
    setLoading(false);
  };

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

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) {
      toast({
        title: "Error",
        description: "Pilih gambar terlebih dahulu",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    try {
      // Upload image to storage
      const fileExt = imageFile.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from("portfolio")
        .upload(fileName, imageFile);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from("portfolio")
        .getPublicUrl(fileName);

      // Insert into database
      const { error: insertError } = await supabase
        .from("portfolio_items")
        .insert({
          ...formData,
          image_url: publicUrl,
        });

      if (insertError) throw insertError;

      toast({
        title: "Berhasil",
        description: "Portfolio berhasil ditambahkan",
      });

      // Reset form
      setFormData({
        title: "",
        description: "",
        category: "cover",
        youtube_url: "",
        instagram_url: "",
        featured: false,
      });
      setImageFile(null);
      fetchItems();
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal menambahkan portfolio",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string, imageUrl: string) => {
    try {
      // Extract filename from URL
      const fileName = imageUrl.split("/").pop();
      
      // Delete from storage
      if (fileName) {
        await supabase.storage.from("portfolio").remove([fileName]);
      }

      // Delete from database
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-foreground">Dashboard Admin</h1>
          <Button onClick={handleLogout} variant="outline">
            <LogOut className="w-4 h-4 mr-2" />
            Keluar
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Form */}
          <Card>
            <CardHeader>
              <CardTitle>Tambah Portfolio Baru</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
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
                  <Label htmlFor="category">Kategori *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
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
                  <Label htmlFor="image">Gambar *</Label>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    required
                  />
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

                <Button type="submit" disabled={uploading} className="w-full">
                  <Upload className="w-4 h-4 mr-2" />
                  {uploading ? "Mengupload..." : "Upload Portfolio"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Portfolio List */}
          <div>
            <h2 className="text-xl font-bold text-foreground mb-4">Portfolio Saat Ini ({items.length})</h2>
            <div className="space-y-4">
              {items.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <img
                        src={item.image_url}
                        alt={item.title}
                        className="w-24 h-24 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.category}</p>
                        {item.description && (
                          <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                        )}
                        <div className="flex gap-2 mt-2">
                          {item.youtube_url && (
                            <a
                              href={item.youtube_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-primary hover:underline flex items-center gap-1"
                            >
                              <ExternalLink className="w-3 h-3" />
                              YouTube
                            </a>
                          )}
                          {item.instagram_url && (
                            <a
                              href={item.instagram_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-primary hover:underline flex items-center gap-1"
                            >
                              <ExternalLink className="w-3 h-3" />
                              Instagram
                            </a>
                          )}
                        </div>
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(item.id, item.image_url)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
