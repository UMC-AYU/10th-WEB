const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const completeList = document.getElementById("complete-list");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const text = input.value.trim();
  if (!text) return;

  const item = document.createElement("div");
  item.className = "complete-container__item";

  const span = document.createElement("span");
  span.textContent = text;

  const completeBtn = document.createElement("button");
  completeBtn.textContent = "완료";
  completeBtn.className = "todo-button--complete";

  completeBtn.addEventListener("click", function () {
    item.remove();
    completeList.appendChild(item);

    completeBtn.remove();

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "삭제";
    deleteBtn.className = "todo-button--delete";

    deleteBtn.addEventListener("click", function () {
      item.remove();
    });

    item.appendChild(deleteBtn);
  });

  item.appendChild(span);
  item.appendChild(completeBtn);

  todoList.appendChild(item);

  input.value = "";
});
