import { combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { thunk } from 'redux-thunk';
import { legacy_createStore as createStore } from 'redux';
import { hotelDetailReducer } from './reducers/hotelReducer';

const reducer = combineReducers({
    hotelDetails: hotelDetailReducer
})

const middleware = thunk;
const store = createStore(reducer, composeWithDevTools(applyMiddleware(middleware)));

export default store;