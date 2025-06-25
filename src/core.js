import { List, Map} from 'immutable';

export function setEntries(state, entries) {
    return state.set('entries', List(entries));
}

//Merge an update into old state, wwhere first two entries -> one List and rest in new version of entries
export function next(state) {
    const entries = state.get('entries');
    return state.merge({
        vote: Map({pair: entries.take(2)}),
        entries: entries.skip(2)
    });
}

//reach into the nested data structure path ['vote', 'tally', entry] and apply this funt there
//If entry does not exist, initialize it to 0 and then increment by 1
//Of tjere are keys missing along the path, create new Maps in their place.
export function vote(state, entry) {
    return state.updateIn(
        ['vote', 'tally', entry],
        0,
        tally => tally + 1
    );
}