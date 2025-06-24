import {List, Map} from 'immutable';
import {expect} from 'chai';  


describe('immutability', () => {

    function addMovie(currentState, movie) {
        return currentState.update('movies', movies => movies.push(movie));
    }
    //A number is immutable!! The old state remains unchanged after the operation
    describe('a number', () => {

        function increment(currentState) {
            return currentState + 1;
        }

        it('is immutable', () => {
            let state = 42;
            let nextState = increment(state);

            expect(nextState).to.equal(43);
            expect(state).to.equal(42);
        });

    });

    //A list can have an add operation that produces a new list that is the old list and the new movies combined
    describe('a list', () => {

        function addMovie(currentState, movie) {
            return currentState.push(movie);
        }

        it('is immutable', () => {
            let state = List.of('The Matrix', 'Inception');
            let nextState = addMovie(state, 'Interstellar');

            expect(nextState).to.equal(List.of(
                'The Matrix', 
                'Inception', 
                'Interstellar'
            ));
            expect(state).to.equal(List.of(
                'The Matrix', 
                'Inception'
            ));
        });

        //Applying an op to a full state tree involves producing a new state tree that is the old state tree with the operation applied to it
        describe('a tree', () => {

            function addMovie(currentState, movie) {
                return currentState.set(
                    'movies', 
                    currentState.get('movies').push(movie)
                );
            }

            it('is immutable', () => {
                let state = Map({
                    movies: List.of(
                        "The Matrix", 
                        "Inception")
                    });
                let nextState = addMovie(state, 'Interstellar');

                expect(nextState).to.equal(Map({
                    movies: List.of(
                        "The Matrix", 
                        "Inception", 
                        "Interstellar"
                    )
                }));

                expect(state).to.equal(Map({
                    movies: List.of(
                        "The Matrix", 
                        "Inception"
                    )
                }));
            });
        });
    });
});