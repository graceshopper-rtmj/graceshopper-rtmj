import React from 'react';
import { connect } from 'react-redux';

class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cart: [],
      error: null,
      loading: true,
    }
  }
  componentDidMount() {
    try {
      // let cart = JSON.parse(localStorage.cart)
      // cart = localStorage.cart.reduce((counter, current) => {
      //   if (!counter[current]) {
      //     counter[current] = 1
      //   } else {
      //     counter[current]++
      //   }
      //   return counter
      // } 
      // , {})
      
      // this.setState({cart})
    } catch (err) {
      this.setState({ error: err.message, loading: true });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.cart === this.state.cart) {
      return;
    } else {
      let cart = JSON.parse(localStorage.cart)
      // cart.reduce((counter, current) => {
      //   if (!counter[current]) {
      //     counter[current] = 1
      //   } else {
      //     counter[current]++
      //   }
      //   return counter
      // } 
      // , {})
      
      this.setState({cart: JSON.parse(localStorage.cart)})
      this.setState({ loading: false });
    }
  }
  handleClick() {
    console.log(this.state.cart)
  }
  render() {
    const cart = localStorage.getItem('cart')
    return (
      <div>
        <h1>YOUR CART:</h1>
        <div style={{border: "3px black solid"}}>
          <button onClick={()=>this.handleClick()}>Check Stuff</button>
          {/* {cart.map(product => {
            return (
              <div>
                
              <h3>{product.name}</h3>
              <h3>${product.price}</h3>
              </div>
            )
          })} */}

        </div>
      </div>
    )
  }
}

export default connect()(Cart)




//products will be on localStorage.cart

//nav bar link to '/cart'
//route path to '/cart'

//in cart, get products from local storage and display
//update cart buttons?
//increase/decrease qty
//can't increase more than the item's quantity
//delete item

//notify if empty cart

//purchase button
//clear local storage
//to the backend:

//sales/orders model
//decrement quantity by amount sold
//put route to create an instance
//action constant, creator, thunk, reducer
//maybe just an axios call in component because state doesn't need to reflect sales (unless for admin)