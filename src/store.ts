import { create } from "zustand";
import { persist } from "zustand/middleware";

interface roomData {
  room: string;
  setRoom: (value: string) => void;
}

export const useRoom = create<roomData>()(
  persist(
    (set: any) => ({
      room: "",
      setRoom: (value: any) => set({ room: value }),
    }),
    {
      name: "room-storage",
    }
  )
);
interface usernameData {
  username: string;
  setUsername: (value: string) => void;
}

export const useUsername = create<usernameData>((set) => ({
  username: "",
  setUsername: (value) => set({ username: value }),
}));

interface WebSocketData {
  ws: WebSocket | null;
  connect: () => void;
}
const API_URL = import.meta.env.VITE_API_URL;

export const useWebSocket = create<WebSocketData>((set) => ({
  ws: null,

  connect: () => {
    const ws = new WebSocket(API_URL);

    ws.onopen = () => {
      console.log("Connected to server");
    };

    set({ ws });
  },
}));

interface MembersData {
  members: number;
  joined: any[];
  connect: () => void;
}

export const useMembers = create<MembersData>((set) => ({
  members: 0,
  joined: [],
  connect: () => {
    const ws = useWebSocket.getState().ws;

    if (ws) {
      ws.onopen = () => {
        ws.send(
          JSON.stringify({
            type: "join",
            payload: {
              roomId: useRoom.getState().room,
              name: useUsername.getState().username || "Anonymous",
            },
          })
        );
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          // console.log(data);

          if (
            (data.type === "system" || data.type === "chat") &&
            typeof data.userCount === "number"
          ) {
            set({ members: data.userCount });
          }
          if (data.type === "system") {
            set((state: MembersData) => ({ joined: [...state.joined, data] }));
          }
        } catch (err) {
          console.error("Failed to parse WS message:", err);
        }
      };

      ws.onclose = () => {
        set({ members: 0 });
      };
    }
  },
}));
