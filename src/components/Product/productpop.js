// ProductPage.js
import React , { useEffect, useState}from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Typography, Button } from '@mui/material';
import './product.css';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ReplyIcon from '@mui/icons-material/Reply';
import { toast , ToastContainer } from 'react-toastify';
import { getProductData , addWishlist , removeWishlistData , getWishlistData } from '../../apiCalls';
import { DotLoaderComponent } from '../loader';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Divider from '@mui/material/Divider';
import { makan } from '../../config';

export default function ProductPage() {

  const { productcode } = useParams();
  const [loading, setLoading] = useState(true);
  const [count , setCount] = useState(0);

  const [prodData , setProdData ] = useState([]);

  useEffect(() => {
    const data = {
      OrgId: 1,
      code:productcode,
    };

    getProductData(data)
      .then((data) => {
        if (data.Message === 'Sucess') {
            setProdData(data.Result[0]);
            setLoading(false);
          } else {
            toast.error(data.Message + ' in gettingproduct');
          }
      })
      .catch((error) => {
        toast.error(error);
      });
  }, [ productcode]);



  
  useEffect(() => {

    const branchCode = prodData.BranchCode;
    const storedUserId = ((JSON.parse(localStorage.getItem('makanUserToken')) || [])[0] || {}).B2CCustomerId;
    if(storedUserId){
    let cartArray = JSON.parse(localStorage.getItem('makanUserCart')) || {};
    if (cartArray[storedUserId] && cartArray[storedUserId][branchCode] && cartArray[storedUserId][branchCode].length) {
      cartArray[storedUserId][branchCode].forEach((item) => {
        if (item.Code === prodData.Code) {
          setCount(item.CartCount);
        }
      });
    }

    const formData ={
      OrgId:makan.orgId,
      code:storedUserId,
    }
    getWishlistData(formData)
    .then((response) => {
      if (response.Message === 'Sucess') {
        setIsWishlist(false)
          if(response.Data && response.Data.length){
            response.Data.forEach((item) => {
              if(item.ProductCode === prodData.Code){
                setIsWishlist(true);
              }
            });
          }
        } else if(response.Message === 'No data Found!') {
          console.log(response.Message + ' in wishlist');
        }else{
          toast.error(response.Message + ' in getting wishlist');
        }
    })
    .catch((error) => {
      toast.error(error);
    });

  }
  }, [ prodData]);



  const saveToCart = (data , count) => {


    console.log(data , count)

    const branchCode = data.BranchCode;
    const storedUserId = ((JSON.parse(localStorage.getItem('makanUserToken')) || [])[0] || {}).B2CCustomerId;

    if(storedUserId){

      if(count > 0 ){

   let cartArray = JSON.parse(localStorage.getItem('makanUserCart')) || {};

    if (!cartArray[storedUserId]) {
      cartArray[storedUserId] = {
        MATE: [],
        MART: [],
      };
    }

    const existingItemIndex = cartArray[storedUserId][branchCode].findIndex(item => item.Code === data.Code);
    const dataWithCartCount = {
      ...data,
      "CartCount": count
    };
    if (existingItemIndex !== -1) {
      cartArray[storedUserId][branchCode][existingItemIndex] = dataWithCartCount;
      toast.success("Product count is updated")
    } else {
      cartArray[storedUserId][branchCode].push(dataWithCartCount);
      toast.success("Product added to cart")
    }
  
    localStorage.setItem('makanUserCart', JSON.stringify(cartArray));

  }else{
    toast.error("Count 0 cannot be added")
  }

  }else{
    toast.error("Please login to continue")
  }
  };
  

  const handleAddtoCart = (productCode , count) => {

    const data = {
      OrgId: makan.orgId,
      code:productCode,
    };

    getProductData(data)
      .then((data) => {
        if (data.Message === 'Sucess') {
            saveToCart(data.Result[0] , count);
          } else {
            toast.error(data.Message + ' in adding product');
          }
      })
      .catch((error) => {
        toast.error(error);
      });
  }
  
  const [isWishlist , setIsWishlist ] = useState(false);


  const handleWishlist = (code , name) => {

    const storedUserId = ((JSON.parse(localStorage.getItem('makanUserToken')) || [])[0] || {}).B2CCustomerId;

    if(storedUserId){
      
      const data = {
        OrgId: makan.orgId,
        CustomerId: storedUserId,
        ProductCode: code,
        ProductName: name,
        IsActive: true,
        CreatedBy: "user",
        CreatedOn: new Date(),
      }

      addWishlist(data)
      .then((data) => {
        if (data.Message === 'Sucess') {
            toast.success("Product added to wishlist");
            setIsWishlist(true);
          } else {
            toast.error(data.Message + ' in adding product');
          }
      })
      .catch((error) => {
        toast.error(error);
      });

    }else{
      toast.error('Please Login to continue')
    }

  }


  const handleRemoveWishlist = (code , name) => {

    const storedUserId = ((JSON.parse(localStorage.getItem('makanUserToken')) || [])[0] || {}).B2CCustomerId;

    if(storedUserId){

      const data = {
        OrgId: makan.orgId,
        code:storedUserId,
        pcode:code,
      }

      removeWishlistData(data)
      .then((data) => {
        if (data.Message === 'Sucess') {
            toast.success("Product removed from wishlist");
            setIsWishlist(false);
          } else {
            toast.error(data.Message + ' in adding product');
          }
      })
      .catch((error) => {
        toast.error(error);
      });

    }else{
      toast.error('Please Login to continue')
    }
  }



  if (loading) {
    return (
      <>
      <Grid
          sx={{
            height: '80vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <DotLoaderComponent />
        </Grid>
      </>
    );
  }



  return (
    <>
    {/* <ToastContainer /> */}
      <Grid sx={{width:'90%' , margin:'50px auto'}}>
        <Grid container justifyContent='space-between'>
          <Grid item md={6.7}>
            <Grid container justifyContent='space-between'>
              <Grid item md={3.5}>
                  <div className='deskscroll'>
                    {prodData.EcommerceGalleryImages && prodData.EcommerceGalleryImages.length ? (
                        <>
                          {prodData.EcommerceGalleryImages.map((image, index) => (
                              <img key={index} src={image.ImageFilePath || 'https://makanmate.com/wp-content/uploads/2022/09/logo.png'} alt='p1' width='100%' style={{ maxWidth:'200px', maxHeight:'200px'}} />
                          ))}
                        </>
                    ):(
                      <>
                            <img src={prodData.ProductImagePath || 'https://makanmate.com/wp-content/uploads/2022/09/logo.png'} alt='p1' width='100%' style={{ maxWidth:'200px', maxHeight:'200px'}} />
                      </>
                    )}
                </div>

              </Grid>
              <Grid item md={8} sx={{display:'flex' , justifyContent:'center'}}>
                <img src={prodData.ProductImagePath || 'https://makanmate.com/wp-content/uploads/2022/09/logo.png'} alt='p1' width='100%' style={{ maxWidth:'500px', maxHeight:'500px'}} />
              </Grid>
              <div className='mobscroll'>
                    {prodData.EcommerceGalleryImages && prodData.EcommerceGalleryImages.length ? (
                        <>
                          {prodData.EcommerceGalleryImages.map((image, index) => (
                              <img key={index} src={image.ImageFilePath || 'https://makanmate.com/wp-content/uploads/2022/09/logo.png'} alt='p1' width='100%' style={{ maxWidth:'150px', maxHeight:'150px'}} />
                          ))}
                        </>
                    ):(
                      <>
                        <img src={prodData.ProductImagePath || 'https://makanmate.com/wp-content/uploads/2022/09/logo.png'} alt='p1' width='100%' style={{ maxWidth:'150px', maxHeight:'150px'}} />
                      </>
                    )}
                </div>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={5}>
              <Grid container direction='column'>
                <Grid item>
                  <Typography className='typo1'>{prodData.Name}</Typography>
                </Grid>
                <Grid item pt={2}> 
                  <Typography className='typo2'>S$ {prodData.SellingCost}</Typography>
                </Grid>
                <Grid item pt={3}>
                  <Grid container justifyContent='space-between'>
                    <Grid item xs={12} sm={12} md={5.7} sx={{marginTop:{xs:'7px',sm:'7px' , md:'0'}}}>
                      <Grid container className='cartCalc'>
                        <Typography className='typo3'><RemoveIcon sx={{cursor:'pointer'}} onClick={() => {setCount(count - 1)}} /></Typography>
                        <Typography className='typo3'>{count}</Typography>
                        <Typography className='typo3'><AddIcon sx={{cursor:'pointer'}} onClick={() => {setCount(count + 1)}} /></Typography>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12} md={5.7} sx={{marginTop:{xs:'7px',sm:'7px' , md:'0'}}}>
                      <Button className='cartBtn' onClick={(e)=>{handleAddtoCart(prodData.Code , count)}}>Add to Cart</Button>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item PT={2}>
                    <Button className='cartBtn' sx={{marginTop:{xs:'7px',sm:'7px' , md:'0'}}}>Add Options</Button>
                </Grid>
                <Grid item pt={3}>
                  <Grid container justifyContent='space-between'>
                      <Grid item md={5.7}>
                        {isWishlist ? (
                            <Grid container className='wishbox' justifyContent='center' alignItems='center' onClick={()=>{handleRemoveWishlist(prodData.Code , prodData.Name)}}>
                                 <Typography sx={{fontSize:'20px' , fontWeight:'bold'}}>Wishlist</Typography>
                                 <FavoriteIcon sx={{fontSize:'30px'}}/>
                            </Grid>
                        ):(
                            <Grid container className='wishbox' justifyContent='center' alignItems='center' onClick={()=>{handleWishlist(prodData.Code , prodData.Name)}}>
                              <Typography sx={{fontSize:'20px' , fontWeight:'bold'}}>Wishlist</Typography>
                              <FavoriteBorderIcon sx={{fontSize:'30px'}}/>
                            </Grid>
                        )}
                      </Grid>
                      <Grid item md={5.7}>
                        <Grid container  className='sharebox' justifyContent='center' alignItems='center'>
                            <Typography sx={{fontSize:'20px' , fontWeight:'bold'}}>Share</Typography>
                            <ReplyIcon sx={{fontSize:'30px'}} />
                        </Grid>
                      </Grid>
                  </Grid>
                </Grid>
              </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container width='90%' sx={{margin:'0 auto' , paddingBottom:'50px'}}>
        <Grid item>
          <Typography className='typo1' pt={4}>Description</Typography>
          <Typography className='typo4' pt={4}>(Alternative Text) -  Prices are subjected to $60 transport (CBD $80) and prevailing GST charge.b. Food is best consumed within 3 hours.c. Provision of full table set-up with warmers, disposable cornware crockery & cutlery. No takeaway packaging will be provided as in accordance to SFA regulation.d. Maximum 3 hours per function upon arrival time, additional charge of $25/hr after the designated collection time. Collection of catering on the following day will be chargeable at $50 per trip e. Applied surcharge of $80/level for function room above or below street level without lift landing.f. Additional charges of $50.00 is applicable for delivery before 8.30am or after 7pm. Payment by Bank Transfer or Cheque or refer to Sales Executive for other payments method – Ge-Biz or Electronic Transfer.g. A cancellation of 50% from the total order amount will be charged for any cancellation made less than 5 working days from date of function.h. We reserve the right to change the dish to another with equivalent value without prior notice due to seasonality.</Typography>
        </Grid>
        <Grid item>
          <Typography className='typo1' pt={8}>Terms & Conditions</Typography>
          <Typography className='typo4' pt={4}>(Alternative Text) -  Prices are subjected to $60 transport (CBD $80) and prevailing GST charge.b. Food is best consumed within 3 hours.c. Provision of full table set-up with warmers, disposable cornware crockery & cutlery. No takeaway packaging will be provided as in accordance to SFA regulation.d. Maximum 3 hours per function upon arrival time, additional charge of $25/hr after the designated collection time. Collection of catering on the following day will be chargeable at $50 per trip e. Applied surcharge of $80/level for function room above or below street level without lift landing.f. Additional charges of $50.00 is applicable for delivery before 8.30am or after 7pm. Payment by Bank Transfer or Cheque or refer to Sales Executive for other payments method – Ge-Biz or Electronic Transfer.g. A cancellation of 50% from the total order amount will be charged for any cancellation made less than 5 working days from date of function.h. We reserve the right to change the dish to another with equivalent value without prior notice due to seasonality.</Typography>
        </Grid>
      </Grid>
      <Divider sx={{border:'2px solid grey' , width:'90%' , margin:'0 auto'}} />
    </>
  );
}
