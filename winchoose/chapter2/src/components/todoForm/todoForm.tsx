import type { ChangeEvent, KeyboardEvent } from "react";
import Button from "../Button/Button";
import { useTodo } from "../../context/TodoProvider";
import "./todoForm.css";

interface TodoFormProps {
  title: string;
}

const TodoForm = ({ title }: TodoFormProps) => {
  const { work, setWork, addTodo } = useTodo();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWork(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  return (
    <div className="todo-form">
      <h1 className="todo-form__title">{title}</h1>

      <div className="todo-form__input-group">
        <input
          value={work}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="todo-form__input"
          placeholder="할 일 입력"
        />
        <Button variant="add" text="할 일 추가" onClick={addTodo} />
      </div>
    </div>
  );
};

export default TodoForm;
