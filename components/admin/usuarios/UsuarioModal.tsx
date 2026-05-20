'use client'

import { useState, useEffect } from "react";
import { User } from "@/types/usuarios";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type UsuarioModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; email: string; password: string; role?: "admin" | "dev" }) => Promise<void>;
};

export function UsuarioModal({ isOpen, onClose, onSubmit }: UsuarioModalProps) {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "dev" as "admin" | "dev" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) setFormData({ name: "", email: "", password: "", role: "dev" });
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try { await onSubmit(formData); onClose(); }
    catch (error) { console.error("Error submitting usuario:", error); alert("Erro ao salvar usuário."); }
    finally { setLoading(false); }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[500px]">
        <DialogHeader><DialogTitle>Novo Usuário</DialogTitle></DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Nome</Label>
            <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Senha</Label>
            <Input id="password" type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} minLength={6} required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="role">Perfil</Label>
            <select id="role" className="flex h-10 w-full rounded-md border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm text-neutral-100 focus:outline-none focus:ring-1 focus:ring-neutral-700" value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value as "admin" | "dev" })}>
              <option value="dev">Dev</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={loading}>Cancelar</Button>
            <Button type="submit" disabled={loading}>{loading ? "Salvando..." : "Cadastrar Usuário"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
