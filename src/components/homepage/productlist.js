import React , {useState , useEffect } from 'react';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Grid , Typography } from '@mui/material';
import './productlist.css';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { getProductData , addWishlist , getWishlistData , removeWishlistData} from '../../apiCalls';
import {toast  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { makan } from '../../config';

const ProductList = ({data , shop , changeCount}) =>{

    const [count , setCount] = useState(1);

    const [show, setshow] = useState(false);

    const [isWishlist , setIsWishlist ] = useState(false);

    const handleClickOpen = (name) => {
      window.location.href = `/product/${name}`;
    };

    useEffect(() => {
      const branchCode = shop;
      const storedUserId = ((JSON.parse(localStorage.getItem('makanUserToken')) || [])[0] || {}).B2CCustomerId;
      let cartArray = JSON.parse(localStorage.getItem('makanUserCart')) || {};
      setshow(false);
      setCount(1);
      if (cartArray[storedUserId] && cartArray[storedUserId][branchCode] && cartArray[storedUserId][branchCode].length) {
        cartArray[storedUserId][branchCode].forEach((item) => {
          if (item.Code === data.Code) {
            setshow(true);
            setCount(item.CartCount);
          }
        });
      }else{

      }
    }, [data, shop, changeCount]);
    
    useEffect(()=>{

      const storedUserId = ((JSON.parse(localStorage.getItem('makanUserToken')) || [])[0] || {}).B2CCustomerId;
  
      if(storedUserId){
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
                    if(item.ProductCode === data.Code){
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
  
    },[data , shop, changeCount])
    

    // localStorage.removeItem('makanUserCart');

    const RemoveFromCart = (data , count) => {

      const branchCode = data.BranchCode;
      const storedUserId = ((JSON.parse(localStorage.getItem('makanUserToken')) || [])[0] || {}).B2CCustomerId;

      if(storedUserId){

     let cartArray = JSON.parse(localStorage.getItem('makanUserCart')) || {};

      if (!cartArray[storedUserId]) {
        cartArray[storedUserId] = {
          MATE: [],
          MART: [],
        };
      }

      const existingItemIndex = cartArray[storedUserId][branchCode].findIndex(item => item.Code === data.Code);
      
      if (existingItemIndex !== -1) {
        cartArray[storedUserId][branchCode].splice(existingItemIndex, 1);
      }
    
      localStorage.setItem('makanUserCart', JSON.stringify(cartArray));
    }else{
      toast.error("Please login to continue")
    }
    }

    const saveToCart = (data , count) => {

      const branchCode = data.BranchCode;


      const storedUserId = ((JSON.parse(localStorage.getItem('makanUserToken')) || [])[0] || {}).B2CCustomerId;

      if(storedUserId){

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
      } else {
        cartArray[storedUserId][branchCode].push(dataWithCartCount);
      }
    
      localStorage.setItem('makanUserCart', JSON.stringify(cartArray));
    }else{
      toast.error("Please login to continue")
    }
    };
    
  
    const handleAddtoCart = (productCode , count) => {

      setshow(true);
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


    const removeCartProduct = (productCode , coun) =>{
      const data = {
        OrgId: makan.orgId,
        code:productCode,
      };
  
      getProductData(data)
        .then((data) => {
          if (data.Message === 'Sucess') {
              RemoveFromCart(data.Result[0] , count);
            } else {
              toast.error(data.Message + ' in adding product');
            }
        })
        .catch((error) => {
          toast.error(error);
        });
    }


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

    return(
        <>
        {/* <ToastContainer /> */}
        <Grid item xs={6} sm={4} md={4} lg={3} xl={2.4} className="image-hover-effect">
           <Card sx={{cursor:'pointer' , minHeight:'340px'}}>
                <CardContent>
                  <Grid container direction='column' justifyContent='space-between'>
                    <Grid item>
                        {isWishlist ? (
                          < FavoriteIcon sx={{float:'right'}} onClick={(e) => {handleRemoveWishlist(data.Code , data.Name)}}  />
                        ):(
                          < FavoriteBorderIcon sx={{float:'right'}} onClick={(e) => {handleWishlist(data.Code , data.Name)}}  />
                        )}
                      <Grid pb={2} item sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                          <div   onClick={(e) => {handleClickOpen(data.Code)}}>
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
                                      handleAddtoCart(data.Code , count - 1)
                                    }else{
                                      setshow(false);
                                      removeCartProduct(data.Code , count)
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
                                  // if (data?.EcommerceDetail && data.EcommerceDetail[0].StockAvailability) {
                                  //   if (count < data.EcommerceDetail[0].QtyOnHand) {
                                  //     if(count < 10){
                                  //       setCount(count + 1)
                                  //       handleIncreaseQuantity()
                                  //     }
                                  //   } else {
                                  //     toast.error('You have reached the maximum quantity', {
                                  //       position: "bottom-right",
                                  //       autoClose: 1000,
                                  //     })
                                  //   }
                                  // } else {
                                    setCount(count + 1)
                                    handleAddtoCart(data.Code , count + 1)
                                  // }
                                }}
                                />
                            </Grid>
                          </Grid>  
                        </Grid>
                      ):(
                        <Grid container direction='column' alignItems='end' gap={1} sx={{marginTop:'-40px' , minHeight:'70px'}}>
                          <RemoveRedEyeOutlinedIcon className="expand-look" sx={{fontSize:'32px'  , zIndex:'998'}}  onClick={(e) => {handleClickOpen(data.Code)}}/>
                          <AddIcon className="expand-look" sx={{fontSize:'32px'  , zIndex:'998'}} onClick={(e)=>{handleAddtoCart(data.Code , count)}} />
                        </Grid>
                      )}
                
                    </Grid>
                      <Grid item sx={{ paddingTop: '10px', display: 'flex', justifyContent: 'center' }}   onClick={(e) => {handleClickOpen(data.Code)}} >
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