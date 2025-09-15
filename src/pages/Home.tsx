import { useEffect, useRef, useState } from "react";
import { MdChat } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { randomHash } from "../utils";
import { useRoom } from "../store";
import { useUsername } from "../store";

const Home = () => {
  const navigate = useNavigate();
  
  const inputRef = useRef(null);
  const API_URL = import.meta.env.VITE_API_URL;
  const wsRef = useRef<WebSocket | null>(null);
  const [allMessages, setAllMessages] = useState<string[]>([]);
  
  const { setRoom } = useRoom();
  useEffect(() => {
    const ws = new WebSocket(API_URL);
    wsRef.current = ws;
    console.log(ws);

    ws.onopen = () => {
      console.log("Server running");
    };
  }, []);

  const roomRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");

  const join = () => {
    const roomVal = roomRef.current?.value;
    const usernameVal = usernameRef.current?.value;
    const ws = wsRef.current;
    console.log(roomVal, usernameVal);
    if (ws) {
      try {
        ws.send(
          JSON.stringify({
            type: "join",
            payload: {
              name: username,
              roomId: roomId,
            },
          })
        );
        console.log("reached here");

        navigate("/chat");

        ws.onmessage = (ev) => {
          console.log(ev.data);
          setAllMessages((mes) => [...mes, ev.data]);
        };
      } catch (error) {
        console.error(error);
      }
    }

    console.log(roomId, username);
    setRoomId("");
    setUsername("");
    if (roomRef.current) roomRef.current.value = "";
    if (usernameRef.current) usernameRef.current.value = "";
  };

  const createRoom = () => {
    const roomId = randomHash(10);
    setRoom(roomId);
    const ws = wsRef.current;
    if (ws) {
      try {
        ws.send(
          JSON.stringify({
            type: "join",
            payload: {
              roomId: roomId,
            },
          })
        );
        console.log("reached here");

        navigate("/chat");

        ws.onmessage = (ev) => {
          console.log(ev.data);
          setAllMessages((mes) => [...mes, ev.data]);
        };
      } catch (error) {
        console.error(error);
      }
    }
  };

  // const sendMsg = () => {
  //   // @ts-ignore
  //   const inputVal = inputRef.current?.value;
  //   console.log(inputVal);
  //   wsRef.current?.send(
  //     JSON.stringify({
  //       type: "chat",
  //       payload: {
  //         name: "ken",
  //         message: `${inputVal}`,
  //       },
  //     })
  //   );
  // };

  return (
    <div
      className="flex flex-col items-center justify-between h-full w-full max-w-3xl text-[#ebebeb] bg-[#0e0e0e]
    shadow-lg"
    >
      <div className="flex items-center flex-col justify-center mt-18">
        <h1 className="text-5xl font-medium font-instrument-serif italic mb-1">
          Chit Chat
        </h1>
        <span className="text-md font-light text-[#acacac]">
          Real-time end-to-end encrypted anonymous chats
        </span>
      </div>
      <div className="w-full max-w-100 flex flex-col items-center justify-center font-geist">
        <span className="font-light mb-2">Join Private Chat</span>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            join();
          }}
        >
          <input
            type="text"
            ref={roomRef}
            onChange={(e) => {
              setRoom(e.target.value);
            }}
            className="bg-[#000000] border px-4 py-3 border-[#333333] rounded-full mb-2 w-full focus-within:border-[#e0e0e0] focus-within:outline-none text-center placeholder:font-light"
            placeholder="Enter Room Code"
          />
          <input
            type="text"
            ref={usernameRef}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            className="bg-[#000000] border px-4 py-3 border-[#333333] rounded-full focus-within:border-[#e0e0e0] focus-within:outline-none w-full text-center placeholder:font-light"
            placeholder="What should we call you ?"
          />

          <button
            type="submit"
            className="bg-white text-black w-full py-3 mt-4 rounded-full cursor-pointer hover:bg-[#e7e7e7] font-semibold"
          >
            Join Room
          </button>
        </form>
        <span className="my-4 text-[#646464]">or</span>

        <button
          type="submit"
          className="bg-white text-black w-full py-3 rounded-full cursor-pointer hover:bg-[#e7e7e7] font-semibold flex items-center justify-center
          mb-2"
          onClick={createRoom}
        >
          <MdChat className="mr-2" />
          Start New Private Chat
        </button>
        <div className="border border-[#333333] w-full mt-4 flex flex-col items-start justify-center p-4 rounded-lg">
          <p>Available rooms</p>
          <p className="text-sm font-light text-[#646464]">
            No public rooms found. Create one or join with a code.
          </p>
        </div>
      </div>
      <p className="mb-2 text-[#646464] ">
        messages are end-to-end encrypted and never stored.
      </p>
    </div>
  );
};
export default Home;
