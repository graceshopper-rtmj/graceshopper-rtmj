import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Products from './Products'
import React from 'react';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 270,
  },


});
export default function PictureCard({ product }){
    const classes = useStyles()

    return(
       <Card className={classes.root}>
          <CardMedia
            className={classes.media}
            image={product.imageURL}
            title={product.title}
            />
            <CardContent>
            <Typography gutterBottom variant="h6" component="h3">
                {product.name} <br />{`$ ${product.price}`}
            </Typography>
            </CardContent>
        </Card>
    )
}