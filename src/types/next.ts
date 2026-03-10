import { Server as NetServer, Socket } from "net";
import { NextApiResponse } from "next";
import { Server as IOServer } from "socket.io";

export type NextApiResponseWithSocket = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io?: IOServer;
    };
  };
};
