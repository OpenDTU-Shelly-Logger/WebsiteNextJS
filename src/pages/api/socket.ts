import { NextApiRequest } from "next";
import { Server } from "socket.io";
import type { NextApiResponseWithSocket } from "@/types/next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponseWithSocket,
) {
  if (res.socket.server.io) {
    console.log("Socket.io is already running");
    res.end();
    return;
  }

  console.log("Initializing Socket.io server...");

  const io = new Server(res.socket.server as any, {
    path: "/api/socket",
    addTrailingSlash: false,
    cors: {
      origin: "*", //todo change to domain
    },
  });

  res.socket.server.io = io;
  (global as any).io = io;

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);
    socket.on("disconnect", () => console.log("Client disconnected"));
  });

  res.end();
}
