const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const doneList = document.getElementById("doneList");

let isComposing = false;

// IME 입력 중인 경우 Enter 키 이벤트 무시
todoInput.addEventListener("compositionstart", () => {
    isComposing = true;
});

// IME 입력이 끝난 경우 Enter 키 이벤트 처리
todoInput.addEventListener("compositionend", () => {
    isComposing = false;
});

// 할 일 생성 함수
todoInput.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    if (isComposing || event.isComposing) return;

    const text = todoInput.value.trim();
    if (!text) return;

    const item = createTodoItem(text);
    todoList.appendChild(item);
    todoInput.value = "";
});

function createTodoItem(text) {
    // <li> 요소 생성
    const li = document.createElement("li");
    li.className = "todo-item";

    // <span> 요소 생성
    const span = document.createElement("span");
    span.className = "text";
    span.textContent = text;

    // 완료 <button> 요소 생성
    const doneBtn = document.createElement("button");
    doneBtn.textContent = "완료";
    doneBtn.addEventListener("click", () => {
        li.classList.add("done");
        doneList.appendChild(li);
        doneBtn.remove(); // 완료 버튼 제거
    });

    // 삭제 <button> 요소 생성
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "삭제";
    deleteBtn.addEventListener("click", () => {
        li.remove();
    });

    const actions = document.createElement("div");
    actions.appendChild(doneBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(actions);

    return li;
};