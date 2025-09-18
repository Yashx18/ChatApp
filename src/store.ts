import { create } from "zustand";

interface roomData {
  room: string;
  setRoom: (value: string) => void;
}

export const useRoom = create<roomData>((set) => ({
  room: "",
  setRoom: (value) => set({ room: value }),
}));

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
  connect: () => void;
}

export const useMembers = create<MembersData>((set) => ({
  members: 0,

  connect: () => {
    const ws = useWebSocket.getState().ws;

    if (ws) {
      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);

          if (
            (data.type === "system" || data.type === "chat") &&
            typeof data.userCount === "number"
          ) {
            set({ members: data.userCount });
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
