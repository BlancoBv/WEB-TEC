import { useState } from "react";
import "./App.css";

import Header from "./layout/Header";
import Content from "./layout/Content";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="vh-100 vw-100">
      <Header />
      <Content />
    </div>
  );
}

export default App;
