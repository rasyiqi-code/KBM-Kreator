import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Save } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
      const { error } = await supabase
        .from("site_content")
        .update({ content: content as any })
        .eq("section", "about");

      if (error) throw error;

      toast({
        title: "Berhasil",
        description: "Konten about berhasil diperbarui",
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
        <CardTitle>Edit About Section</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
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

          <Button type="submit" disabled={loading} className="w-full">
            <Save className="w-4 h-4 mr-2" />
            {loading ? "Menyimpan..." : "Simpan Perubahan"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AboutManager;
