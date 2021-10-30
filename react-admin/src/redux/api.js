import { publicRequest, userRequest } from '../requestMethods';
import { loginStart, loginSuccess, loginFailure } from './userSlice';
import {
  getProductStart,
  getProductSuccess,
  getProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  deleteProductFailure,
  updateProductStart,
  updateProductSuccess,
  updateProductFailure,
  createProductStart,
  createProductSuccess,
  createProductFailure,
} from './productSlice';

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post('/auth/login', user);
    dispatch(loginSuccess(res.data));
  } catch (error) {
    dispatch(loginFailure());
  }
};

export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get('/products');
    dispatch(getProductSuccess(res.data));
  } catch (error) {
    dispatch(getProductFailure());
  }
};

export const deleteProduct = async (dispatch, id) => {
  dispatch(deleteProductStart());
  try {
    await userRequest.delete('/products/' + id);
    dispatch(deleteProductSuccess({ id }));
  } catch (error) {
    dispatch(deleteProductFailure());
  }
};

export const updateProduct = async (dispatch, id, data) => {
  dispatch(updateProductStart());
  try {
    await userRequest.put('/products/' + id, data);
    dispatch(updateProductSuccess({ id, data }));
  } catch (error) {
    dispatch(updateProductFailure());
  }
};

export const createProduct = async (dispatch, data) => {
  dispatch(createProductStart());
  try {
    await userRequest.post('/products/', data);
    dispatch(createProductSuccess(data));
  } catch (error) {
    dispatch(createProductFailure());
  }
};
