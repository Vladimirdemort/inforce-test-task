import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk(
  'FETCH_REQUEST_PRODUCT',
  async () => {
    const products = await fetch(
      'http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline',
    ).then(res => res.json());
    console.log(products);
    return products;
  },
);
