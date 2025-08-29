import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const inputRef = useRef(null);
  const wsRef = useRef<WebSocket | null>(null);
  const [allMessages, setAllMessages] = useState<string[]>([]);
  const sendMsg = () => {
    // @ts-ignore
    const inputVal = inputRef.current?.value;
    console.log(inputVal);
    wsRef.current?.send(
      JSON.stringify({
        type: "chat",
        payload: {
          name: "ken",
          message: `${inputVal}`,
        },
      })
    );
  };

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    wsRef.current = ws;

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: "join",
          payload: {
            name: "ken",
            roomId: "red",
          },
        })
      );
    };
    ws.onmessage = (ev) => {
      console.log(ev.data);
      setAllMessages((mes) => [...mes, ev.data]);
    };
    return () => {
      ws.close();
    };
  }, []);
  return (
    <div className="h-screen w-screen bg-[#212121] text-white flex items-center justify-center">
      <div className="border border-white flex flex-col items-center justify-center">
        <div className="w-full h-9/10 p-8 overflow-y-auto bg-black text-white">
          {allMessages.map((m) => (
            <div className="bg-white text-black px-4 py-2 rounded">{m}</div>
          ))}
        </div>
        <div className="flex items-center justify-center p-2">
          <input
            ref={inputRef}
            type="text"
            placeholder="Type message here !!"
            className="bg-[#cccccc] border-none rounded-md px-2 py-1 text-black focus-within:outline-1 outline-[#b1b1b1]"
          />
          <button
            className="bg-blue-500 px-2 py-1 rounded-md cursor-pointer font-medium font-mono ml-2  text-[#1a1a1a]"
            onClick={sendMsg}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
