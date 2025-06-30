import express, { Application } from "express";
import http from "http";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { Server as SocketIOServer } from "socket.io";
import { typeDefs } from "./graphql/schema";
import { resolvers } from "./graphql/resolvers";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app: Application = express();
app.use(cors());

const httpServer = http.createServer(app);
const io = new SocketIOServer(httpServer, {
  cors: { origin: "*" },
});

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({ io }),
  });

  await server.start();
  server.applyMiddleware({ app: app as any });

  io.on("connection", (socket) => {
    console.log(" New user connected:", socket.id);

    socket.on("joinEvent", async ({ eventId }) => {
      socket.join(eventId);
      console.log(`User joined event room: ${eventId}`);

      const checkIns = await prisma.checkIn.findMany({
        where: { eventId },
      });

      io.to(eventId).emit("usersCheckedIn", checkIns);
    });

    socket.on("checkIn", async ({ eventId, userName }) => {
      console.log(` Check-in request for user ${userName} in event ${eventId}`);

      await prisma.checkIn.create({
        data: { eventId, userName },
      });

      const checkIns = await prisma.checkIn.findMany({
        where: { eventId },
      });

      io.to(eventId).emit("usersCheckedIn", checkIns);
    });

    socket.on("disconnect", () => {
      console.log(" User disconnected:", socket.id);
    });
  });

  httpServer.listen(4000, () => {
    console.log(" Server running at http://localhost:4000/graphql");
  });
}

startServer();
