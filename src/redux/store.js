import { createStore } from 'redux'

import tableReducer from './reducers/table'

const store = createStore(
    tableReducer
);

export default store;