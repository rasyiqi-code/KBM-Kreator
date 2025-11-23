import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Save } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface HeroContent {
  badge: string;
  heading: string;
  subheading1: string;
  subheading2: string;
  cta1_text: string;
  cta2_text: string;
}

const HeroManager = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState<HeroContent>({
    badge: "",
    heading: "",
    subheading1: "",
    subheading2: "",
    cta1_text: "",
    cta2_text: "",
  });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    const { data, error } = await supabase
      .from("site_content")
      .select("content")
      .eq("section", "hero")
      .single();

    if (error) {
      console.error("Error fetching hero content:", error);
    } else if (data && data.content) {
      setContent(data.content as unknown as HeroContent);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from("site_content")
        .update({ content: content as any })
        .eq("section", "hero");

      if (error) throw error;

      toast({
        title: "Berhasil",
        description: "Konten hero berhasil diperbarui",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal memperbarui konten",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Hero Section</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="badge">Badge Text</Label>
            <Input
              id="badge"
              value={content.badge}
              onChange={(e) => setContent({ ...content, badge: e.target.value })}
              placeholder="Professional sejak 2017"
            />
          </div>

          <div>
            <Label htmlFor="heading">Heading Utama</Label>
            <Textarea
              id="heading"
              value={content.heading}
              onChange={(e) => setContent({ ...content, heading: e.target.value })}
              rows={3}
              placeholder="Jasa Desain Layout, Pembuatan Sampul..."
            />
          </div>

          <div>
            <Label htmlFor="subheading1">Subheading 1</Label>
            <Textarea
              id="subheading1"
              value={content.subheading1}
              onChange={(e) => setContent({ ...content, subheading1: e.target.value })}
              rows={2}
              placeholder="KBM Kreator Yogyakarta berani..."
            />
          </div>

          <div>
            <Label htmlFor="subheading2">Subheading 2</Label>
            <Input
              id="subheading2"
              value={content.subheading2}
              onChange={(e) => setContent({ ...content, subheading2: e.target.value })}
              placeholder="Mitra & Partner terbaik..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="cta1">Tombol CTA 1</Label>
              <Input
                id="cta1"
                value={content.cta1_text}
                onChange={(e) => setContent({ ...content, cta1_text: e.target.value })}
                placeholder="Mulai Proyek Anda"
              />
            </div>

            <div>
              <Label htmlFor="cta2">Tombol CTA 2</Label>
              <Input
                id="cta2"
                value={content.cta2_text}
                onChange={(e) => setContent({ ...content, cta2_text: e.target.value })}
                placeholder="Lihat Portfolio"
              />
            </div>
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            <Save className="w-4 h-4 mr-2" />
            {loading ? "Menyimpan..." : "Simpan Perubahan"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default HeroManager;
