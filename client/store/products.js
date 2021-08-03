import axios from 'axios';

const  SET_PRODUCTS = 'SET_PRODUCTS';
const  SET_PRODUCT = 'SET_PRODUCT';

const setProducts = (products) => ({
    type: SET_PRODUCTS, products
})

const setProduct = (product) => ({
    type: SET_PRODUCT, product
})


export const fetchProducts = () => async dispatch => {
    try{
      const { data } = await axios.get('/products')
      dispatch(setProducts(data))
    }catch (err){
      console.log(err)
    }
}

export const fetchProduct = (id) => async dispatch => {
    try{
      const { data } = await axios.get(`/products/${id}`)
      dispatch(setProduct(data))
    }catch (err){
      console.log(err)
    }
}

export default function productsReducer(state=[], action){
    switch (action.type){
        case SET_PRODUCTS:
            return action.products
        case SET_PRODUCT:
            return action.product
        default:
            return state    
    }
}