type Todo = {
  id: number;
  text: string;
};

const todos: Todo[] = [];

const container = document.createElement("div");
container.className = "todo-container";

const header = document.createElement("div");
header.className = "todo-container__header";

const title = document.createElement("header");
title.textContent = "Todo List";

header.appendChild(title);

const form = document.createElement("form");
form.className = "todo-container__form";

const input = document.createElement("input");
input.className = "todo-container__input";
input.type = "text";
input.placeholder = "할 일을 입력하세요";

const button = document.createElement("button");
button.className = "todo-container__button";
button.type = "submit";
button.textContent = "추가";

form.appendChild(input);
form.appendChild(button);

const list = document.createElement("div");
list.className = "todo-container__items";

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!input.value.trim()) return;

  const newTodo: Todo = {
    id: Date.now(),
    text: input.value,
  };

  todos.push(newTodo);

  const item = document.createElement("div");
  item.className = "todo-container__item";
  item.textContent = newTodo.text;

  list.appendChild(item);

  input.value = "";
});

container.appendChild(header);
container.appendChild(form);
container.appendChild(list);

document.body.appendChild(container);
