import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { ThemeContext } from "./context/ThemProvider";
import ThemeToggleButton from "./components/ThemeToggleButton/ThemeToggleButton";
import { useContext } from "react";

function App() {
  const themeContext = useContext(ThemeContext);
  if (!themeContext) return null;

  const { theme } = themeContext;

  return (
    <div
      className={`flex justify-center items-center h-screen ${
        theme === "DARK" ? "bg-gray-900" : "bg-[rgb(205,220,225)]"
      }`}
    >
      <div
        className={`flex flex-col items-center w-[80%] max-w-[400px] min-w-[400px] rounded-xl shadow-[0_6px_18px_rgba(0,0,0,0.1)] pb-5 ${
          theme === "DARK" ? "bg-gray-800 text-white" : "bg-white text-black"
        }`}
      >
        <header className="flex justify-center items-center h-[120px] text-[32px] font-light tracking-[1px] gap-[10px]">
          YEON TODO
          <ThemeToggleButton />
        </header>

        <div className="flex w-[70%] h-[40px] gap-[10px] justify-center mb-[30px]">
          <TodoForm />
        </div>

        <div className="grid w-[70%] grid-cols-2 gap-[20px]">
          <TodoList isCompleted={false} />
          <TodoList isCompleted={true} />
        </div>
      </div>
    </div>
  );
}

export default App;
