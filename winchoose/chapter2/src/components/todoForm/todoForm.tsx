import type { ChangeEvent, KeyboardEvent } from "react";
import Button from "../Button/Button";
import { useTodo } from "../../context/TodoProvider";
import { useTheme } from "../../context/ThemeProvider";

interface TodoFormProps {
  title: string;
}

const TodoForm = ({ title }: TodoFormProps) => {
  const { work, setWork, addTodo } = useTodo();
  const { isDark, toggleTheme } = useTheme();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWork(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  return (
    <div className="flex flex-col gap-7">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-3xl font-black tracking-tight md:text-5xl">{title}</h1>
        <Button
          variant="theme"
          text={isDark ? "라이트 모드" : "다크 모드"}
          onClick={toggleTheme}
          className={
            isDark
              ? "bg-zinc-100 text-zinc-900 hover:bg-zinc-200"
              : "bg-zinc-900 text-white hover:bg-zinc-700"
          }
        />
      </div>

      <div className="flex gap-3">
        <input
          value={work}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className={`h-14 flex-1 rounded-xl border px-4 text-lg outline-none transition ${
            isDark
              ? "border-zinc-700 bg-zinc-800 text-zinc-50 placeholder:text-zinc-400"
              : "border-zinc-300 bg-white text-zinc-900 placeholder:text-zinc-400"
          }`}
          placeholder="할 일 입력"
        />
        <Button variant="add" text="할 일 추가" onClick={addTodo} />
      </div>
    </div>
  );
};

export default TodoForm;
