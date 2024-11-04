
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";

import Posts from "./components/Posts";

function App() {


  return (
    <>
      <BrowserRouter>
        


        <Routes>
          <Route path="/" element={<Home />}></Route>

          <Route path="/posts" element={<Posts />}></Route>
  
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
