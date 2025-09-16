import "./App.css";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Chat from "./pages/Chat";
import Connecting from "./pages/Connecting";

function App() {

  return (
    <div className="bg-[#0a0a0a] w-screen h-screen flex items-center justify-center">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/chat" element={<Chat />}></Route>
        <Route path="/connecting" element={<Connecting />}></Route>
      </Routes>
    </div>
  );
}

export default App;
