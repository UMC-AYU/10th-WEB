import Button from "../Button/Button";
import type { Task } from "../../context/TodoProvider";
import { useTodo } from "../../context/TodoProvider";
import "./todoitem.css";

interface TodoItemProps {
  todo: Task;
  isDone: boolean;
}

const TodoItem = ({ todo, isDone }: TodoItemProps) => {
  const { completeTodo, deleteTodo } = useTodo();

  return (
    <div className="todo-item">
      <span className="todo-item__text">{todo.text}</span>

      {isDone ? (
        <Button
          variant="delete"
          onClick={() => deleteTodo(todo.id)}
          text="삭제"
        />
      ) : (
        <Button
          variant="complete"
          onClick={() => completeTodo(todo.id)}
          text="완료"
        />
      )}
    </div>
  );
};

export default TodoItem;
