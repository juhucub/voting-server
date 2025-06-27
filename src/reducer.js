import {setEntries, next, vote, INITIAL_STATE} from './core';

//Our reducer delegates the work to the core functions, and knowns how to unpack additional arguments of each function from the action object
export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'SET_ENTRIES':
            return setEntries(state, action.entries);
        case 'NEXT':
            return next(state);
        case 'VOTE':
            return state.update('vote',
                                voteState => vote(voteState, action.entry));
    }
    return state;
    //if the reducer doresnt recognize the action, it returns the current state unchanged
}
