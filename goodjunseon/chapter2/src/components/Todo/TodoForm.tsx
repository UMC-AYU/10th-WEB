import type { TodoFormProps } from "../../types/todo";

const TodoForm = ({ value, onChange, onSubmit }: TodoFormProps) => {
  return (
    <form onSubmit={onSubmit} className="todo-container__form">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type="text"
        id="todo-input"
        className="todo-container__input"
        placeholder="할 일 입력"
        required
      />
      <button type="submit" className="todo-container__button">
        할 일 추가
      </button>
    </form>
  );
};

export default TodoForm;
