import { useTodo } from "../../context/TodoProvider";
import TodoItem from "./todoItem";
import "./todoitem.css";

const TodoList = () => {
  const { doingTodos, doneTodos } = useTodo();

  return (
    <div className="todo-list">
      <div className="todo-column">
        <h2 className="todo-column__title">할 일</h2>
        <div className="todo-column__items">
          {doingTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} isDone={false} />
          ))}
        </div>
      </div>

      <div className="todo-column">
        <h2 className="todo-column__title">완료</h2>
        <div className="todo-column__items">
          {doneTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} isDone={true} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodoList;
