import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Cart from "./Cart";

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
    };

    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }



  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    console.log("checkout page this.props", this.props);
    console.log('checkout page localstorage:', JSON.parse(localStorage.cart));
    console.log('Cart component:', Cart);
    const { username, open } = this.state;
    const { handleClickOpen, handleClose } = this;

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
          <Cart>My Cart:</Cart>
        </div>
        <Link to={"/cart/confirmation"}>
          <Button variant="outlined">Place Order</Button>
        </Link>
      </div>
    );
  }
}

export default connect()(Checkout);
