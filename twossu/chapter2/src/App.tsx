import "./App.css";
import Button from "./components/Button/Button";

function App() {
  return (
    <div className="container">
      <h1>TWOSSU TODO</h1>

      <div className="input-section">
        <input className="input" placeholder="할 일 입력" />
        <Button mode="add" onClick={() => {}}>
          추가
        </Button>
      </div>

      <div className="todo-section">
        <div className="todo">
          <h2>할 일</h2>
          <Button mode="complete" onClick={() => {}}>
            완료
          </Button>
        </div>

        <div className="todo">
          <h2>완료</h2>
          <Button mode="delete" onClick={() => {}}>
            삭제
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;
