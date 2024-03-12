import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Grid, Typography } from '@mui/material';

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function Events() {
  return (
    <Grid>
        <Grid container direction='column' sx={{width:'80%' , margin:'100px auto'}}>
            <Grid sx={{margin:'0 0 100px 0'}}>
                <Typography className="typo3" sx={{fontWeight:'bold' , textAlign:'center'}}>Here are some of the events display setup. We do variouse design set up from normal to something more grand as well.</Typography>
            </Grid>
            <Grid>
                <ImageList
                    //   sx={{ width: 500, height: 450 }}
                    variant="quilted"
                    cols={4}
                    rowHeight={121}
                    >
                    {itemData.map((item) => (
                        <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
                        <img
                            {...srcset(item.img, 121, item.rows, item.cols)}
                            alt={item.title}
                            loading="lazy"
                        />
                        </ImageListItem>
                    ))}
                </ImageList>
            </Grid>
        </Grid>
    </Grid>

  );
}

const itemData = [
  {
    img: 'https://makanmate.com/wp-content/uploads/slider18/j14sacq.jpeg',
    title: 'Breakfast',
    rows: 2,
    cols: 2,
  },
  {
    img: 'https://makanmate.com/wp-content/uploads/slider19/img_0330-scaled.jpg',
    title: 'Burger',
  },
  {
    img: 'https://makanmate.com/wp-content/uploads/slider18/j14sacq.jpeg',
    title: 'Camera',
  },
  {
    img: 'https://makanmate.com/wp-content/uploads/slider18/j14sacq.jpeg',
    title: 'Coffee',
    cols: 2,
  },
  {
    img: 'https://makanmate.com/wp-content/uploads/slider19/img_0330-scaled.jpg',
    title: 'Hats',
    cols: 2,
  },
  {
    img: 'https://makanmate.com/wp-content/uploads/slider19/img_0330-scaled.jpg',
    title: 'Honey',
    author: '@arwinneil',
    rows: 2,
    cols: 2,
  },
  {
    img: 'https://makanmate.com/wp-content/uploads/slider18/j14sacq.jpeg',
    title: 'Basketball',
  },
  {
    img: 'https://makanmate.com/wp-content/uploads/slider19/img_0330-scaled.jpg',
    title: 'Fern',
  },
//   {
//     img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
//     title: 'Mushrooms',
//     rows: 2,
//     cols: 2,
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
//     title: 'Tomato basil',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
//     title: 'Sea star',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
//     title: 'Bike',
//     cols: 2,
//   },
];