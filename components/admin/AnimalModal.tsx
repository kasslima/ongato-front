'use client'

import { useState, useEffect } from "react";
import { Animal } from "./animais-types";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type AnimalModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormData | Record<string, any>) => Promise<void>;
  animal?: Animal | null;
};

export function AnimalModal({ isOpen, onClose, onSubmit, animal }: AnimalModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    age: "0 a 6 meses",
    gender: "macho",
    size: "pequeno",
    type: "gato",
    description: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (animal) {
      setFormData({
        name: animal.name,
        age: animal.age,
        gender: animal.gender,
        size: animal.size,
        type: animal.type,
        description: animal.description || "",
      });
    } else {
      setFormData({
        name: "",
        age: "0 a 6 meses",
        gender: "macho",
        size: "pequeno",
        type: "gato",
        description: "",
      });
    }
    setFile(null);
  }, [animal, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (file || !animal) {
        // Multipart if there is a file or it's a new animal (image required by swagger)
        const data = new FormData();
        data.append("name", formData.name);
        data.append("age", formData.age);
        data.append("gender", formData.gender);
        data.append("size", formData.size);
        data.append("type", formData.type);
        data.append("description", formData.description);
        if (file) data.append("image", file);
        
        await onSubmit(data);
      } else {
        // JSON if no file and it's an update
        await onSubmit(formData);
      }
      onClose();
    } catch (error) {
      console.error("Error submitting animal:", error);
      alert("Erro ao salvar animal. Verifique os campos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{animal ? "Atualizar Animal" : "Novo Animal"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="type">Espécie</Label>
              <select
                id="type"
                className="flex h-10 w-full rounded-md border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-neutral-400"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
              >
                <option value="gato">Gato</option>
                <option value="cachorro">Cachorro</option>
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="gender">Gênero</Label>
              <select
                id="gender"
                className="flex h-10 w-full rounded-md border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-neutral-400"
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
              >
                <option value="macho">Macho</option>
                <option value="femea">Fêmea</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="age">Idade</Label>
              <select
                id="age"
                className="flex h-10 w-full rounded-md border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-neutral-400"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value as any })}
              >
                <option value="0 a 6 meses">0 a 6 meses</option>
                <option value="6 a 12 meses">6 a 12 meses</option>
                <option value="1 a 2 anos">1 a 2 anos</option>
                <option value="2 a 5 anos">2 a 5 anos</option>
                <option value="5 a 9 anos">5 a 9 anos</option>
                <option value="mais de 9 anos">mais de 9 anos</option>
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="size">Porte</Label>
              <select
                id="size"
                className="flex h-10 w-full rounded-md border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-neutral-400"
                value={formData.size}
                onChange={(e) => setFormData({ ...formData, size: e.target.value as any })}
              >
                <option value="pequeno">Pequeno</option>
                <option value="medio">Médio</option>
                <option value="grande">Grande</option>
              </select>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="image">Imagem {animal ? "(Deixe vazio para manter atual)" : "(Obrigatório)"}</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              required={!animal}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Conte um pouco sobre o animal..."
              required
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Salvando..." : animal ? "Salvar Alterações" : "Cadastrar Animal"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
