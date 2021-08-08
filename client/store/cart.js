import axios from 'axios'

// Action Constants
export const SET_CART = 'SET_CART';

// Action Creators
export const setCart = (cart) => ({
  type: SET_CART,
  cart
});

// Products Reducer
export default function cartReducer(state = {}, action) {
  switch (action.type) {
    case SET_CART:
      return action.cart || {};
    default:
      return state
  }
}
