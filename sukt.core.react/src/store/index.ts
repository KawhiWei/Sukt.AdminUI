import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import user from './reducer/user';
let rootReducer = combineReducers({
  user,
})
let finalCreateStore = compose(applyMiddleware(thunk))(createStore);
let store = finalCreateStore(rootReducer, {})
export default store;