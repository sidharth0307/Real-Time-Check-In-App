import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    events: async () => {
      return await prisma.event.findMany({
        include: { checkIns: true },
      });
    },
    event: async (_: any, args: { id: string }) => {
      return await prisma.event.findUnique({
        where: { id: args.id },
        include: { checkIns: true },
      });
    },
  },

  Mutation: {
    createEvent: async (_: any, args: { name: string; date: string }) => {
      return await prisma.event.create({
        data: {
          name: args.name,
          date: args.date,
        },
      });
    },

    checkInUser: async (
      _: any,
      args: { eventId: string; userName: string },
      context: { io: any }
    ) => {

    const event = await prisma.event.findUnique({
        where: { id: args.eventId },
    });

    if (!event) {
        throw new Error("Event not found. Please provide a valid eventId.");
    }
    
      const checkIn = await prisma.checkIn.create({
        data: {
          userName: args.userName,
          eventId: args.eventId,
        },
      });


      context.io.to(args.eventId).emit("newCheckIn", checkIn);

      return checkIn;
    },
  },
};
