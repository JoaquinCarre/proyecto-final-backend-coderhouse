import express from "express";
import { createServer } from "http";
import { fileURLToPath } from 'url';
import path, { join } from 'path';
import { initPassport } from './config/passport.js';
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import { setEvents } from './config/socket-io.js';
import { create } from "express-handlebars";
import indexRouter from './routers/indexRouter.js';
import os from "os";
import cluster from "cluster";
import minimist from 'minimist';
import { logger } from './logs/logger.js';
import pug from 'pug';
import ejs from 'ejs';

export const argv = minimist(process.argv.slice(2), {
    default: { cluster: false },
    alias: { ec: 'cluster' }
});
const ENABLE_CLUSTER = argv.cluster;

const app = express();

const server = createServer(app);

export const io = new Server(server);

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

if (ENABLE_CLUSTER && cluster.isPrimary) {
    const numCPUs = os.cpus().length;
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    cluster.on('exit', (worker, code, signal) => {
        logger.info(`worker ${worker.process.pid} died`);
    });
} else {
    app.use('/', express.static(join(__dirname, '/public')));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());

    initPassport();

    const hbs = create();
    app.engine("handlebars", hbs.engine);
    app.set("views", path.join(__dirname, "views"));
    app.set("view engine", "handlebars");

    app.engine('pug', pug.__express);
    app.set('view engine', 'pug');
    app.set('views', path.join(__dirname, 'views'));

    app.engine('ejs', ejs.renderFile);
    app.set('view engine', 'ejs');
    const errorViewPath = path.join(__dirname, 'views', 'error.ejs');
    
    app.use('/', indexRouter)

    app.use((err, _, res, next) => {
        // Renderiza la vista de error con EJS y los detalles del error
        res.status(500);
        res.render(errorViewPath, { id: err.id, message: err.message });
      });

    setEvents();

    const PORT = process.env.PORT || 8080;

    server.listen(PORT, '0.0.0.0', () => {
        logger.info(
            `Servidor http esta escuchando en el puerto ${PORT}`
        );
        logger.info(`http://localhost:${PORT}`);
        logger.info(`Environment:${process.env.ENV}`);
    });

    server.on("error", (error) => logger.error(`Error en servidor ${error}`));
}