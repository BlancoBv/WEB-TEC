import { useState } from "react";
import "./App.css";

import Header from "./layout/Header";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="vh-100 vw-100">
      <Header />
    </div>
  );
}

export default App;
