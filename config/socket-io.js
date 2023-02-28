import { io } from "../app.js";
/* import productServices from "../services/productServices.js"; */
import { logger } from "../logs/logger.js";

function setEvents() {
    io.on("connection", async (socket) => {
        logger.info(`usuario id "${socket.id}" conectado`);

        /* //AGREGADO DE PRODUCTOS
        const dataProducts = await productServices.getAll();
        socket.emit("history-products", dataProducts);
        socket.on("nuevoProducto", async (data) => {
            productServices.addProduct(data);
            logger.info("Se carga un nuevo producto");
            io.sockets.emit("productosActualizados", data);
        }) */

        socket.on("disconnect", () => {
            logger.info("usuario desconectado");
        });
    });
}

export { setEvents };