import AddProdToCart from './AddProdToCart';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import { Divider, makeStyles } from '@material-ui/core/';
import React from 'react';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    borderRadius: 12,
    margin: 12,
    maxWidth: 550,
    minWidth: 500,
    padding: 5,
    textAlign: 'center',
  },
  media: {
    height: 500,
    margin: '0 auto',
    width: 500,
  },
  action: {
    display: 'flex',
    justifyContent: 'space-around',
  },
});

export default function PicCardSingleProduct({ product, auth, fetchProducts }) {
  const classes = useStyles()
  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={product.imageURL}
        title={product.title}
      />
      <Divider variant="middle" />
      <CardContent className={classes.content}>
        <Typography
          align="center"
          variant="h4"
        >
          {product.name}
          <br />
          {`$ ${product.price}`}
        </Typography>
        <Divider variant="middle" />
        <Typography
          color="textSecondary"
          component="p"
        >
          {product.description}
        </Typography>
      </CardContent>
      <Divider variant="middle" />
      <CardActions className={classes.action}>
        <AddProdToCart
          product={product}
          auth={auth}
          fetchProducts={fetchProducts}
        />
      </CardActions>
    </Card>
  )
}
