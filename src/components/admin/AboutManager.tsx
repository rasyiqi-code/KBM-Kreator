import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Save, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface AboutContent {
  heading: string;
  intro: string;
  visi: string;
  misi: string;
  founding_year: string;
  location: string;
  owner: string;
  owner_title: string;
  membership: string;
}

const AboutManager = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState<AboutContent>({
    heading: "",
    intro: "",
    visi: "",
    misi: "",
    founding_year: "",
    location: "",
    owner: "",
    owner_title: "",
    membership: "",
  });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    const { data, error } = await supabase
      .from("site_content")
      .select("content")
      .eq("section", "about")
      .single();

    if (error) {
      console.error("Error fetching about content:", error);
    } else if (data && data.content) {
      setContent(data.content as unknown as AboutContent);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Check if data exists
      const { data: existingData } = await supabase
        .from("site_content")
        .select("id")
        .eq("section", "about")
        .single();

      if (existingData) {
        // Update existing
        const { error } = await supabase
          .from("site_content")
          .update({ content: content as never })
          .eq("section", "about");

        if (error) throw error;
      } else {
        // Insert new
        const { error } = await supabase
          .from("site_content")
          .insert([{ section: "about", content: content as never }]);

        if (error) throw error;
      }

      toast({
        title: "Berhasil",
        description: "Konten about berhasil disimpan",
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Gagal menyimpan konten";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-border/50 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Info className="w-5 h-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-xl">Edit About Section</CardTitle>
            <CardDescription>Kelola informasi tentang perusahaan</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Label htmlFor="heading">Heading</Label>
            <Input
              id="heading"
              value={content.heading}
              onChange={(e) => setContent({ ...content, heading: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="intro">Intro Paragraph</Label>
            <Textarea
              id="intro"
              value={content.intro}
              onChange={(e) => setContent({ ...content, intro: e.target.value })}
              rows={4}
            />
          </div>

          <div>
            <Label htmlFor="visi">VISI</Label>
            <Textarea
              id="visi"
              value={content.visi}
              onChange={(e) => setContent({ ...content, visi: e.target.value })}
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="misi">MISI</Label>
            <Textarea
              id="misi"
              value={content.misi}
              onChange={(e) => setContent({ ...content, misi: e.target.value })}
              rows={2}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="founding">Tahun Didirikan</Label>
              <Input
                id="founding"
                value={content.founding_year}
                onChange={(e) => setContent({ ...content, founding_year: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="location">Lokasi</Label>
              <Input
                id="location"
                value={content.location}
                onChange={(e) => setContent({ ...content, location: e.target.value })}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="owner">Owner & Pendiri</Label>
              <Input
                id="owner"
                value={content.owner}
                onChange={(e) => setContent({ ...content, owner: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="owner_title">Jabatan/Profesi Owner</Label>
              <Input
                id="owner_title"
                value={content.owner_title}
                onChange={(e) => setContent({ ...content, owner_title: e.target.value })}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="membership">Keanggotaan</Label>
            <Input
              id="membership"
              value={content.membership}
              onChange={(e) => setContent({ ...content, membership: e.target.value })}
            />
          </div>

          <div className="pt-4 border-t border-border/50">
            <Button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary shadow-md">
              <Save className="w-4 h-4 mr-2" />
              {loading ? "Menyimpan..." : "Simpan Perubahan"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AboutManager;
