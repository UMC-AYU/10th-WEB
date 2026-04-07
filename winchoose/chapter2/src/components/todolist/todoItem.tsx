import Button from "../Button/Button";
import type { Task } from "../../context/TodoProvider";
import { useTodo } from "../../context/TodoProvider";
import { useTheme } from "../../context/ThemeProvider";

interface TodoItemProps {
  todo: Task;
  isDone: boolean;
}

const TodoItem = ({ todo, isDone }: TodoItemProps) => {
  const { completeTodo, deleteTodo } = useTodo();
  const { isDark } = useTheme();

  return (
    <div
      className={`flex items-center justify-between rounded-2xl border px-4 py-4 shadow-sm transition-colors ${
        isDark
          ? "border-zinc-800 bg-zinc-800 text-zinc-50"
          : "border-zinc-200 bg-white text-zinc-900"
      }`}
    >
      <span className="text-lg font-semibold md:text-2xl">{todo.text}</span>

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
