import { Socket } from "socket.io";
import { prisma } from "./db";

// TODO: send message
// TODO: message received
// TODO: message read
// TODO: message delivered

interface MessageToBeDelivered {
  recepient: string;
  content: string;
  embeddedFile: string;
}

export const socketHandler = (socket: Socket) => {
  console.log(socket);

  socket.on("send-message", async (msg: MessageToBeDelivered) => {
    const usersHaveConversed = await prisma.conversation.findUnique({
      where: {},
    });

    const recepient = await prisma.user.findUnique({
      where: {
        uuid: msg.recepient,
      },
    });

    const newMessage = prisma.message.create({
      data: {
        recepient: {
          uuid: msg.recepient,
        },
        content: msg.content,
        embeddedFile: msg.embeddedFile,
      },
    });
  });
};
