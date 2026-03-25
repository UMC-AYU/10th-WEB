import TodoForm from "./components/todoForm/todoForm";
import TodoList from "./components/todolist/todoList";
import "./App.css";

function App() {
  return (
    <div className="todo-container">
      <TodoForm title="TAEK TODO" />
      <TodoList />
    </div>
  );
}

export default App;
