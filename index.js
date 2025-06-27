import makeStore from "./src/store";
import startServer from "./src/server";

export const store = makeStore();
/*SIncr we also export the store, you can fire up a node REPL and import the store to play with it interactively. e.g babel-node */
startServer(store);

// Set initial entries and trigger the first vote
store.dispatch({
    type: 'SET_ENTRIES',
    entries: require('./entries.json')
});
store.dispatch({type: 'NEXT'});