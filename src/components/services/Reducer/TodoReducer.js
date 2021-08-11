import {
  DELETE_CART,
  ADD_CART,
  ACCESS_TOKEN,
  ASYN_DATA,
  LIST_POLL,
  ITEM_QUNATITY,
  CHECK_ITEM,
  ORDER_PLACE,
} from '../Action/Type';

const initialState = {
  cart: [],
  token: null,
  listOfPoll: [],
  itemPlace: [],
};

const TodoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CART:
      return {
        ...state,
        cart: state.cart.concat(action.data),
      };
    case DELETE_CART:
      return {
        ...state,
        cart: state.cart.filter(n1 => n1 !== action.id),
      };
    case ACCESS_TOKEN:
      return {
        ...state,
        token: action.token,
      };

    case ASYN_DATA:
      return {
        ...state,
        cart: action.data,
      };
    case LIST_POLL:
      return {
        ...state,
        listOfPoll: action.data,
      };
    case ITEM_QUNATITY:
      return {
        ...state,
        cart: action.data,
      };
    case CHECK_ITEM:
      state.cart = action.data;
      return {
        ...state,
      };
    case ORDER_PLACE:
      return {
        ...state,
        orderDetails: action.data,
      };
    default:
      return state;
  }
};

export default TodoReducer;
