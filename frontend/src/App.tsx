import { useState } from "react";
import "./App.scss";
import { Button } from "./components/Button/Button";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Button />
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  );
}

export default App;
