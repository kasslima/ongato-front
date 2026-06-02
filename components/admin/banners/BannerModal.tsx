'use client'

import { useState, useEffect } from "react";
import { Banner } from "@/types/banners";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type BannerModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormData | Record<string, any>) => Promise<void>;
  banner?: Banner | null;
};

export function BannerModal({ isOpen, onClose, onSubmit, banner }: BannerModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (banner) {
      setFormData({
        title: banner.title,
        description: banner.description || "",
      });
    } else {
      setFormData({
        title: "",
        description: "",
      });
    }
    setFile(null);
  }, [banner, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (file || !banner) {
        const data = new FormData();
        data.append("title", formData.title);
        data.append("description", formData.description);
        if (file) data.append("image", file);
        
        await onSubmit(data);
      } else {
        await onSubmit(formData);
      }
      onClose();
    } catch (error: any) {
      console.error("Error submitting banner:", error);
      alert(error.message || "Erro ao salvar banner. Verifique os campos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{banner ? "Atualizar Banner" : "Novo Banner"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="image">Imagem {banner ? "(Deixe vazio para manter atual)" : "(Obrigatório)"}</Label>
            {banner?.imageUrl && !file && (
              <div className="relative h-32 w-full overflow-hidden rounded-lg border border-neutral-200 bg-neutral-50">
                <img
                  src={banner.imageUrl}
                  alt={banner.title}
                  className="h-full w-full object-cover"
                />
                <span className="absolute bottom-0 left-0 right-0 bg-black/50 px-2 py-0.5 text-center text-[10px] text-white">
                  Imagem atual
                </span>
              </div>
            )}
            <Input
              id="image"
              type="file"
              accept="image/jpeg, image/svg+xml, image/webp"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              required={!banner}
            />
            <p className="text-[11px] text-neutral-400">
              Formatos aceitos: JPEG, WEBP e SVG
            </p>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Descreva o banner..."
              required
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Salvando..." : banner ? "Salvar Alterações" : "Cadastrar Banner"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
