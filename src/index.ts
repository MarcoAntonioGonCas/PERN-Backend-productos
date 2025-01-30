import Server from './models/server'
import { showSuccess } from './utils/consoleUtil';

const server = new Server();

server.start(() => {
    showSuccess(`[server] Servidor corriendo en el puerto ${server.port}`);
});