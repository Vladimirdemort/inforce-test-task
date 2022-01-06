import { combineReducers } from 'redux';
import productsReducer from './products';

export const reducer = combineReducers({
  products: productsReducer,
});
