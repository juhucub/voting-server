import {legacy_createStore} from 'redux';
import reducer from './reducer';

//Redux store ties together the state, actions, and reducer.
//FIXME: DO NOT USE CREATESTORE for learning purposes only :3
export  default function makeStore() {
    return legacy_createStore(reducer);
}