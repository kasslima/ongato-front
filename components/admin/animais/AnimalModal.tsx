'use client'

import { useState, useEffect } from "react";
import { Animal } from "@/types/animais";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, X } from "lucide-react";

type AnimalFormData = {
  name: string;
  age: Animal["age"];
  gender: Animal["gender"];
  size: Animal["size"];
  type: Animal["type"];
  description: string;
  featured: boolean;
  attributes: string | null;
};

type AnimalModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormData | Record<string, any>) => Promise<void>;
  animal?: Animal | null;
};

export function AnimalModal({ isOpen, onClose, onSubmit, animal }: AnimalModalProps) {
  const [formData, setFormData] = useState<AnimalFormData>({
    name: "",
    age: "0 a 6 meses",
    gender: "macho",
    size: "pequeno",
    type: "gato",
    description: "",
    featured: false,
    attributes: null,
  });
  const [attributeInput, setAttributeInput] = useState("");
  const [attributes, setAttributes] = useState<string[]>([]);
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
        featured: animal.featured ?? false,
        attributes: animal.attributes ?? null,
      });
      setAttributes(
        (animal.attributes || "")
          .split(",")
          .map((attribute) => attribute.trim())
          .filter(Boolean),
      );
    } else {
      setFormData({
        name: "",
        age: "0 a 6 meses",
        gender: "macho",
        size: "pequeno",
        type: "gato",
        description: "",
        featured: false,
        attributes: null,
      });
      setAttributes([]);
    }
    setAttributeInput("");
    setFile(null);
  }, [animal, isOpen]);

  const addAttribute = () => {
    const attribute = attributeInput.trim();
    if (!attribute || /[\s,]/.test(attribute)) return;
    if (attributes.some((item) => item.toLocaleLowerCase() === attribute.toLocaleLowerCase())) {
      setAttributeInput("");
      return;
    }

    setAttributes((current) => [...current, attribute]);
    setAttributeInput("");
  };

  const removeAttribute = (attribute: string) => {
    setAttributes((current) => current.filter((item) => item !== attribute));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const attributesValue = attributes.length > 0 ? attributes.join(", ") : null;
      const payload = { ...formData, attributes: attributesValue };

      if (file || !animal) {
        // Multipart if there is a file or it's a new animal (image required by swagger)
        const data = new FormData();
        data.append("name", formData.name);
        data.append("age", formData.age);
        data.append("gender", formData.gender);
        data.append("size", formData.size);
        data.append("type", formData.type);
        data.append("description", formData.description);
        data.append("featured", String(payload.featured));
        if (payload.attributes) {
          data.append("attributes", payload.attributes);
        } else if (animal) {
          // Em uma edição multipart, a string vazia informa à API que os atributos foram removidos.
          data.append("attributes", "");
        }
        if (file) data.append("image", file);
        
        await onSubmit(data);
      } else {
        // JSON if no file and it's an update
        await onSubmit(payload);
      }
      onClose();
    } catch (error: any) {
      console.error("Error submitting animal:", error);
      alert(error.message || "Erro ao salvar animal. Verifique os campos.");
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
                className="flex h-10 w-full rounded-md border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm text-neutral-100 focus:outline-none focus:ring-1 focus:ring-neutral-700"
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
                className="flex h-10 w-full rounded-md border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm text-neutral-100 focus:outline-none focus:ring-1 focus:ring-neutral-700"
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
                className="flex h-10 w-full rounded-md border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm text-neutral-100 focus:outline-none focus:ring-1 focus:ring-neutral-700"
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
                className="flex h-10 w-full rounded-md border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm text-neutral-100 focus:outline-none focus:ring-1 focus:ring-neutral-700"
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
            {animal?.imageUrl && !file && (
              <div className="relative h-32 w-32 overflow-hidden rounded-lg border border-neutral-200 bg-neutral-50">
                <img
                  src={animal.imageUrl}
                  alt={animal.name}
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
              required={!animal}
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
              placeholder="Conte um pouco sobre o animal..."
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="attribute">Atributos</Label>
            <div className="flex gap-2">
              <Input
                id="attribute"
                value={attributeInput}
                onChange={(e) => setAttributeInput(e.target.value.replace(/[\s,]/g, ""))}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addAttribute();
                  }
                }}
                placeholder="Ex: fofo"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={addAttribute}
                disabled={!attributeInput.trim()}
                aria-label="Adicionar atributo"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {attributes.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {attributes.map((attribute) => (
                  <span
                    key={attribute}
                    className="inline-flex items-center gap-1 rounded-full bg-neutral-800 px-3 py-1 text-xs text-neutral-100"
                  >
                    {attribute}
                    <button
                      type="button"
                      onClick={() => removeAttribute(attribute)}
                      className="rounded-full text-neutral-400 hover:text-white"
                      aria-label={`Remover ${attribute}`}
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </span>
                ))}
              </div>
            )}
            <p className="text-[11px] text-neutral-400">
              Digite uma palavra e clique em + ou pressione Enter.
            </p>
          </div>

          <label className="flex cursor-pointer items-center gap-3 rounded-md border border-neutral-300 bg-neutral-50 p-3">
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="h-4 w-4 accent-neutral-900"
            />
            <span className="text-sm text-neutral-900">Exibir este animal como destaque</span>
          </label>

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
