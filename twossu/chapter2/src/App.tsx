import Button from "./components/Button/Button";

function App() {
  return (
    <>
      <h1>TWOSSU TODO</h1>
      <input placeholder="할 일 입력" />
      <Button mode="add" onClick={() => {}}>
        추가
      </Button>{" "}
      <Button mode="delete" onClick={() => {}}>
        삭제
      </Button>{" "}
      <Button mode="complete" onClick={() => {}}>
        완료
      </Button>
    </>
  );
}

export default App;
