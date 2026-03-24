import type { FormEvent } from "react";

export type TodoType = {
  id: number;
  text: string;
};

export type TodoFormProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
};

export type TodoSectionProps = {
  title: string;
  listId: string;
  items: TodoType[];
  actionLabel: string;
  actionVariant: "complete" | "delete";
  onAction: (todo: TodoType) => void;
};
