import React , {useState } from 'react';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Grid , Typography } from '@mui/material';
import './productlist.css';
import {toast ,  ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductList = ({data}) =>{


    const [count , setCount] = useState(1);
    const [show, setshow] = useState(false);

    const handleClickOpen = (name) => {
      console.log(name);
      window.location.href = `/product/${name}`;
    };
  
    const handleAddtoCart = (code) => {
      setshow(true);
    }

    const handleDecrementQuantity = () => {
      console.log('low -1',)
    }

    const handleIncreaseQuantity = () => {
      console.log('high +1',)
    }

    return(
        <>
        <ToastContainer />
        <Grid item xs={6} sm={4} md={4} lg={3} xl={2.4} className="image-hover-effect">
           <Card sx={{cursor:'pointer'}}>
                <CardContent>
                  <Grid container direction='column'>
                    <Grid item>
                        < FavoriteBorderIcon sx={{float:'right'}}  />
                      <Grid pb={2} item sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                          <div   onClick={(e) => {handleClickOpen('53023')}}>
                              <img
                                  src={data.ProductImagePath || 'https://makanmate.com/wp-content/uploads/2022/09/logo.png'}
                                  alt='c1'
                                  width='150px'
                                  style={{
                                      objectFit: 'cover',
                                      maxWidth: '150px',
                                      maxHeight: '140px',
                                      paddingLeft: '10px'
                                  }}
                                  className="image-hover-effect"
                              />
                          </div>
                      </Grid>
                      {show ? (
                        <Grid container direction='row' sx={{display:'flex' , justifyContent:'center'}}>
                          <Grid container direction='row' justifyContent='space-evenly' className='calc-box'>
                            <Grid item>
                                <RemoveIcon sx={{fontSize:'20px' , cursor:'pointer'}}
                                  onClick={() => {
                                    if (count > 1) {
                                      setCount(count - 1)
                                      handleDecrementQuantity()
                                    }else{
                                      setshow(false)
                                    }
                                  }}
                                  />
                            </Grid>
                            <Grid item>
                                <Typography  sx={{fontSize:'16px'}}>{count}</Typography>
                            </Grid>
                            <Grid item>
                                <AddIcon sx={{fontSize:'20px' , cursor:'pointer'}}
                                 onClick={() => {
                                  if (data?.EcommerceDetail && data.EcommerceDetail[0].StockAvailability) {
                                    if (count < data.EcommerceDetail[0].QtyOnHand) {
                                      if(count < 10){
                                        setCount(count + 1)
                                        handleIncreaseQuantity()
                                      }
                                    } else {
                                      toast.error('You have reached the maximum quantity', {
                                        position: "bottom-right",
                                        autoClose: 1000,
                                      })
                                    }
                                  } else {
                                    setCount(count + 1)
                                    handleIncreaseQuantity()
                                  }
                                }}
                                />
                            </Grid>
                          </Grid>  
                        </Grid>
                      ):(
                        <Grid container direction='column' alignItems='end' gap={1} sx={{marginTop:'-40px' , minHeight:'70px'}}>
                          <RemoveRedEyeOutlinedIcon className="expand-look" sx={{fontSize:'32px'  , zIndex:'998'}}  onClick={(e) => {handleClickOpen('53023')}}/>
                          <AddIcon className="expand-look" sx={{fontSize:'32px'  , zIndex:'998'}} onClick={(e)=>{handleAddtoCart('565656')}} />
                        </Grid>
                      )}
                
                    </Grid>
                      <Grid item sx={{ paddingTop: '10px', display: 'flex', justifyContent: 'center' }}   onClick={(e) => {handleClickOpen('53023')}} >
                          <Grid container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '100px' }}>
                              <Grid item>
                                  <Typography sx={{ fontWeight: 'bold', lineHeight: '1.5rem', fontSize: '1rem' }}>S$ {data.SellingCost.toFixed(2)}</Typography>
                                  <Typography sx={{ padding: '10px 0px', fontSize: '14px', wordBreak: 'break-all' }}>{data.Name}</Typography>
                              </Grid>
                          </Grid>
                      </Grid>
                  </Grid>
                </CardContent>
            </Card>
        </Grid>
        </>
    )
}

export default ProductList;