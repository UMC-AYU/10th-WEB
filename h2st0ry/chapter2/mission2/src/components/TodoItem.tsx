import type { Todo } from "../types/todo";
import { useTodo } from "../context/TodoContext";

interface TodoItemProps {
  item: Todo;
}

const TodoItem = ({ item }: TodoItemProps) => {
  const { completeTodo, deleteTodo } = useTodo();

  return (
    <div
      className="
        flex justify-between items-center
        px-[12px] py-[10px]
        bg-[rgb(241,241,241)]
        dark:bg-gray-700
        rounded-[8px]
        transition-all
      "
    >
      <span>{item.text}</span>

      {item.completed ? (
        <button
          onClick={() => deleteTodo(item.id)}
          className="
            flex items-center justify-center
            px-2 py-1
            text-sm
            rounded-md
            bg-red-500 text-white
            transition-all
          "
        >
          삭제
        </button>
      ) : (
        <button
          onClick={() => completeTodo(item.id)}
          className="
            flex items-center justify-center
            px-2 py-1
            text-sm
            rounded-md
            bg-[rgb(97,201,65)] text-white
            hover:opacity-90
            transition-all
          "
        >
          완료
        </button>
      )}
    </div>
  );
};

export default TodoItem;
