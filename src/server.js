import {Server} from 'socket.io';

export default function startServer() {
    const io = new Server(4000);
}