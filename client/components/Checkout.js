import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Checkout extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  render(){

    console.log("checkout page this.props", this.props);
    return (
      <div>
        <div>
          <Link to={"/login"}>
            <button>Sign In</button>
          </Link>
          <Link to={"/signup"}>
            <button>Create Account</button>
          </Link>
        </div>
        <Link to={"/cart/confirmation"}>
          <button>Place Order</button>
        </Link>
      </div>
    )
  }
}

export default connect()(Checkout);