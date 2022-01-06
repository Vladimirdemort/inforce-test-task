// import products from '../products';
import {
  addProduct,
  deleteProduct,
  editProduct,
  sortByName,
  sortByPrice,
} from 'store/actions/products';
import { createReducer, combineReducers } from '@reduxjs/toolkit';
import { fetchProducts } from '../actions/productsOperations';

const products = [];
const DEFAULT_STATE = products;

const productsReducer = createReducer(DEFAULT_STATE, {
  [fetchProducts.fulfilled]: (state, action) => action.payload,
  [addProduct]: (state, action) => [...state, action.payload],
  [deleteProduct]: (state, action) =>
    state.filter(i => i.id !== action.payload),
  [editProduct]: (state, action) =>
    state.map(item => (item.id === action.payload.id ? action.payload : item)),
  [sortByName]: (state, action) =>
    state.sort((firstItem, secondItem) =>
      firstItem.name.localeCompare(secondItem.name),
    ),
  [sortByPrice]: (state, action) =>
    state.sort((firstItem, secondItem) => firstItem.price - secondItem.price),
});

const isLoading = createReducer(false, {
  [fetchProducts.pending]: () => true,
  [fetchProducts.fulfilled]: () => false,
  [fetchProducts.rejected]: () => false,
});

const error = createReducer(false, {
  [fetchProducts.rejected]: (_, action) => action.payload,
  [fetchProducts.pending]: () => null,
});

export default combineReducers({ productsReducer, isLoading, error });
// state.find(item => item.id === action.payload.id);

//  Object.assign(
//       state.find(item => item.id === action.payload.id),
//       action.payload,
//     ),
