import React from 'react';
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography  from '@material-ui/core/Typography';

export default function Info() {
  return (
    <div>
      <h1>Consider the Grasshopper</h1>
    <Container>
      <Grid container spacing={5} direction='row' justifyContent='space-evenly' >
        <Grid item xs={12} sm={6} md={3}>
          <Paper>
              <h3>Insects have been called the food of the future</h3>
              <p>
                But they’re also the food of the past, with many cultures already
                considering them a delicacy, or at least a good snack.
              </p>      
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper>              
              <h3>But why insects?</h3>
              <p>
                Estimates vary for just how much food production will need to increase
                to feed our growing global population, but we all know something needs
                to change. Some experts have even argued that raising insects for food
                will become a necessity in the coming century. Rather than seeing
                insects as a food of desperation, however, we see them as an
                opportuity to expand our minds and our palates.
              </p>
              <p>
                Bugs offer more than meets the eye: higher nutrient content than
                nearly any populat protein on the market today, coupled with more
                sustainable, humane, and efficient farming methods, minimal
                processing, and minimal - if any - environmental impacts.
              </p>         
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper>
           
              <h3>But why Grace Hoppers?</h3>
              <p>
                Let’s start with a very popular American protein choice: The
                hamburger. With about 20g of protein per 100g of meat, beef also
                contains certain negative nutritional compounds like saturated fats.
              </p>
              <p>
                Crickets are often the first-in-line insect alternative to beef - and
                with an average of 60g of protein per 100g of meat, it’s easy to see
                why.
              </p>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper>
            
              <h3>However, Consider the Grasshopper:</h3>
              <p>
                Grasshoppers contain 20% more protein than crickets - around 72% in
                weight - and contain none of the saturated fat or cholesterol of
                crickets or mealworms, another popular alternative protein.
              </p>
              <p>  
                Grasshoppers also contain all essential amino acids, as well as
                omega-3, iron, zinc, folic acid, and B12, and have no antibiotics or
                hormones. And, importantly, they have a neutral taste, making them an
                ideal base for our delicious bars, powders, and flours.
              </p>
          </Paper>
        </Grid>
      </Grid>  
    </Container>
      
      
      
    </div>
  );
}
