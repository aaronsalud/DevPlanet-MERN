import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const middlewares = [thunk];

const store = createStore(() => [], applyMiddleware(...middlewares));

export default store;
