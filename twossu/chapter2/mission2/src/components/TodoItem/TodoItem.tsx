import Button from "../Button/Button";
import type { Task } from "../../context/TodoProvider";

interface TodoItemProps {
  task: Task;
  mode: "complete" | "delete";
  onAction: (task: Task) => void;
}

const TodoItem = ({ task, mode, onAction }: TodoItemProps) => {
  const handleAction = () => {
    onAction(task);
  };

  return (
    <div className="flex justify-between items-center bg-amber-100 rounded-xl p-3 gap-2 ">
      <span>{task.text}</span>
      <Button mode={mode} onClick={handleAction}>
        {mode === "complete" ? "완료" : "삭제"}
      </Button>
    </div>
  );
};

export default TodoItem;
