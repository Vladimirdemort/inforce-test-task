import { createAction } from '@reduxjs/toolkit';

export const addProduct = createAction('ADD_PRODUCT');
export const deleteProduct = createAction('DELETE_PRODUCT');
export const editProduct = createAction('EDIT_PRODUCT');
export const sortByPrice = createAction('SORT_BY_PRICE');
export const sortByName = createAction('SORT_BY_NAME');
