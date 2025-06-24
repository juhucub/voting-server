import {List, Map} from 'immutable';
import {expect} from 'chai';

import {setEntries} from '../src/core';

describe('application logic'  , () => {

    //takes a previous state and a collection of entries and prdouces a state with entries included
    describe('setEntries', () => {

        it('adds the entries to the state', () => {
            const state = Map();
            const entries = List.of('Interstellar', 'The Matrix');
            const nextState = setEntries(state, entries);
            expect(nextState).to.equal(Map({
                entries: List.of('Interstellar', 'The Matrix')
            }));
        });

        it('converts to immutable', () => {
            const state = Map();
            const entries = ['Interstellar', 'The Matrix'];
            const nextState = setEntries(state, entries);
            expect(nextState).to.equal(Map({
                entries: List.of('Interstellar', 'The Matrix')
            }));
        });
    });
});