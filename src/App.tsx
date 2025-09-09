import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const inputRef = useRef(null);
  const wsRef = useRef<WebSocket | null>(null);
  const [allMessages, setAllMessages] = useState<string[]>([]);

  const roomRef = useRef<any>(null);
  const usernameRef = useRef<any>(null);
  const joinRoom = () => {
    const roomVal = roomRef.current?.value;
    const usernameVal = usernameRef.current?.value;
    const ws = wsRef.current;
    console.log(roomVal, usernameVal);
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

    
  }
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
    <div className="bg-[#0a0a0a] w-screen h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center border-white w-full max-w-200 border h-auto text-white">
        <h1 className="text-4xl font-semibold mb-4">Chat Buddy</h1>
        <div className="w-full max-w-100 flex flex-col items-center justify-center">
          <input
            type="text"
            ref={roomRef}
            className="bg-[#000000] border px-4 py-2 border-white rounded-md mb-2 w-full focus-within:outline-none"
            placeholder="Room Code"
          />
          <input
            type="text"
            ref={usernameRef}
            className="bg-[#000000] border px-4 py-2 border-white rounded-md focus-within:outline-none w-full"
            placeholder="Username"
          />

          <button
            type="submit"
            className="bg-white text-black w-full py-2 mt-2 rounded-md cursor-pointer hover:bg-[#e7e7e7] font-medium"
            onClick={joinRoom}
          >
            Join Room
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
