import { useState, type FormEvent } from "react";
import type { TodoType } from "../types/todo";

export const useTodo = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [doneTodos, setDoneTodos] = useState<TodoType[]>([]);
  const [input, setInput] = useState<string>("");

  // addTodo
  const addTodo = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const text = input.trim();

    if (!text) {
      return;
    }

    const newTodo: TodoType = { id: Date.now(), text };
    setTodos((prevTodos): TodoType[] => [...prevTodos, newTodo]);
    setInput("");
  };

  // completeTodo
  const completeTodo = (todo: TodoType): void => {
    setTodos((prevTodos): TodoType[] =>
      prevTodos.filter((item) => item.id !== todo.id),
    );
    setDoneTodos((prevDoneTodos): TodoType[] => [...prevDoneTodos, todo]);
  };

  // deleteTodo
  const deleteTodo = (todo: TodoType): void => {
    setDoneTodos((prevDoneTodos): TodoType[] =>
      prevDoneTodos.filter((item) => item.id !== todo.id),
    );
  };

  return {
    todos,
    doneTodos,
    input,
    setInput,
    addTodo,
    completeTodo,
    deleteTodo,
  };
};
