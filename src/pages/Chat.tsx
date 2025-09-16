import { useEffect, useRef, useState } from "react";
import { MdArrowUpward } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { Link } from "react-router-dom";
import MsgCard from "../components/msgCard";
import { useRoom } from "../store";

const Chat = () => {
  const msgRef = useRef<HTMLInputElement>(null);
  const members = 1;
  const [msgArr, setMsgArr] = useState<string[]>([]);
  const { room } = useRoom();

  const sendMsg = () => {
    const msgVal = msgRef.current?.value;
    msgArr.push();
    if (msgRef.current) {
      msgRef.current.value = "";
    }
    if (msgVal) {
      setMsgArr([...msgArr, msgVal.trim()]);
    }
  };

  useEffect(() => {
    msgArr.map((item: any) => {
      console.log(item);
    });
  }, [msgArr]);
  
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
          <span className="border px-4 py-2 rounded-4xl bg-[#1d1d1d52] border-[#63636352]">
            {room}
          </span>
          <span className=" flex items-center justify-center px-3 py-1 border rounded-4xl bg-[#42424252] border-[#63636352]">
            <FiUsers className="size-5" />
            <span className="text-lg ml-2">{members}</span>
          </span>
        </div>
        <div className="w-full h-10/12 border-x border-t border-[#ffffff15] rounded-t-xl flex items-center justify-center flex-col bg-[#0a0a0a] relative text-[#a0a0a0]">
          <div className="w-full h-full px-2 py-2 flex items-center justify-center flex-col">
            No messages yet. Start the Conversation!
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
