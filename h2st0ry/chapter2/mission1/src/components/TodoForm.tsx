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
    <form className="todo-container__form" onSubmit={handleSubmit}>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="todo-container__input"
        placeholder="할 일을 입력해주세요"
      />
      <button type="submit" className="todo-container__button">
        할일 추가
      </button>
    </form>
  );
};

export default TodoForm;
