import AddProdToCart from './AddProdToCart';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Divider, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import React from 'react';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    borderRadius: 12,
    minWidth: 256,
    maxWidth: 345,
    textAlign: 'center',
    padding: 5,
    margin: 12,
  },
  media: {
    height: 270,
    width: 270,
    margin: '0 auto'
  },
  action: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  info: {
    textDecoration: 'none',
    color: "black",
  },
  content: {
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    height: 75
  }
});

export default function PictureCard({ product, auth, fetchProducts }) {
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <Link to={`/products/${product.id}`}>
        <CardMedia
          className={classes.media}
          image={product.imageURL}
          title={product.title}
        />
        <Divider variant="middle" />
        <CardContent className={classes.content}>
          <Typography className={classes.info} align="center" variant="h6" component="h3">
            {product.name}
            <br />
            {`$ ${product.price}`}
          </Typography>
        </CardContent>
      </Link>
      <Divider variant="middle" />
      <CardActions className={classes.action}>
        <AddProdToCart product={product} auth={auth} fetchProducts={fetchProducts} />
      </CardActions>
    </Card>
  )
}
