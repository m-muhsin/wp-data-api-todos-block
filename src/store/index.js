import { createReduxStore, register } from '@wordpress/data';
import { STORE_NAME } from './utils'
import reducer from './reducer';
import * as selectors from './selectors';
import * as actions from './actions';
import * as resolvers from './resolvers';
import controls from './controls';

const store = createReduxStore(STORE_NAME, {
    reducer,
    selectors,
    actions,
    resolvers,
    controls,
});

register(store);