import { useTodo } from "../context/TodoContext";
import TodoItem from "./TodoItem";

const TodoList = ({ isCompleted }: { isCompleted: boolean }) => {
  const { todos } = useTodo();

  const filtered = todos.filter((todo) => todo.completed === isCompleted);

  return (
    <div className="flex flex-col items-center w-full">
      
      <div className="w-full text-center border-b border-[rgb(201,224,240)] text-[20px] mb-[15px] pb-[5px]">
        {isCompleted ? "완료" : "할 일"}
      </div>

      <div className="flex flex-col w-full gap-2">
        {filtered.map((item) => (
          <TodoItem key={item.id} item={item} />
        ))}
      </div>

    </div>
  );
};

export default TodoList;