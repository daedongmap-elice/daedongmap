import "./App.css";
import { FaBeer } from "react-icons/fa";

function App() {
  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <FaBeer />
      <details className="dropdown">
        <summary className="m-1 btn">open or close</summary>
        <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
          <li>
            <div>Item 1</div>
          </li>
          <p>폰트가 바뀌어쓴ㄴ지 확인 해봐요</p>
          <li>
            <div>Item 2</div>
          </li>
        </ul>
      </details>
    </>
  );
}

export default App;
