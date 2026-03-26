import type { Todo } from "../types/todo";
import { useTodo } from "../context/TodoContext";

interface TodoItemProps {
  item: Todo;
}

const TodoItem = ({ item }: TodoItemProps) => {
  const { completeTodo, deleteTodo } = useTodo();

  return (
    <div
      className={
        item.completed ? "complete-container__item" : "todo-container__item"
      }
    >
      <span>{item.text}</span>

      {item.completed ? (
        <button
          className="todo-button--delete "
          onClick={() => deleteTodo(item.id)}
        >
          삭제
        </button>
      ) : (
        <button
          className="todo-button--complete "
          onClick={() => completeTodo(item.id)}
        >
          완료
        </button>
      )}
    </div>
  );
};

export default TodoItem;