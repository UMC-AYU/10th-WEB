import { useState } from "react";
import "./App.css";
import Button from "./components/Button/Button";
import { useTodo } from "./context/TodoContext";
import TodoItem from "./components/TodoItem/TodoItem";

function App() {
  const [inputText, setInputText] = useState("");
  const { todos, doneTasks, addTodo, completeTask, deleteTask } = useTodo();

  const handleAdd = () => {
    if (inputText.trim() === "") {
      setInputText("");
      return;
    }
    addTodo(inputText);
    setInputText("");
  };

  return (
    <div className="flex flex-col items-center w-[40rem] p-12 bg-pink-200 rounded-xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">TWOSSU TODO</h1>
      <div className="flex w-full h-12 gap-3 mb-8">
        <input
          className="flex-1 rounded-xl border border-gray-500 p-4 focus:outline-none "
          placeholder="할 일 입력"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <Button mode="add" onClick={handleAdd}>
          할 일 추가
        </Button>
      </div>
      <div className="flex gap-6 w-full justify-center">
        <div className="flex flex-col w-60">
          <h2 className="flex justify-center font-bold mb-4">할 일</h2>
          <div className="flex flex-col gap-3">
            {todos.map((task) => (
              <TodoItem
                key={task.id}
                task={task}
                mode="complete"
                onAction={completeTask}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col w-60">
          <h2 className="flex justify-center font-bold mb-4">완료</h2>
          <div className="flex flex-col gap-3">
            {doneTasks.map((task) => (
              <TodoItem
                key={task.id}
                task={task}
                mode="delete"
                onAction={deleteTask}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
