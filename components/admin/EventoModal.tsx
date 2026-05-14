'use client'

import { useState, useEffect } from "react";
import { Event } from "./eventos-types";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type EventoModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormData | Record<string, any>) => Promise<void>;
  evento?: Event | null;
};

export function EventoModal({ isOpen, onClose, onSubmit, evento }: EventoModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    text: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (evento) {
      setFormData({
        title: evento.title,
        text: evento.text || "",
      });
    } else {
      setFormData({
        title: "",
        text: "",
      });
    }
    setFile(null);
  }, [evento, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (file || !evento) {
        const data = new FormData();
        data.append("title", formData.title);
        data.append("text", formData.text);
        if (file) data.append("image", file);
        
        await onSubmit(data);
      } else {
        await onSubmit(formData);
      }
      onClose();
    } catch (error) {
      console.error("Error submitting evento:", error);
      alert("Erro ao salvar evento. Verifique os campos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{evento ? "Atualizar Evento" : "Novo Evento"}</DialogTitle>
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
            <Label htmlFor="image">Imagem {evento ? "(Deixe vazio para manter atual)" : "(Obrigatório)"}</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              required={!evento}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="text">Texto</Label>
            <Textarea
              id="text"
              value={formData.text}
              onChange={(e) => setFormData({ ...formData, text: e.target.value })}
              placeholder="Descreva o evento..."
              required
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Salvando..." : evento ? "Salvar Alterações" : "Cadastrar Evento"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
