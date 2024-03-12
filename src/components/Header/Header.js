import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Grid,
  Drawer,
  List,
  ListItem,
  TextField,
} from '@mui/material';
import './Header.css';
import MenuIcon from '@mui/icons-material/Menu';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Auth from '../Auth/auth';
import { useAuth } from '../Auth/AuthContet';
import { Link } from 'react-router-dom';
import { setShopValue , setCountValue } from '../../utility';
import FavoriteSidebar from '../favourites/favourites';
import ShoppingCartSidebar from '../cart/cart';
import { getWishlistData , removeWishlistData , getProductData } from '../../apiCalls';
import { makan } from '../../config';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Header = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };


  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };


  const { isLogged } = useAuth();


  const [currentShop , setCurrentShop ] = useState('MATE');

  const [changeCount , setChangeCount] = useState(0);



  const handleShop = (shop) => {
    setShopValue(shop);
    setCurrentShop(shop);
  }

  useEffect(()=>{
    setCountValue(changeCount);
  },[changeCount])


  const [isFavoriteSidebarOpen, setFavoriteSidebarOpen] = useState(false);
  const [isShoppingCartSidebarOpen, setShoppingCartSidebarOpen] = useState(false);

  const toggleFavoriteSidebar = () => {
    setFavoriteSidebarOpen(!isFavoriteSidebarOpen);
  };

  const toggleShoppingCartSidebar = () => {
    setShoppingCartSidebarOpen(!isShoppingCartSidebarOpen);
  };



  const [ dataArray , setCartArray ] =  useState({});

  const [cartSubTotal , setSubtotal ] = useState(0);

  const [cartCount , setCartCount ] = useState(0);


  const RemoveFromCart = (data ) => {

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

    setCurrentShop(currentShop);
    setChangeCount(changeCount + 1);


  }else{
    toast.error("Please login to continue")
  }
  }


  const removeCartProduct = (productCode ) =>{
    const data = {
      OrgId: makan.orgId,
      code:productCode,
    };

    getProductData(data)
      .then((data) => {
        if (data.Message === 'Sucess') {
            RemoveFromCart(data.Result[0]);
            setCurrentShop(currentShop);
            setChangeCount(changeCount + 1);
          } else {
            toast.error(data.Message + ' in adding product');
          }
      })
      .catch((error) => {
        toast.error(error);
      });
  }


  useEffect(() => {
    setSubtotal(0);

    
    const storedUserId = ((JSON.parse(localStorage.getItem('makanUserToken')) || [])[0] || {}).B2CCustomerId;

    const cartArray = JSON.parse(localStorage.getItem('makanUserCart')) || {};

    const shopArray = cartArray[storedUserId] ? cartArray[storedUserId][currentShop] || [] : [];

    setCartCount(shopArray.length);

    
    if (shopArray && shopArray.length) {
      let total = 0; 

      shopArray.forEach((item) => {
          const subtotal = item.CartCount * item.SellingCost;
          total += subtotal; 
      });

      setSubtotal(total);
  }

    setCartArray(shopArray);
    setCurrentShop(currentShop);

  }, [currentShop , dataArray ]);


  const removeWishlistProduct = (code , id) => {

    const data = {
      OrgId : makan.orgId,
      code : id,
      pcode : code,
    }
    
    removeWishlistData(data)
    .then((response) => {
      if (response.Message === 'Sucess') {
          toast.success("Successfully removed product")
          setCurrentShop(currentShop)
          setChangeCount(changeCount + 1);
        } else if(response.Message === 'No data Found!') {
          console.log(response.Message + ' in removing product');
        }else{
          toast.error(response.Message + ' in removing product');
        }
    })
    .catch((error) => {
      toast.error(error);
    });

  }



  const [wishlistData , setWishlistData] = useState([]);

  const [wishlistCount , setWishlistCount ] = useState(0);


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
              if(response.Data && response.Data.length){
                setWishlistData(response.Data);
                setWishlistCount(response.Data.length)
                setCurrentShop(currentShop);
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

  },[currentShop , wishlistData ])


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

    setCurrentShop(currentShop);
    setChangeCount(changeCount + 1);

    
  }else{
    toast.error("Please login to continue")
  }
  };
  

  const handleCart = (productCode , count) => {

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



  return (
    <>
      {/* Mobile Header */}
      <AppBar  position='relative' sx={{  background:'white', display: { md: 'none', sm: 'block' }}}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleSidebar}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon sx={{color:'black'}} />
          </IconButton>
          <img src='https://makanmate.com/wp-content/uploads/2022/09/logo.png' width='60px' alt='def1'/>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer
        anchor="left"
        open={isSidebarOpen}
        onClose={closeSidebar}
        PaperProps={{
          style: {
            width: '70%',
            background: 'white',
          },
        }}
      >
        <List>
          <ListItem onClick={closeSidebar} sx={{display:'flex' , justifyContent:'flex-end'}}>
            <CloseIcon />
          </ListItem>
          <ListItem onClick={closeSidebar}>
            <Link to={`/`}>
              <Typography className="bold-text">Home</Typography>
            </Link>
          </ListItem>
          <ListItem onClick={closeSidebar}>
            <Link to={`/`}>
              <Typography className="bold-text">About</Typography>
            </Link>
          </ListItem>
          {/* <ListItem onClick={closeSidebar}>
            <Typography className="bold-text">Catering Menu</Typography>
          </ListItem> */}
          {/* <ListItem onClick={closeSidebar}>
            <Typography className="bold-text">Panseas Seafood</Typography>
          </ListItem> */}
          <ListItem onClick={closeSidebar}>
            <Link to={`/events`}>
              <Typography className="bold-text">Events</Typography>
            </Link>
          </ListItem>
          <ListItem onClick={closeSidebar}>
            <Link to={`/blogs`}>
              <Typography className="bold-text">Blogs</Typography>
            </Link>
          </ListItem>
          <ListItem onClick={closeSidebar}>
            <Link to={'/contact-us'}>
              <Typography className="bold-text">Contact Us</Typography>
            </Link>
          </ListItem>
          {/* Add more menu items as needed */}
        </List>
      </Drawer>
      {/* Desktop Header */}
      <AppBar position='relative' sx={{ background:'white',padding:'7px 0', display: { xs:'none', sm: 'none', md: 'block' } }}>
        <Toolbar>
          <Grid container alignItems="center" >
            <Grid item md={1.5}>
              <img src='https://makanmate.com/wp-content/uploads/2022/09/logo.png' width='100px' alt='def2' />
            </Grid>
            <Grid  item md={7} >
              <Grid  container justifyContent='space-between'>
                <Grid item>
                  <Link to={`/`} style={{ textDecoration: 'none', color: 'inherit' }} >
                    <Typography sx={{fontWeight:'bold' , cursor:'pointer' , color:'black'}}>Homepage</Typography>
                  </Link>
                </Grid>
                <Grid item>
                  {/* <Link to={`/about`} style={{ textDecoration: 'none', color: 'inherit' }} > */}
                    <Typography sx={{fontWeight:'bold' , cursor:'pointer' , color: currentShop === 'MATE' ? '#ff4d04' : 'black'}} onClick={(e)=>{handleShop('MATE')}}>MakanMate</Typography>
                  {/* </Link> */}
                </Grid>
                <Grid item>
                  {/* <Link to={`/about`} style={{ textDecoration: 'none', color: 'inherit' }} > */}
                    <Typography sx={{fontWeight:'bold' , cursor:'pointer' ,  color: currentShop === 'MART' ? '#ff4d04' : 'black'}} onClick={(e)=>{handleShop('MART')}}>MakanMart</Typography>
                  {/* </Link> */}
                </Grid>
                {/* <Grid item>
                  <Link to={`/about`} style={{ textDecoration: 'none', color: 'inherit' }} >
                    <Typography sx={{fontWeight:'bold' , cursor:'pointer' , color:'black'}}>Catering Menu</Typography>
                  </Link>
                </Grid> */}
                {/* <Grid item>
                  <Link to={`/`} style={{ textDecoration: 'none', color: 'inherit' }} >
                    <Typography sx={{fontWeight:'bold' , cursor:'pointer' , color:'black'}}>Panseas Seafood</Typography>
                  </Link>
                </Grid> */}
                <Grid item>
                  <Link to={`/events`} style={{ textDecoration: 'none', color: 'inherit' }} >
                    <Typography sx={{fontWeight:'bold' , cursor:'pointer' , color:'black'}}>Events</Typography>
                  </Link>
                </Grid>
                <Grid item>
                <Link to={`/blogs`} style={{ textDecoration: 'none', color: 'inherit' }} >
                    <Typography sx={{fontWeight:'bold' , cursor:'pointer' , color:'black'}}>Blogs</Typography>
                  </Link>
                </Grid>
                <Grid item>
                  <Link to={`/contact-us`} style={{ textDecoration: 'none', color: 'inherit' }} >
                    <Typography sx={{fontWeight:'bold' , cursor:'pointer' , color:'black'}}>Contact Us</Typography>
                  </Link>
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={3.5} sx={{paddingLeft:'50px'}}>
             <Grid container direction='row' justifyContent='space-between'>
                <Grid item md={6} sx={{display:'flex' , justifyContent:'center'}}>
                  <TextField size='small' id="outlined-basic" label="Search" variant="outlined" />
                </Grid>
                <Grid item md={6} sx={{display:'flex' , justifyContent:'center'}}>
                  <Grid container direction='row' justifyContent='space-evenly' alignItems='center'>
                    <Grid item>
                      <Badge badgeContent={wishlistCount}  color="primary">
                        <FavoriteIcon sx={{color:'black',cursor:'pointer'}} onClick={toggleFavoriteSidebar} />
                      </Badge>
                      <FavoriteSidebar data={wishlistData} shop={currentShop} isOpen={isFavoriteSidebarOpen} onClose={toggleFavoriteSidebar} remove={removeWishlistProduct} />
                    </Grid>
                    <Grid item>
                      <Badge badgeContent={cartCount} color="primary">
                        <ShoppingCartIcon sx={{color:'black',cursor:'pointer' }} onClick={toggleShoppingCartSidebar} />
                      </Badge>
                      <ShoppingCartSidebar shop={currentShop} dataArray={dataArray} subTotal={cartSubTotal} isOpen={isShoppingCartSidebarOpen} onClose={toggleShoppingCartSidebar} remove={removeCartProduct} updateCount={handleCart} />
                    </Grid>
                    <Grid item>
                      {isLogged ? (
                        <Link
                          to={`/my-account/accountsettings`}
                        >
                          <Typography sx={{color:'black' , fontWeight:'bold', cursor:'pointer'}}>Account</Typography>
                        </Link>
                      ):(
                        <>
                          <Typography sx={{color:'black' , fontWeight:'bold', cursor:'pointer'}} onClick={handleOpenDialog}>Sign In</Typography>
                          <Auth open={dialogOpen} handleClose={handleCloseDialog} />
                        </>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
             </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;