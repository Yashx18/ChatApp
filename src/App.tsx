import { useEffect, useRef, useState } from "react";
import "./App.css";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";

function App() {
  const API_URL = import.meta.env.VITE_API_URL;
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
    if (ws) {
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
  };
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
    const ws = new WebSocket(API_URL);
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
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/home" element={<Home/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
