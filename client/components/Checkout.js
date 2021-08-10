import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Cart from "./Cart";
import { fetchCart } from "../store/cart";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

class Checkout extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      open: false,
      checkoutCart: [],
    };

    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handlePlaceOrder = this.handlePlaceOrder.bind(this);
  }

  componentDidMount() {
    try {
      // Being logged in is defined has having a token in local storage
      const { token: isLoggedIn } = window.localStorage;

      // Case: The user is logged in
      if (isLoggedIn) {
        const userCart = this.props.fetchCart();
        console.log('what is userCart in checkout', userCart)
        // this.setState({ checkoutCart: userCart });
      }

      // Case: The user is not logged in (the user is a guest)
      else {
        this.setState({ checkoutCart: JSON.parse(localStorage.cart) });
      }
    } catch (err) {
      this.setState({ error: err.message, loading: true });
    }
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handlePlaceOrder = () => {
    if( JSON.parse(localStorage.cart).length){
      console.log("in handlePlaceOrder", JSON.parse(localStorage.cart));
      //create sale instance

      //clear localStorage
      localStorage.clear();
      console.log("after storage clear in handlePlaceOrder", JSON.parse(localStorage.cart));
    }
  //   localStorage.clear();
  }

  render() {
    console.log("checkout page this.props", this.props);
    console.log('checkout page localstorage:', JSON.parse(localStorage.cart));
    // console.log("is there token:", window.localStorage.token);
    // console.log('Cart component:', Cart);
    console.log('what is this in checkout:', this);
    const { username, open, checkoutCart } = this.state;
    const { handleClickOpen, handleClose, handlePlaceOrder } = this;

    return (
      <div>
        <div>
          <Link to={"/login"}>
            <Button variant="outlined">Sign In</Button>
          </Link>
          {/* <Link to={"/signup"}>
            <button>Create Account</button>
          </Link> */}
        </div>
        <div>
          <Button onClick={handleClickOpen} variant="outlined">Checkout as guest</Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Sign Up</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please enter your email address to sign up for an account.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Email Address"
                type="email"
                fullWidth
              />
              <TextField
                autoFocus
                margin="dense"
                id="new-password"
                label="Password"
                type="password"
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button type="submit" onClick={handleClose} color="primary">
                Sign Up
              </Button>
              <Button onClick={handleClose} color="primary">Cancel</Button>
            </DialogActions>
          </Dialog>
        </div>
        <div>
          <Cart>Review Your Order:</Cart>
        </div>
        <Link to={"/cart/confirmation"}>
          <Button onClick={handlePlaceOrder} variant="outlined">Place Order</Button>
        </Link>
      </div>
    );
  }
}

export default connect()(Checkout);
