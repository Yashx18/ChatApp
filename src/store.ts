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
  setWS: (value: WebSocket) => void;
}

export const useWebSocket = create<WebSocketData>((set) => ({
  ws: null,
  setWS: (value) => set({ ws: value }),
}));
