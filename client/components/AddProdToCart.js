import React = require("react");

class AddProdToCart extends React.Component {
  constructor(props){
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = () => {
    if(this.props.auth){
      console.log("Added to user cart!");
    }else{
      let cart = JSON.parse(localStorage.cart || null) || {};
      const product = this.props.product;
      cart = {...cart, product};
      localStorage.cart.setItem("cart", cart);
    }
  }

  render() {
    
    return (
      <button type="button" onClick={handleClick}>
        Add To Cart
      </button>
    )
  }
}

export default AddProdToCart;