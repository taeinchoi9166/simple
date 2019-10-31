import {createStore, combineReducers} from 'redux';
import commonReducer from './reducers/common';
import canvasReducer from './reducers/canvas';

const reducers = combineReducers({
    commonReducer,
    canvasReducer
});

const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


export default store;
