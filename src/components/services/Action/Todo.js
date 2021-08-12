import {
  DELETE_CART,
  ADD_CART,
  ACCESS_TOKEN,
  ASYN_DATA,
  ITEM_QUNATITY,
  LIST_POLL,
  ITEM_ID,
  ORDER_PLACE,
} from './Type';

export const deleteCart = id => ({
  type: DELETE_CART,
  id: id,
});
export const addCart = cart => ({
  type: ADD_CART,
  data: cart,
});

export const aceessToken = token => ({
  type: ACCESS_TOKEN,
  token: token,
});
export const asyncData = cart => ({
  type: ASYN_DATA,
  data: cart,
});
export const addQunatity = cart => ({
  type: ITEM_QUNATITY,
  data: cart,
});
export const addListPoll = data => ({
  type: LIST_POLL,
  data: data,
});
export const itemId = item => ({
  type: ITEM_ID,
  item: item,
});
export const orderPlace = cart => ({
  type: ORDER_PLACE,
  data: cart,
});
