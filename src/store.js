import React, { createContext, useReducer } from 'react';
import {
  ORDER_SET_TYPE,
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_SUCCESS,
  ORDER_ADD_ITEM,
  ORDER_REMOVE_ITEM,
  ORDER_CLEAR,
  ORDER_SET_PAYMENT_TYPE,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
} from './constants';

export const Store = createContext();

const initialState = {
  categoriesList: { loading: true },
  order: {
    orderType: 'Eat in',
    orderItems: [],
    paymentType: 'Pay here',
  },
  productList: { loading: true },
  orderCreate: { loading: true },
};

function reducer(state, action) {
  switch (action.type) {
    case ORDER_SET_TYPE:
      return { ...state, order: { ...state.order, orderType: action.payload } };
    case CATEGORY_LIST_REQUEST:
      return { ...state, categoriesList: { loading: true } };
    case CATEGORY_LIST_SUCCESS:
      return { ...state, categoriesList: { loading: false, categories: action.payload } };
    case CATEGORY_LIST_FAIL:
      return { ...state, categoriesList: { loading: false, error: action.payload } };
    case PRODUCT_LIST_REQUEST:
      return { ...state, productList: { loading: true } };
    case PRODUCT_LIST_SUCCESS:
      return { ...state, productList: { loading: false, products: action.payload } };
    case PRODUCT_LIST_FAIL:
      return { ...state, productList: { loading: false, error: action.payload } };
    case ORDER_ADD_ITEM:
      // add item to cartItems
      const item = action.payload;
      const existItem = state.order.orderItems.find((x) => x._id === item._id);
      var orderItems = [];
      if (existItem) {
        orderItems = state.order.orderItems.map((x) => (x._id === existItem._id ? item : x));
      } else {
        orderItems = [...state.order.orderItems, item];
      }

      const itemsCount = orderItems.reduce((acc, curr) => acc + curr.quantity, 0);
      const itemsPrice = orderItems.reduce((acc, curr) => acc + curr.quantity * curr.price, 0);
      const taxPrice = Math.round(0.15 * itemsPrice * 100) / 100;
      const totalPrice = Math.round((itemsPrice + taxPrice) * 100) / 100;

      return { ...state, order: { ...state.order, orderItems, itemsCount, itemsPrice, taxPrice, totalPrice } };
    case ORDER_REMOVE_ITEM:
      const orderItem = state.order.orderItems.filter((x) => x.id !== action.payload.id);
      return { ...state, order: { ...state.order, orderItems: orderItem } };
    case ORDER_CLEAR:
      return {
        ...state,
        order: { ...state.order, orderItems: [], itemsCount: 0, itemsPrice: 0, taxPrice: 0, totalPrice: 0 },
      };
    case ORDER_SET_PAYMENT_TYPE:
      return {
        ...state,
        order: { ...state.order, paymentType: action.payload },
      };
    case ORDER_CREATE_REQUEST:
      return { ...state, orderCreate: { loading: true } };
    case ORDER_CREATE_SUCCESS:
      return { ...state, orderCreate: { loading: false, newOrder: action.payload } };
    case ORDER_CREATE_FAIL:
      return { ...state, orderCreate: { loading: false, errror: action.payload } };
    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
