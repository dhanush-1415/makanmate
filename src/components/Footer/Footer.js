import React from 'react';
import { Divider, Grid, Typography } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <>
      <Grid container direction='row' justifyContent='space-between' sx={{width:'90%' , margin:'0px auto' , padding:'30px 0px 20px'}}>
        <Grid item md={3.5} sx={{marginTop:'25px'}}>
          <img src='https://makanmate.com/wp-content/uploads/2022/09/logo.png' width='70px' alt='def3'/>
          <Typography sx={{margin:'10px 0'}}>We offer high-quality foods and the best delivery service, and the food market you can blindly trust.</Typography>
          <Grid container direction='row'>
            <Grid item>
                <InstagramIcon />
            </Grid>
            <Grid item>
                <FacebookIcon />
            </Grid>
            <Grid item>
              <TwitterIcon />
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={2.8} sx={{marginTop:'25px'}}>
          <Typography sx={{fontWeight:'bold'}}>Customer Support</Typography>
          <ul className='footerlist'>
            <li>Help & FAQ</li>
            <li>My account</li>
            <li>Advanced Search</li>
          </ul>
        </Grid>
        <Grid item md={2.5} sx={{marginTop:'25px'}}>
          <Typography sx={{fontWeight:'bold'}}>Orders</Typography>
          <ul className='footerlist'>
            <li>Order Tracking</li>
            <li>Order History</li>
            <li>Shipping & Delivery</li>
          </ul>
        </Grid>
        <Grid item md={2} sx={{marginTop:'25px'}}>
          <Typography sx={{fontWeight:'bold'}}>Our Information</Typography>
          <ul className='footerlist'>
            <li>News</li>
            <Link
              to={`/privacy-policy`}
            >
              <li>Privacy Policy</li>
            </Link>
            <li>Disclaimer</li>
            <li>Terms & Conditionss</li>
          </ul>
        </Grid>
      </Grid>
      <Divider variant="middle" sx={{borderBottomWidth: '5px', marginBottom:'20px'}} />
      <Grid container justifyContent='space-between' sx={{width:'90%' , margin:'15px auto'}}>
        <Grid item md={6}>
          <Typography>© Copyright 2024 REDQ  All rights reserved</Typography>
        </Grid>
        <Grid item md={2.8}>
          <Grid container justifyContent='space-between'>
            <Grid item>
              <img src="https://borobazar.vercel.app/assets/images/payment/mastercard.svg" alt="d1" />
            </Grid>
            <Grid item>
              <img src="https://borobazar.vercel.app/assets/images/payment/visa.svg" alt="d2" />
            </Grid>
            <Grid item>
              <img src="https://borobazar.vercel.app/assets/images/payment/paypal.svg" alt="d3" />
            </Grid>
            <Grid item>
              <img src="https://borobazar.vercel.app/assets/images/payment/jcb.svg" alt="d4" />
            </Grid>
            <Grid item>
              <img src="https://borobazar.vercel.app/assets/images/payment/skrill.svg" alt="d5" />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default Footer;