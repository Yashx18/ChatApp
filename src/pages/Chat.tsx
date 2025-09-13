import { FaPaperPlane } from "react-icons/fa";

const Chat = () => {
  console.log("Reached here");

  return (
    <div className="w-screen h-full flex items-center justify-center bg-[#0a0a0a] text-[#ebebeb]">
      <div
        className="bg-[#0e0e0e] w-full max-w-3xl h-full flex flex-col items-center 
	  justify-between px-6"
      >
        <div className="w-full py-4 flex items-center justify-between">
          <span className="">Chit Chat</span>
          <span className="">Chit Chat</span>
          <span className="">Chit Chat</span>
        </div>
        <div className="w-full h-10/12 border border-[#ffffff52] rounded-t-xl flex items-center justify-center flex-col bg-[#0a0a0a] relative">
          No messages yet. Start the Conversation!
          <div className="w-full absolute bottom-0 flex px-2 py-2">
            <input type="text" className="border border-white w-full rounded-lg" placeholder="Type a message .."/>
            <span className="p-2 bg-purple-600 flex items-center justify-center rounded-full">
              <FaPaperPlane className="size-6" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Chat;
