import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [skt, setSkt] = useState<WebSocket>();
  const inputRef = useRef(null);
  const sendMsg = () => {
    // @ts-ignore
    const inputVal = inputRef.current?.value;
    console.log(inputVal);
    
    skt?.send(inputVal);
  };

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    setSkt(ws);
    ws.onmessage = (ev) => {
      console.log(ev.data);
    };
  }, []);
  return (
    <div className="h-screen w-screen bg-[#212121] text-white flex items-center justify-center">
      <div className="border border-white flex flex-col items-center justify-center">
        <div className="w-full h-auto p-8"></div>
        <div className="flex items-center justify-center p-2">
          <input
            ref={inputRef}
            type="text"
            placeholder="Type message here !!"
            className="bg-[#cccccc] border-none rounded-md px-2 py-1 text-black focus-within:outline-1 outline-[#b1b1b1]"
          />
          <button className="bg-blue-500 px-2 py-1 rounded-md cursor-pointer font-medium font-mono ml-2  text-[#1a1a1a]" onClick={sendMsg}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
