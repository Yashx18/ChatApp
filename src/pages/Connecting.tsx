import { useRef } from "react";
import { randomHash } from "../utils";
import { useNavigate } from "react-router-dom";
import { useWebSocket } from "../store";

const Connecting = () => {
	const navigate = useNavigate();
	const { ws } = useWebSocket();
  const usernameRef = useRef<HTMLInputElement>(null);
  const createRoom = () => {
    const username = usernameRef.current?.value;

    console.log(username);
    if (usernameRef.current) {
      usernameRef.current.value = "";
    }
    const roomId = randomHash(10);
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
        	// setAllMessages((mes) => [...mes, ev.data]);
          };
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="w-screen h-full flex items-center justify-center bg-[#0e0e0e] font-geist ">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createRoom();
        }}
        className="w-full max-w-80 h-auto border rounded-2xl border-[#f2f2f2] text-[#f2f2f2] flex items-center flex-col justify-center px-4 py-4"
      >
        <span className="text-lg my-2">What should we call you ?</span>
        <input
          type="text"
          className="bg-[#000000] border px-4 py-3 border-[#333333] rounded-xl mb-2 w-full focus-within:border-[#e0e0e0] focus-within:outline-none text-center placeholder:font-light"
          placeholder="Enter name here..."
          ref={usernameRef}
        />
        <button
          type="submit"
          className="bg-[#ffffff] text-black w-full py-3 rounded-xl cursor-pointer font-md text-lg hover:bg-[#f5f5f5] border-none outline-none mt-1"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
export default Connecting;
