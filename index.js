import makeStore from "./src/store";
import startServer from "./src/server";

export const store = makeStore();
/*SIncr we also export the store, you can fire up a node REPL and import the store to play with it interactively. e.g babel-node */
startServer();