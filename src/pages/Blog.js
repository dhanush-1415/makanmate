import React from 'react';
import { Grid, Typography } from '@mui/material';
import img from '../assets/sliders/slide-1.jpg';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

const Blog = () => {
    
    const handleBlog = (id) => {
        window.location.href = `/blogs/${id}`
    }

    const cardData = [
        {
          title: "Guide to Singapore’s Catering Services by Makan Mate",
          image: "https://makanmate.com/wp-content/uploads/2022/10/Healthier-Choice-Buffet-Menu-A-1024x1024.png",
        },
        {
          title: "Indulge in Mini High Tea Buffet Catering Options from Makan Mate",
          image: "https://makanmate.com/wp-content/uploads/2023/07/collection-of-delicious-assorted-mini-dessert-1024x683.jpg",
        },
        {
          title: "Vegetarian Catering for Small Parties: Delightful Menus to Impress Your Guests",
          image: "https://makanmate.com/wp-content/uploads/2023/06/assorted-fresh-salads-displayed-on-buffet-1024x783.jpg",
        },
        {
          title: "Healthy and Tasty: How Steamboat Buffet Catering Offers a Unique Dining Experience",
          image: "https://makanmate.com/wp-content/uploads/2023/06/chinese-hot-pot-known-soupfood-steamboat-1024x683.jpg",
        },
        {
          title: "Create An Excellent Party Experience with a Customized Makan Mate Buffet Menu",
          image: "https://makanmate.com/wp-content/uploads/2023/05/cooked-food-inside-food-warmer-1.png",
        },
        {
          title: "Guide to Vegan Catering in Singapore to Plan for Your Next Event",
          image: "https://makanmate.com/wp-content/uploads/2023/05/asian-style-stir-fry-tofu-cubes-2-1024x755.jpg",
        },
        {
          title: "5 Reasons to Choose Halal Catering for Your Next Party",
          image: "https://makanmate.com/wp-content/uploads/2023/04/saile-ilyas-SiwrpBnxDww-unsplash-min-scaled.jpg",
        },
        {
          title: "Elevate Your Party Experience in Singapore with Makan Mate’s Mini Party Sets",
          image: "https://makanmate.com/wp-content/uploads/2023/03/fernando-santos-DppzIK9TAxY-unsplash.jpg",
        },
      ];


      const cardDataWithLinks = cardData.map((card) => ({
        ...card,
        link: `/${card.title.toLowerCase().replace(/\s+/g, '-')}`, // Generate link from title
      }));
      

    return(
        <>
            <Grid>
                <img src={img} alt="aq" width='100%' style={{maxHeight:'600px'}} />
            </Grid>
            <Grid sx={{ width: '80%', margin: '100px auto' }}>
            <Grid container spacing={4}>
                {cardDataWithLinks.map((card, index) => (
                <Grid item key={index} xs={12} sm={6} md={4}>
                    <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                        sx={{ height: 190 }}
                        image={card.image}
                        title={card.title}
                    />
                    <CardContent sx={{ height: 130 }}>
                        <Typography gutterBottom variant="h6" component="div">
                        {card.title}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Typography size="small" component="a" href={`blogs${card.link}`} sx={{textDecoration:'none'}}>
                        continue reading ...
                        </Typography>
                    </CardActions>
                    </Card>
                </Grid>
                ))}
                </Grid>
            </Grid>
        </>
    )
}

export default Blog