import { useEffect, useRef, useState } from "react";
import { MdArrowUpward } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Copy, Check } from "lucide-react";
import MsgCard from "../components/msgCard";
import { useRoom } from "../store";
import { useWebSocket } from "../store";
import { useMembers } from "../store";
import { useUsername } from "../store";

const Chat = () => {
  useEffect(() => {
    connect();
  }, []);
  const { ws } = useWebSocket();
  const msgRef = useRef<HTMLInputElement>(null);
  const { room } = useRoom();
  const { members, connect, joined } = useMembers();
  const [copied, setCopied] = useState(false);
  const { username } = useUsername();

  const handleCopy = async () => {
    if (!room) return;
    try {
      await navigator.clipboard.writeText(room);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy roomId: ", err);
    }
  };

  const sendMsg = () => {
    if (!msgRef.current || !msgRef.current.value.trim()) return;

    const message = msgRef.current.value;
    console.log(username);
    console.log(joined);
    joined.push(message);
    

    if (ws ) {
      ws.send(
        JSON.stringify({
          type: "chat",
          payload: {
            roomId: room,
            name: username,
            message: message,
          },
        })
      );
    } else {
      console.warn("WebSocket is not connected.");
    }

    msgRef.current.value = "";
  };

  return (
    <div className="w-screen h-full flex items-center justify-center bg-[#0a0a0a] text-[#ebebeb]">
      <div
        className="bg-[#0e0e0e] w-full max-w-3xl h-full flex flex-col items-center 
	  justify-between px-6 shadow-lg"
      >
        <div className="w-full py-4 flex items-center justify-between">
          <Link to={"/home"}>
            <span className="font-instrument-serif italic text-2xl cursor-pointer">
              Chit Chat
            </span>
          </Link>

          <button
            onClick={handleCopy}
            className="flex items-center gap-2 border px-4 py-2 rounded-4xl bg-[#1d1d1d52] border-[#63636352] hover:bg-[#2a2a2a7a] transition"
          >
            <span className="font-mono">{room}</span>
            {copied ? (
              <Check className="w-4 h-4 text-green-500" />
            ) : (
              <Copy className="w-4 h-4 cursor-pointer text-gray-400" />
            )}
          </button>

          <span className="flex items-center justify-center px-3 py-1 border rounded-4xl bg-[#42424252] border-[#63636352]">
            <FiUsers className="size-5" />
            <span className="text-lg ml-2">{members}</span>
          </span>
        </div>

        <div className="w-full h-10/12 border-x border-t border-[#ffffff15] rounded-t-xl flex items-center justify-center flex-col bg-[#0a0a0a] relative text-[#a0a0a0]">
          <div className="w-full h-full px-2 py-2 flex items-center justify-center flex-col">
            {joined.map((e) => (
              <MsgCard text={e.message} by={e.type} />
            ))}
          </div>
          <form
            className="w-full flex p-2 rounded-xl border-t border-[#ffffff1e]"
            onSubmit={(e) => {
              e.preventDefault();
              sendMsg();
            }}
          >
            <input
              ref={msgRef}
              type="text"
              className="mr-2 w-full rounded-lg px-2 py-1 focus-within:outline-none text-lg text-white font-geist font-light placeholder:font-light placeholder:text-md"
              placeholder="Type a message..."
            />
            <button
              className="p-2 bg-white flex items-center justify-center rounded-full focus-within:outline-none cursor-pointer hover:bg-[#cfcfcf]"
              type="submit"
            >
              <MdArrowUpward className="size-6 text-black" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Chat;
