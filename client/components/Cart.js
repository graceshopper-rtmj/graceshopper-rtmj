import React from 'react';
import { connect } from 'react-redux';
import { fetchCart, updateCartThunk } from '../store/cart';
import GuestCartItems from './GuestCartItems';
import UserCartItems from './UserCartItems';

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      error: null,
      loading: true,
      userCart: [],
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleIncrement = this.handleIncrement.bind(this);
    this.handleDecrement = this.handleDecrement.bind(this);
  }
  componentDidMount() {
    try {
      const { token } = window.localStorage;
      if (token) {
        this.props.fetchCart(token);
      } else {
        this.setState({ cart: JSON.parse(localStorage.cart) });
      }
    } catch (err) {
      this.setState({ error: err.message, loading: true });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.cart === this.state.cart &&
      prevProps.cart === this.props.cart
    ) {
      return;
    } else {
      this.setState({ loading: false });
      const { token } = window.localStorage;
      if (token) {
        this.setState({ userCart: this.props.cart.products }); // RAD THIS WORKS
      }
    }
  }
  handleDelete(e) {
    const { token } = window.localStorage;
    if (token) {
      let idx = e.target.value;
      let cart = this.state.userCart;
      let left = cart.slice(0, idx);
      let right = cart.slice(idx + 1);
      cart = [...left, ...right];
      this.props.updateCart(cart, token);
    } else {
      let idx = e.target.value;
      let cart = this.state.cart;
      let left = cart.slice(0, idx);
      let right = cart.slice(idx + 1);
      cart = [...left, ...right];
      localStorage.cart = JSON.stringify(cart);
      this.setState({ cart: JSON.parse(localStorage.cart) });
    }
  }
  handleIncrement(e) {
    const cart = JSON.parse(localStorage.cart);
    if (cart[e.target.value].product.quantity === cart[e.target.value].qty) {
      alert('There is not enough stock to add another item');
    } else {
      cart[e.target.value].qty++;
      localStorage.cart = JSON.stringify(cart);
      this.setState({ cart: JSON.parse(localStorage.cart) });
    }
  }
  handleDecrement(e) {
    let cart = JSON.parse(localStorage.cart);
    if (cart[e.target.value].qty === 1) {
      let idx = e.target.value;
      let left = cart.slice(0, idx);
      let right = cart.slice(idx + 1);
      cart = [...left, ...right];
    } else {
      cart[e.target.value].qty--;
    }
    localStorage.cart = JSON.stringify(cart);
    this.setState({ cart: JSON.parse(localStorage.cart) });
  }
  render() {
    return (
      <div>
        <h1>YOUR CART:</h1>
        <div style={{ border: '3px black solid' }}>
          {!this.state.loading &&
            (this.state.cart.length ? (
              <GuestCartItems
                cart={this.state.cart}
                handleDelete={this.handleDelete}
                handleIncrement={this.handleIncrement}
                handleDecrement={this.handleDecrement}
              ></GuestCartItems>
            ) : (
              <UserCartItems
                cart={this.state.userCart}
                handleDelete={this.handleDelete}
                handleIncrement={this.handleIncrement}
                handleDecrement={this.handleDecrement}
              ></UserCartItems>
            ))}

          {/* {!this.state.loading &&
            cart.map((item, idx) => {
              return (
                <div key={item.productId} style={{ border: '1px black solid' }}>
                  <h3>{item.product.name}</h3>
                  <h3>${item.product.price * item.qty}</h3>
                  <h3>There are {item.qty} in your cart</h3>
                  <button value={idx} type='button' onClick={this.handleDelete}>
                    Remove from cart
                  </button>
                  <button
                    value={idx}
                    type='button'
                    onClick={this.handleIncrement}
                  >
                    +
                  </button>
                  <button
                    value={idx}
                    type='button'
                    onClick={this.handleDecrement}
                  >
                    -
                  </button>
                </div>
              );
            })}*/}
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    cart: state.cart,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchCart: (token) => dispatch(fetchCart(token)),
    updateCart: (cart, token) => dispatch(updateCartThunk(cart, token)),
  };
};

export default connect(mapState, mapDispatch)(Cart);


//can't increase more than the item's quantity

//purchase button
//clear local storage
//to the backend:

//sales/orders model
//decrement quantity by amount sold
//put route to create an instance
//action constant, creator, thunk, reducer
//maybe just an axios call in component because state doesn't need to reflect sales (unless for admin)
