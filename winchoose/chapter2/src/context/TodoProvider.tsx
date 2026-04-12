import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

export type Task = {
  id: number;
  text: string;
  isDone: boolean;
};

interface TodoContextType {
  work: string;
  todos: Task[];
  doingTodos: Task[];
  doneTodos: Task[];
  setWork: (value: string) => void;
  addTodo: () => void;
  completeTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
}

export const TodoContext = createContext<TodoContextType | undefined>(
  undefined,
);

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [work, setWorkState] = useState("");
  const [todos, setTodos] = useState<Task[]>([]);

  const setWork = (value: string) => {
    setWorkState(value);
  };

  const addTodo = () => {
    if (work.trim() === "") return;

    const newTodo: Task = {
      id: Date.now(),
      text: work,
      isDone: false,
    };

    setTodos((prev) => [...prev, newTodo]);
    setWorkState("");
  };

  const completeTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, isDone: true } : todo)),
    );
  };

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const doingTodos = todos.filter((todo) => !todo.isDone);
  const doneTodos = todos.filter((todo) => todo.isDone);

  return (
    <TodoContext.Provider
      value={{
        work,
        todos,
        doingTodos,
        doneTodos,
        setWork,
        addTodo,
        completeTodo,
        deleteTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodo는 반드시 TodoProvider 내부에서 사용해야 합니다.");
  }

  return context;
};
