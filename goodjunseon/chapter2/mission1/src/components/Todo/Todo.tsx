import { useTodo } from "../../hooks/useTodo";
import TodoForm from "./TodoForm";
import TodoSection from "./TodoSection";

const Todo = () => {
  const {
    todos,
    doneTodos,
    input,
    setInput,
    addTodo,
    completeTodo,
    deleteTodo,
  } = useTodo();

  return (
    <div className="todo-container">
      <h1 className="todo-container__header">JUNSEON TODO</h1>
      <TodoForm value={input} onChange={setInput} onSubmit={addTodo} />

      <div className="render-container">
        <TodoSection
          title="할 일"
          items={todos}
          actionLabel="완료"
          actionVariant="complete"
          onAction={completeTodo}
        />
        <TodoSection
          title="완료"
          items={doneTodos}
          actionLabel="삭제"
          actionVariant="delete"
          onAction={deleteTodo}
        />
      </div>
    </div>
  );
};
export default Todo;
