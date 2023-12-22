import { io } from "socket.io-client";

// auto connect
const socket = io(import.meta.env.VITE_BASE_ENDPOINT);

export default socket;
