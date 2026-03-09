import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
  path: "/dataSocket",
  cors: {
    origin: ["http://localhost:3005"],
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket: any) => {
  console.log("Client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

export function emitLiveData(data: any) {
  io.emit("liveSolar", data);
}

export function emitAllData(data: any) {
  io.emit("historyData", data);
}

export function emitPowerData(data: any) {
  io.emit("livePower", data);
}

httpServer.listen(3005, () => {
  console.log("WebSocket server running on port 3005");
});
