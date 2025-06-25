import {List, Map} from 'immutable';
import {expect} from 'chai';
import {setEntries, next, vote} from '../src/core';


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

    describe('next', () => {

        it('takes the next two entries under vote', () => {
            const state = Map({
                entries: List.of('Interstellar', 'The Matrix', 'Inception')
            });
            const nextState = next(state);
            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('Interstellar', 'The Matrix')
                }),
                entries: List.of('Inception')
            }));
        });

        it('puts winner of current vote back to entries', () => {
            const state = Map({
                vote: Map({
                    pair: List.of('Interstellar', 'The Matrix'),
                    tally: Map({
                        'Interstellar': 3,
                        'The Matrix': 2
                    })
                }),
                entries: List.of('Inception', 'Dunkirk', 'Tenet')
            });
            const nextState = next(state);
            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('Inception', 'Dunkirk')
                }),
                entries: List.of('Tenet', 'Interstellar')
            }));
        });

        it('puts both from tied vote back to entries', () => {
            const state = Map({
                vote: Map({
                    pair: List.of('Interstellar', 'The Matrix'),
                    tally: Map({
                        'Interstellar': 3,
                        'The Matrix': 3
                    })
                }),
                entries: List.of('Inception', 'Dunkirk', 'Tenet')
            });
            const nextState = next(state);
            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('Inception', 'Dunkirk')
                }),
                entries: List.of('Tenet', 'Interstellar', 'The Matrix')
            }));
        });

    });

    describe('vote', () => {

        it('creates a tally for the voted entry', () => {
            const state = Map({
                vote: Map({
                    pair: List.of('Interstellar', 'The Matrix')
                }),
                entries: List()
            });
            const nextState = vote(state, 'Interstellar');
            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('Interstellar', 'The Matrix'),
                    tally: Map({
                        'Interstellar': 1
                    })
                }),
                entries: List()
            }));
        });

        it('adds to existing tally for voted entry', () => {
            const state = Map({
                vote: Map({
                    pair: List.of('Interstellar', 'The Matrix'),
                    tally: Map({
                        'Interstellar': 3,
                        'The Matrix': 2
                    })
                }),
                entries: List()
            });
            const nextState = vote(state, 'Interstellar');
            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('Interstellar', 'The Matrix'),
                    tally: Map({
                        'Interstellar': 4,
                        'The Matrix': 2
                    })
                }),
                entries: List()
            }));
        });

    });

});