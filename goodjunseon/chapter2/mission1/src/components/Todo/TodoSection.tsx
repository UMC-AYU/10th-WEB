import type { TodoSectionProps } from "../../types/todo";
import Button from "./Button";

const TodoSection = ({
  title,
  items,
  actionLabel,
  actionVariant,
  onAction,
}: TodoSectionProps) => {
  return (
    <div className="render-container__section">
      <h2 className="render-container__title">{title}</h2>
      <ul className="render-container__list">
        {items.map((todo) => (
          <li key={todo.id} className="render-container__item">
            <span className="render-container__item-text">{todo.text}</span>
            <Button
              label={actionLabel}
              variant={actionVariant}
              onClick={(): void => onAction(todo)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoSection;
