import { useTodo } from "../../context/TodoProvider";
import { useTheme } from "../../context/ThemeProvider";
import TodoItem from "./todoItem";

const TodoList = () => {
  const { doingTodos, doneTodos } = useTodo();
  const { isDark } = useTheme();

  return (
    <div className="mt-9 grid gap-4 md:grid-cols-2">
      <div>
        <h2 className="mb-5 text-center text-2xl font-extrabold md:text-4xl">
          할 일
        </h2>
        <div className="flex flex-col gap-3">
          {doingTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} isDone={false} />
          ))}
          {doingTodos.length === 0 && (
            <div
              className={`rounded-2xl border px-4 py-6 text-center text-sm ${
                isDark
                  ? "border-zinc-800 bg-zinc-900 text-zinc-400"
                  : "border-zinc-200 bg-zinc-50 text-zinc-500"
              }`}
            >
              아직 할 일이 없어요.
            </div>
          )}
        </div>
      </div>

      <div>
        <h2 className="mb-5 text-center text-2xl font-extrabold md:text-4xl">
          완료
        </h2>
        <div className="flex flex-col gap-3">
          {doneTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} isDone={true} />
          ))}
          {doneTodos.length === 0 && (
            <div
              className={`rounded-2xl border px-4 py-6 text-center text-sm ${
                isDark
                  ? "border-zinc-800 bg-zinc-900 text-zinc-400"
                  : "border-zinc-200 bg-zinc-50 text-zinc-500"
              }`}
            >
              완료한 일이 아직 없어요.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoList;
