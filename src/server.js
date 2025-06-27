import { Server } from 'socket.io';


/* How the server works
*1. Cient sends an action to the server
*2. Server hands action to Redux store
*3. The store calls the reducer and the reducer executes the logic related to the action
*4. The store updates its state based on the return value of the reducer.
*5. The store executes the listener function subsribed by the server
*6. The server emits a 'state' event
*7. All conected clients - including the ones that initiated the original action - receive the new state
*/
export default function startServer(store) {
    const io = new Server().attach(8090);

    store.subscribe(
        () => io.emit('state', store.getState().toJS())
    );

    //listen to 'connection' events on server. When a client connects, we send the current state to the client immediately - very useful
    io.on('connection', (socket) => {
        socket.emit('state', store.getState().toJS());
        //Receiving remote Reduxe actions //FIXME: LOLOLOL HUGEST MEGA SECURITY :( any connected socket.io hacker can send any action to the store, so we should never use this)
        //Should be some kind of firewall here, one similar to the one in the client, which only allows certain actions to be sent to the store
        socket.on('action', store.dispatch.bind(store));
    });
}