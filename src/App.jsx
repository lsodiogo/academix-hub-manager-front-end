import { useState } from "react";
import reactLogo    from "../public/images/logo.png";


function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://localhost:3000" target="_blank">
          <img src={reactLogo} alt="Login"/>
          {console.log("olá")}
        </a>
      </div>

      <h1>ACADEMIX HUB MANAGER</h1>

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  );
};


export default App;