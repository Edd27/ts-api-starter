import { Server } from "socket.io";
import { server } from "../config/http";

export const socket = new Server(server, {
  cors: {
    origin: "*",
  },
});

socket.on("connection", (socket) => {
  // eslint-disable-next-line no-console
  console.log("Client connected");

  socket.on("disconnect", () => {
    // eslint-disable-next-line no-console
    console.log("User disconnected");
  });
});
