import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import "./App.css";

function App() {
  return (
    <div className="todo-container">
      <header className="todo-container__header">YEON TODO</header>

      <TodoForm />

      <div className="list-container">
        <TodoList isCompleted={false} />
        <TodoList isCompleted={true} />
      </div>
    </div>
  );
}

export default App;