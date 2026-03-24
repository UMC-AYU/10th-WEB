import { useState } from "react";
import "./App.css";
import Button from "./components/Button/Button";
import { useTodo } from "./context/TodoContext";

function App() {
  const [inputText, setInputText] = useState("");
  const { todos, doneTasks, addTodo, completeTask, deleteTask } = useTodo();

  const handleAdd = () => {
    if (inputText.trim() === "") return;
    addTodo(inputText);
    setInputText("");
  };

  return (
    <div className="container">
      <h1>TWOSSU TODO</h1>

      <div className="input-section">
        <input
          className="input"
          placeholder="할 일 입력"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <Button mode="add" onClick={handleAdd}>
          할 일 추가
        </Button>
      </div>

      <div className="todo-section">
        <div className="todo">
          <h2 className="todo-title">할 일</h2>
          <div className="todo-list">
            {todos.map((task) => (
              <div key={task.id} className="todo-card">
                <span>{task.text}</span>
                <Button mode="complete" onClick={() => completeTask(task)}>
                  완료
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="todo">
          <h2 className="todo-title">완료</h2>
          <div className="todo-list">
            {doneTasks.map((task) => (
              <div key={task.id} className="todo-card">
                <span>{task.text}</span>
                <Button mode="delete" onClick={() => deleteTask(task)}>
                  삭제
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
