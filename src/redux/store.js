import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk';

import tableReducer from './reducers/table'

const store = createStore(
    tableReducer,
    applyMiddleware(thunk)
);

export default store;