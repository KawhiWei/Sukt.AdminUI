import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import user from './reducer/user';
const rootReducer = combineReducers({
  user,
})
const finalCreateStore = compose(applyMiddleware(thunk))(createStore);
const store = finalCreateStore(rootReducer, {})
export default store;