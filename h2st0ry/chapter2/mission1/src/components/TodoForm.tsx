import { useRef } from "react";
import { useTodo } from "../context/TodoContext";

const TodoForm = () => {
  const { addTodo } = useTodo();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const value = inputRef.current?.value || "";
    if (!value.trim()) return;

    addTodo(value);

    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <form className="todo-container__form" onSubmit={handleSubmit}>
      <input
        ref={inputRef}
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
