import React from "react";

class AddProdToCart extends React.Component {
  constructor(props){
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = () => {
    if(this.props.auth){
      console.log("Added to user cart!");
    }else{
      // let cart = JSON.parse(localStorage.cart || null) || {};
      let cart = localStorage.getItem("cart") || {};
      
      const product = this.props.product;
      const {id} = product
      cart = {...cart, id: product};
      localStorage.setItem("cart", cart);
      //localStorage.cart = JSON.stringify(cart);
      
    }
    console.log(localStorage.getItem("cart"))
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