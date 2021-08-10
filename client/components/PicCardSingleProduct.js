import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Products from './Products'
import React from 'react';
import Grid from '@material-ui/core/Grid';



const useStyles = makeStyles((theme) => ({
  root: {
    justify: "center",
    alignItems: 'center',
    direction: 'column',
    maxWidth: 345,
  },
  media: {
    height: 210,
  },
  cardstyle: {
    justify: "center",
    alignItems: 'center',
    direction: 'column',
    
    
  },
  style: {
      justifycontent: "center",
      alignItems: "center",
      maxWidth: 345
  }
  
      
}));
export default function PicCardSingleProduct({ product }){
    const classes = useStyles()

    return(
     <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '100vh' }}
 >
     <Grid item xs={3}>
    
       <Card className={classes.cardstyle}>
          <CardMedia
            className={classes.media}
            image={product.imageURL}
            title={product.title}
            />
            <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
                {product.name} <br />{`$ ${product.price}`}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
                {product.description}
            </Typography>
            </CardContent>
        </Card>
        </Grid>
        </Grid>
    )
}