import React, { useState } from "react";
import { useTodo } from "../context/TodoContext";

const TodoForm = () => {
  const [input, setInput] = useState("");
  const { addTodo } = useTodo();

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    addTodo(input);
    setInput("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full gap-2"
    >
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="할 일을 입력해주세요"
        className="
          flex-1
          px-3
          text-[14px]
          rounded-[10px]
          border border-gray-300
          bg-white text-black
          dark:bg-gray-700 dark:text-white dark:border-gray-600
          placeholder:italic
        "
      />

      <button
        type="submit"
        className="
          px-4
          rounded-[8px]
          bg-[rgb(97,201,65)]
          text-white
          text-[14px]
          hover:opacity-90
          transition-all
        "
      >
        할일 추가
      </button>
    </form>
  );
};

export default TodoForm;