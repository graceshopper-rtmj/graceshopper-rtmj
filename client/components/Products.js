import React from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from '../store/products';
import AddProdToCart from './AddProdToCart';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';

class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loading: true,
    };
  }
  componentDidMount() {
    try {
      this.props.fetchProducts();
    } catch (err) {
      this.setState({ error: err.message, loading: true });
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.products === this.props.products) {
      return;
    } else {
      this.setState({ loading: false });
    }
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        {this.state.error && <h1>{this.state.error}</h1>}
        {this.state.loading && <h1>{this.state.loading}</h1>}
        <div>
          <Grid
            container
            direction='row'
            justifyContent='center'
            alignItems='center'
          >
            {!this.state.loading &&
              this.props.products.map((product) => {
                return (
                  <Grid item key={product.id} xs={12} sm={6} md={4}>
                    <Card>
                      <CardMedia image={`${product.imageURL}`} />
                      <CardContent>
                        <Link to={`/products/${product.id}`}>
                          {/* <img src={product.imageURL} /> */}
                          <h3>{product.name}</h3>
                        </Link>  
                          <h3>${product.price}</h3>
                          <p>{product.description}</p>
                        
                        <AddProdToCart
                          product={product}
                          auth={this.props.auth}
                          fetchProducts={this.props.fetchProducts}
                        />
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
          </Grid>
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    products: state.products,
    auth: state.auth,
  };
};
const mapDispatch = (dispatch) => {
  return {
    fetchProducts: () => dispatch(fetchProducts()),
  };
};

export default connect(mapState, mapDispatch)(Products);
