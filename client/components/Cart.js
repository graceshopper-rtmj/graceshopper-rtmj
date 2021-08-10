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
        this.setState({ userCart: this.props.cart.products });
      }
    }
  }
  handleDelete(e) {
    const { token } = window.localStorage;
    if (token) {
      let idx = e.target.value;
      let cart = this.state.userCart;
      let left = cart.slice(0, idx);
      idx++;
      let right = cart.slice(idx);
      cart = [...left, ...right];
      this.props.updateCart(cart, 'delete', token);
    } else {
      let idx = e.target.value;
      let cart = this.state.cart;
      let left = cart.slice(0, idx);
      idx++;
      let right = cart.slice(idx);
      cart = [...left, ...right];
      localStorage.cart = JSON.stringify(cart);
      this.setState({ cart: JSON.parse(localStorage.cart) });
    }
  }
  handleIncrement(e) {
    const { token } = window.localStorage;
    if (token) {
      let cart = this.state.userCart;
      if (
        cart[e.target.value].saleItem.quantity === cart[e.target.value].quantity
      ) {
        alert('There is not enough stock to add another item');
      } else {
        cart = cart[e.target.value].id;
        this.props.updateCart(cart, 'increment', token);
      }
    } else {
      const cart = JSON.parse(localStorage.cart);
      if (cart[e.target.value].product.quantity === cart[e.target.value].qty) {
        alert('There is not enough stock to add another item');
      } else {
        cart[e.target.value].qty++;
        localStorage.cart = JSON.stringify(cart);
        this.setState({ cart: JSON.parse(localStorage.cart) });
      }
    }
  }
  handleDecrement(e) {
    const { token } = window.localStorage;
    if (token) {
      let cart = this.state.userCart;
      if (cart[e.target.value].saleItem.quantity === 1) {
        let idx = e.target.value;
        let cart = this.state.userCart;
        let left = cart.slice(0, idx);
        idx++;
        let right = cart.slice(idx);
        cart = [...left, ...right];
        this.props.updateCart(cart, 'delete', token);
      } else {
        cart = cart[e.target.value].id;
        this.props.updateCart(cart, 'decrement', token);
      }
    } else {
      let cart = JSON.parse(localStorage.cart);
      if (cart[e.target.value].qty === 1) {
        let idx = e.target.value;
        let left = cart.slice(0, idx);
        idx++;
        let right = cart.slice(idx);
        cart = [...left, ...right];
      } else {
        cart[e.target.value].qty--;
      }
      localStorage.cart = JSON.stringify(cart);
      this.setState({ cart: JSON.parse(localStorage.cart) });
    }
  }
  render() {
    if (!this.state.loading && this.state.cart.length) {
      return (
        <div>
          <h1>YOUR CART:</h1>
          <div style={{ border: '3px black solid' }}>
            <GuestCartItems
              cart={this.state.cart}
              handleDelete={this.handleDelete}
              handleIncrement={this.handleIncrement}
              handleDecrement={this.handleDecrement}
            ></GuestCartItems>
          </div>
        </div>
      );
    } else if (!this.state.loading && this.state.userCart.length) {
      return (
        <div>
          <h1>YOUR CART:</h1>
          <div style={{ border: '3px black solid' }}>
            <UserCartItems
              cart={this.state.userCart}
              handleDelete={this.handleDelete}
              handleIncrement={this.handleIncrement}
              handleDecrement={this.handleDecrement}
            ></UserCartItems>
          </div>
        </div>
      );
    }
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
    updateCart: (cart, method, token) =>
      dispatch(updateCartThunk(cart, method, token)),
  };
};

export default connect(mapState, mapDispatch)(Cart);

