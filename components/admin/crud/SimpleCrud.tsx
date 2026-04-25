'use client'

import { FormEvent, useState } from "react";

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
    <section className="mx-auto w-full max-w-6xl space-y-4">
      <Card className="max-w-none border-neutral-200 bg-white">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>

        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {fields.map((field) => (
                <div key={field.key} className="space-y-2">
                  <Label htmlFor={field.key}>{field.label}</Label>
                  <Input
                    id={field.key}
                    value={formValues[field.key]}
                    onChange={(event) => handleChange(field.key, event.target.value)}
                    placeholder={field.placeholder}
                    required
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              <Button type="submit">{submitLabel}</Button>
              {isEditing ? (
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancelar edicao
                </Button>
              ) : null}
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="max-w-none border-neutral-200 bg-white">
        <CardHeader>
          <CardTitle>Lista de {itemLabel}</CardTitle>
          <CardDescription>Operacoes disponiveis: criar, editar e excluir.</CardDescription>
        </CardHeader>

        <CardContent className="space-y-3">
          {items.length === 0 ? (
            <div className="rounded-lg border border-dashed border-neutral-300 bg-neutral-50 p-4">
              <p className="text-sm text-neutral-600">Nenhum registro cadastrado.</p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-3 rounded-lg border border-neutral-200 bg-neutral-50 p-3 md:flex-row md:items-center md:justify-between"
              >
                <div className="grid gap-1">
                  <p className="text-sm font-semibold text-neutral-900">
                    {primaryFieldLabel}: {primaryFieldKey ? item.values[primaryFieldKey] : "-"}
                  </p>
                  <p className="text-sm text-neutral-600">
                    {fields.slice(1).map((field) => `${field.label}: ${item.values[field.key]}`).join(" | ")}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button type="button" variant="outline" onClick={() => handleEdit(item)}>
                    Editar
                  </Button>
                  <Button type="button" variant="outline" onClick={() => handleDelete(item.id)}>
                    Excluir
                  </Button>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </section>
  );
}
