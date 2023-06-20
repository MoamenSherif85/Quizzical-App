import { useState } from "react";
import Main from "./components/Main";
import imgTop from './images/blob top.png'
import imgBottom from './images/blob bottom.png'
import Quiz from "./components/Quiz";

function App() {
  const [appStart, setAppStart] = useState(false);

  return (
    <div className="App">
      <img src={imgTop} className="img-top" alt="" />
      <img src={imgBottom} className="img-bottom" alt="" />
      {
        appStart ?
        <Quiz />
        :
        <Main setAppStart={setAppStart} />
      }
    </div>
  );
}

export default App;
