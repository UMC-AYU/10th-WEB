import TodoForm from "./components/todoForm/todoForm";
import TodoList from "./components/todolist/todoList";
import { useTheme } from "./context/ThemeProvider";

function App() {
  const { isDark } = useTheme();

  return (
    <div
      className={`flex min-h-screen w-full items-center justify-center px-4 py-8 transition-colors ${
        isDark ? "bg-zinc-950 text-zinc-50" : "bg-slate-100 text-zinc-900"
      }`}
    >
      <div
        className={`w-full max-w-4xl rounded-[28px] border p-6 shadow-xl transition-colors md:p-8 ${
          isDark
            ? "border-zinc-800 bg-zinc-900 shadow-black/30"
            : "border-zinc-200 bg-white shadow-slate-300/40"
        }`}
      >
        <TodoForm title="TAEK TODO" />
        <TodoList />
      </div>
    </div>
  );
}

export default App;
