import Axios from 'axios';
import {
  ORDER_SET_TYPE,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  CATEGORY_LIST_REQUEST,
  ORDER_ADD_ITEM,
  ORDER_REMOVE_ITEM,
  ORDER_CLEAR,
  ORDER_SET_PAYMENT_TYPE,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
} from './constants';

export const setOrderType = (dispatch, orderType) => {
  return dispatch({
    type: ORDER_SET_TYPE,
    payload: orderType,
  });
};

export const listCategories = async (dispatch) => {
  dispatch({ type: CATEGORY_LIST_REQUEST });
  try {
    const { data } = await Axios.get('/api/categories');
    return dispatch({
      type: CATEGORY_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    return dispatch({
      type: CATEGORY_LIST_FAIL,
      payload: error.message,
    });
  }
};

export const listProducts = async (dispatch, categoryName = '') => {
  dispatch({ type: PRODUCT_LIST_REQUEST });
  try {
    const { data } = await Axios.get(`/api/products?category=${categoryName}`);
    return dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    return dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
  }
};

export const addToOrder = (dispatch, product) => {
  return dispatch({ type: ORDER_ADD_ITEM, payload: product });
};

export const removeFromOrder = (dispatch, product) => {
  return dispatch({ type: ORDER_REMOVE_ITEM, payload: product });
};

export const clearOder = (dispatch) => {
  return dispatch({ type: ORDER_CLEAR });
};

export const setPaymentType = (dispatch, paymentType) => {
  return dispatch({ type: ORDER_SET_PAYMENT_TYPE, payload: paymentType });
};

export const createOrder = async (dispatch, order) => {
  dispatch({ type: ORDER_CREATE_REQUEST });
  try {
    const { data } = await Axios.post('/api/orders', order);
    console.log(data);
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
    dispatch({ type: ORDER_CLEAR });
  } catch (error) {
    dispatch({ type: ORDER_CREATE_FAIL, payload: error.message });
  }
};
