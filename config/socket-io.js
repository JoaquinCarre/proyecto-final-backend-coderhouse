import { io } from "../app.js";
import messageAPI from '../controllers/messagesController.js';
import { logger } from "../logs/logger.js";

function setEvents() {
    io.on("connection", async (socket) => {
        logger.info(`usuario id "${socket.id}" conectado`);

        //CENTRO DE MENSAJES - CHAT
        const messages = await messageAPI.readAllMessages();
        socket.emit("history-messages", { messages });
        socket.on("chat message", async (data) => {
            await messageAPI.sendNewMessage(data);
            const messages2 = await messageAPI.readAllMessages();
            io.sockets.emit("notification", { messages2 });
        });

        socket.on("disconnect", () => {
            logger.info("usuario desconectado");
        });
    });
}

export { setEvents };