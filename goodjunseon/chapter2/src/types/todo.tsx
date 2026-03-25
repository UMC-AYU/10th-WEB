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

export type ActionVariant = "complete" | "delete";

export type ButtonProps = {
  label: string;
  variant: ActionVariant;
  onClick: () => void;
};

export type TodoSectionProps = {
  title: string;
  items: TodoType[];
  actionLabel: string;
  actionVariant: ActionVariant;
  onAction: (todo: TodoType) => void;
};
