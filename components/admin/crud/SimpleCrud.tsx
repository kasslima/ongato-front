'use client'

import { FormEvent, useState, ReactNode } from "react";
import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type CrudField = {
  key: string;
  label: string;
  placeholder: string;
};

type CrudItem = {
  id: string;
  values: Record<string, string>;
};

type SimpleCrudProps = {
  title: string;
  description: string;
  itemLabel: string;
  fields: CrudField[];
  initialItems?: Record<string, string>[];
  filterComponent?: ReactNode;
};

function buildInitialForm(fields: CrudField[]) {
  const form: Record<string, string> = {};

  for (const field of fields) {
    form[field.key] = "";
  }

  return form;
}

function normalizeValues(values: Record<string, string>, fields: CrudField[]) {
  const normalized: Record<string, string> = {};

  for (const field of fields) {
    normalized[field.key] = values[field.key] ?? "";
  }

  return normalized;
}

export default function SimpleCrud({
  title,
  description,
  itemLabel,
  fields,
  initialItems = [],
  filterComponent,
}: SimpleCrudProps) {
  const primaryField = fields[0];
  const primaryFieldLabel = primaryField?.label ?? "Item";
  const primaryFieldKey = primaryField?.key;

  const [formValues, setFormValues] = useState<Record<string, string>>(() => buildInitialForm(fields));
  const [editingId, setEditingId] = useState<string | null>(null);
  const [items, setItems] = useState<CrudItem[]>(() =>
    initialItems.map((item, index) => ({
      id: `${Date.now()}-${index}`,
      values: normalizeValues(item, fields),
    }))
  );

  const isEditing = editingId !== null;
  const submitLabel = isEditing ? `Salvar ${itemLabel}` : `Cadastrar ${itemLabel}`;

  const resetForm = () => {
    setFormValues(buildInitialForm(fields));
    setEditingId(null);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextValues = normalizeValues(formValues, fields);

    if (isEditing) {
      setItems((current) =>
        current.map((item) => (item.id === editingId ? { ...item, values: nextValues } : item))
      );
      resetForm();
      return;
    }

    setItems((current) => [
      ...current,
      {
        id: crypto.randomUUID(),
        values: nextValues,
      },
    ]);
    resetForm();
  };

  const handleChange = (key: string, value: string) => {
    setFormValues((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const handleEdit = (item: CrudItem) => {
    setEditingId(item.id);
    setFormValues(normalizeValues(item.values, fields));
  };

  const handleDelete = (id: string) => {
    setItems((current) => current.filter((item) => item.id !== id));

    if (editingId === id) {
      resetForm();
    }
  };

  return (
    <section className="mx-auto w-full max-w-6xl">
      <Card className="max-w-none border-neutral-200 bg-white">
        <CardHeader className="pb-6">
          <div className="space-y-1">
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {filterComponent ? (
            filterComponent
          ) : (
            <div className="flex flex-wrap items-center gap-4 py-2">
              <div className="flex flex-1 flex-wrap gap-3">
                <div className="relative flex-1 min-w-[240px]">
                  <Input 
                    className="bg-neutral-50 border-neutral-200 pl-3 focus-visible:ring-1 focus-visible:ring-neutral-400" 
                    placeholder="Pesquisar por nome..." 
                  />
                </div>
                <div className="relative flex-1 min-w-[240px]">
                  <Input 
                    className="bg-neutral-50 border-neutral-200 pl-3 focus-visible:ring-1 focus-visible:ring-neutral-400" 
                    placeholder="Filtrar por status..." 
                  />
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="default" className="px-6">Pesquisar</Button>
                <Button type="button" variant="outline" className="border-neutral-300">
                  Novo Registro
                </Button>
              </div>
            </div>
          )}

          <div className="border-t border-neutral-100" />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.length === 0 ? (
              <div className="col-span-full rounded-lg border border-dashed border-neutral-300 bg-neutral-50 p-8 text-center">
                <p className="text-sm text-neutral-600">Nenhum registro cadastrado.</p>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-neutral-200 bg-white p-4 transition-all hover:border-neutral-300 hover:shadow-sm"
                >
                  <div className="mb-4">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                      {primaryFieldLabel}
                    </h4>
                    <p className="mt-1 text-lg font-bold text-neutral-900 truncate">
                      {primaryFieldKey ? item.values[primaryFieldKey] : "-"}
                    </p>
                    <div className="mt-2 space-y-1">
                      {fields.slice(1, 3).map((field) => (
                        <p key={field.key} className="text-sm text-neutral-500 truncate">
                          <span className="font-medium">{field.label}:</span> {item.values[field.key]}
                        </p>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 border-t border-neutral-50 pt-3">
                    <Button 
                      type="button" 
                      variant="default" 
                      size="sm"
                      className="flex-1 h-9 bg-neutral-900 hover:bg-neutral-800"
                      onClick={() => handleEdit(item)}
                    >
                      Atualizar
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="icon"
                      className="h-9 w-9 border-neutral-200 text-neutral-400 hover:text-red-600 hover:border-red-100 hover:bg-red-50"
                      onClick={() => handleDelete(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
