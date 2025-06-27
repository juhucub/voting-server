import {Map, fromJS} from 'immutable';
import {expect} from 'chai';    

import makeStore from '../src/store';

descrive('store', () => {   

    it('is a redux store configured with the correct reducer', () => {
        const store = makeStore();
        expect(store.getState()).to.equal(Map());
        
        store.dispatch({
            type: 'SET_ENTRIES',
            entries: ['The Matrix', 'Inception']
        });
        expect(store.getState()).to.equal(fromJS({
            entries: ['The Matrix', 'Inception']
        }));
    });

});