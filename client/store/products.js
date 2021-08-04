import axios from 'axios';

const SET_PRODUCTS = 'SET_PRODUCTS';
const ADD_PRODUCT_TO_CART = "ADD_PRODUCT_TO_CART"

const setProducts = (products) => ({
  type: SET_PRODUCTS,
  products,
});

const _addProductToCart = (product) => ({
  type: ADD_PRODUCT_TO_CART,
  product
})


export const fetchProducts = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/api/products');
    dispatch(setProducts(data));
  } catch (err) {
    console.log(err);
  }
};

export const addProductToCart = (productId) => async (dispatch) => {
  try {
    const { data } = await axios.put(`/api/${productId}/add-to-cart`);
    dispatch(_addProductToCart(data))
  } catch (err) {
    console.log(err);
  }
}


export default function productsReducer(state = [], action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products;
    case ADD_PRODUCT_TO_CART:
      return action.product;
    default:
      return state;
  }
}

