import React from 'react';
import { connect } from 'react-redux';
import AddProdToCart from './AddProdToCart';
import { fetchProduct } from '../store/single-product';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Container } from '@material-ui/core';
import PicCardSingleProduct from './PicCardSingleProduct';

class SingleProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loading: true,
    };
  }
  componentDidMount() {
    try {
      const { id } = this.props.match.params;
      this.props.fetchProduct(id);
    } catch (err) {
      this.setState({ error: err.message, loading: true });
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.product === this.props.product) {
      return;
    } else {
      this.setState({ loading: false });
    }
  }
  render() {
    const product = this.props.product;
    const error = this.props.error
    return (
      <Container>
        {error && (
          <div>
            <img src="https://i.imgur.com/cMaUPGw.png" />
            <h1 style={{ textAlign: "center" }}>{error}</h1>
          </div>

        )}
        {this.state.loading && <h1>{this.state.loading}</h1>}
        {!error && !this.state.loading && (
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            style={{ minHeight: '100vh' }}
          >
            <Grid item key={product.id} >
              <PicCardSingleProduct product={product} auth={this.props.auth} fetchProducts={this.props.fetchProducts} />
            </Grid >
          </Grid>
        )}
      </Container>
    );
  }
}

const mapState = (state) => {
  return {
    product: state.singleProduct,
    auth: state.auth,
    error: state.singleProduct.error
  };
};
const mapDispatch = (dispatch) => {
  return {
    fetchProduct: (id) => dispatch(fetchProduct(id)),
  };
};

export default connect(mapState, mapDispatch)(SingleProduct);
