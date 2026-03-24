import type { TodoSectionProps } from "../../types/todo";

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
            <button
              onClick={(): void => onAction(todo)}
              className={`render-container__item-button render-container__item-button--${actionVariant}`}
            >
              {actionLabel}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoSection;
