import React from "react";

class AddProdToCart extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    if (this.props.auth.id) {
      console.log("Added to user cart!");
    } else {
      let cart = JSON.parse(localStorage.cart || null) || [];
      const product = this.props.product;
      cart.push(product);
      localStorage.cart = JSON.stringify(cart);
    }
  }

  render() {

    return (
      <button type="button" onClick={this.handleClick}>
        Add To Cart
      </button>
    )
  }
}

export default AddProdToCart;
