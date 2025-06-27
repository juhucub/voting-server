import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {

    it('handles SET_ENTRIES', () => {
        const initialState = Map();
        const action = {type: 'SET_ENTRIES', entries: ['The Matrix']};
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            entries: ['The Matrix']
        }));
    });
    
    it('handles NEXT', () => {
        const initialState = fromJS({
            entries: ['The Matrix', 'Inception']
        });
        const action = {type: 'NEXT'};
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ['The Matrix', 'Inception']
            },
            entries: []
        }));
    });

    it('handles VOTE', () => {
        const initialState = fromJS({
            vote: {
                pair: ['The Matrix', 'Inception'],
            },
            entries: []
        });
        const action = {type: 'VOTE', entry: 'The Matrix'};
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ['The Matrix', 'Inception'],
                tally: {
                    'The Matrix': 1,
                }
            },
            entries: []
        }));
    });

    it('has an initial state', () => {
        const action = {type: 'SET_ENTRIES', entries: ['The Matrix']};
        const nextState = reducer(undefined, action);

        expect(nextState).to.equal(fromJS({
            entries: ['The Matrix']
        }));
    });

    it('can be used with reducer', () => {
        const actions = [
            {type: 'SET_ENTRIES', entries: ['The Matrix', 'Inception']},
            {type: 'NEXT'},
            {type: 'VOTE', entry: 'The Matrix'},
            {type: 'VOTE', entry: 'Inception'},
            {type: 'VOTE', entry: 'The Matrix'},
            {type: 'NEXT'}
        ];
        const finalState = actions.reduce(reducer, Map());
        expect(finalState).to.equal(fromJS({
            winner: 'The Matrix'
        }));
    });
});