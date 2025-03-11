import React from 'react';
import { Grid, Typography } from '@mui/material';
// import './About.css';

function About() {
  return (
    <Grid>
      <Grid>
        <img src="https://makanmate.com/wp-content/uploads/2022/09/catering-chef-cooking.jpg" alt="d1" width="100%" style={{maxHeight:'650px'}} />
      </Grid>
      <Grid container sx={{width:'80%' , margin:'100px auto'}}>
        <Typography className='typo3' sx={{fontWeight:'bold' , paddingTop:'30px'}}>History of Makan Mate</Typography>
        <Typography sx={{fontSize:'1.2rem'}}>Started from a small stall in Bugis Street, Makan Mate has grown to cater to industrial workers as well as catering functions for the cost and health conscious. In addition, we have been serving a growing clientele in the Western part of Singapore. You will discover – to your delight – a wide variety of tasty menus that include healthy options at reasonable prices. Our dishes contain no MSG, low salt and low oil. We look forward to hearing from you and we thank you for visiting Makan Mate.</Typography>
        <Typography className='typo3' sx={{fontWeight:'bold' , paddingTop:'30px'}}>Exceptional Catering Services</Typography>
        <Typography sx={{fontSize:'1.2rem'}}>If you’re looking for a caterer for birthday parties, engagement parties, or other special occasions and you want these to be extra fun and memorable for you and your guests, choose Makan Mate. With help from our dedicated team, holding your event becomes easier than ever. We deliver food promptly, arrive on time, and cater to all your needs adequately.Whether you need a mini buffet catering for birthday parties or buffet catering for a corporate event, we got you covered! And as Halal caterers in Singapore, we provide catering services to religious functions including Malay wedding catering and Muslim wedding catering. Let us blow your guests away with classic wedding food that won’t disappoint!Moreover, if you or your guests have a thing for Korean food, Makan Mate will surely incorporate authentic Korean dishes. Our Korean menu includes Japchae, Bibimbap, Korean Rice Cake, Cream of Red Bean Soup, and more.All food portions catered and delivered by Makan Mate are described as generous. We make sure that we serve more than enough to make you and your guests pleased and satisfied.</Typography>
        <Typography className='typo3' sx={{fontWeight:'bold' , paddingTop:'30px'}}>Wide Range of Food Options</Typography>
        <Typography sx={{fontSize:'1.2rem'}}>Food is ultimately a highlight of Makan Mate. Tasty, presentable, and easy to eat food. We are loved for our Makan Mate Cereal Prawn, Grilled Honey Boneless Chicken, Scrumptious Turkey Ham Fried Rice, Sautéed Garlicky Prawn, Black Tender Beef Loin, Vegan Yusheng Lo Hei, Smoked Salmon Lo Hei, Chicken Wings, and more. </Typography>
        <Typography className='typo3' sx={{fontWeight:'bold' , paddingTop:'30px'}}>Engage our Food Catering Services</Typography>
        <Typography sx={{fontSize:'1.2rem'}}>Worry no more about preparing or cooking food in your parties and events! Entrust the job to Makan Mate and enjoy your day with ease and peace of mind. Contact us today at (65) 6264 2233 ext 16-21 to discuss your catering preferences and we’ll be happy to explain our catering offers and packages.</Typography>
        <Typography className='typo3' sx={{fontWeight:'bold' , paddingTop:'30px'}}>Halal/Malay Catering</Typography>
        <Typography sx={{fontSize:'1.2rem'}}>Makan Mate also offers a wide range of halal malay menu options for small parties and events. Our expert chefs bring years of experience to the table, crafting traditional and authentic dishes that delight the senses and leave a lasting impression. Our goal is to provide top-quality Halal cuisine and exceptional customer service, making us a go-to choice for Halal/Malay food catering needs in Singapore.</Typography>
      </Grid>
    </Grid>
  );
}

export default About;
