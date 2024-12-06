import { Server } from "socket.io";

let io;

export default function setupSocket(server) {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173", // Allow this origin
      methods: ["GET", "POST"], // HTTP methods allowed
      allowedHeaders: ["Content-Type", "Authorization"], // Headers allowed
      credentials: true, // Allow cookies if needed
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    // Handle new user notifications
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });

  return io;
}

export function getIO() {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
}
