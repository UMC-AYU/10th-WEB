import { useTodo } from "../context/TodoContext";
import TodoItem from "./TodoItem";

const TodoList = ({ isCompleted }: { isCompleted: boolean }) => {
  const { todos } = useTodo();

  const filtered = todos.filter((t) => t.completed === isCompleted);

  return (
    <div
      className={
        isCompleted ? "complete-container__section" : "todo-container__section"
      }
    >
      <div
        className={
          isCompleted ? "complete-container__title" : "todo-container__title"
        }
      >
        {isCompleted ? "완료" : "할 일"}
      </div>

      <div
        className={
          isCompleted ? "complete-container__items" : "todo-container__items"
        }
      >
        {filtered.map((item) => (
          <TodoItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
