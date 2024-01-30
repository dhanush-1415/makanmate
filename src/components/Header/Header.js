import React, { useState  } from 'react';
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
import { setShopValue } from '../../utility';
import FavoriteSidebar from '../favourites/favourites';
import ShoppingCartSidebar from '../cart/cart';

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


  const [currentShop , setCurrentShop ] = useState('makanmate');


  const handleShop = (shop) => {
    setShopValue(shop);
    setCurrentShop(shop);
  }



  const [isFavoriteSidebarOpen, setFavoriteSidebarOpen] = useState(false);
  const [isShoppingCartSidebarOpen, setShoppingCartSidebarOpen] = useState(false);

  const toggleFavoriteSidebar = () => {
    setFavoriteSidebarOpen(!isFavoriteSidebarOpen);
  };

  const toggleShoppingCartSidebar = () => {
    setShoppingCartSidebarOpen(!isShoppingCartSidebarOpen);
  };

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
          <ListItem>
            <Link to={`/`}>
              <Typography className="bold-text">Home</Typography>
            </Link>
          </ListItem>
          <ListItem onClick={closeSidebar}>
            <Link to={`/about`}>
              <Typography className="bold-text">About</Typography>
            </Link>
          </ListItem>
          <ListItem onClick={closeSidebar}>
            <Typography className="bold-text">Catering Menu</Typography>
          </ListItem>
          <ListItem onClick={closeSidebar}>
            <Typography className="bold-text">Panseas Seafood</Typography>
          </ListItem>
          <ListItem onClick={closeSidebar}>
            <Typography className="bold-text">Events</Typography>
          </ListItem>
          <ListItem onClick={closeSidebar}>
            <Typography className="bold-text">Blog</Typography>
          </ListItem>
          <ListItem onClick={closeSidebar}>
            <Typography className="bold-text">Contact Us</Typography>
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
                    <Typography sx={{fontWeight:'bold' , cursor:'pointer' , color: currentShop === 'makanmate' ? '#ff4d04' : 'black'}} onClick={(e)=>{handleShop('makanmate')}}>MakanMate</Typography>
                  {/* </Link> */}
                </Grid>
                <Grid item>
                  {/* <Link to={`/about`} style={{ textDecoration: 'none', color: 'inherit' }} > */}
                    <Typography sx={{fontWeight:'bold' , cursor:'pointer' ,  color: currentShop === 'makanmart' ? '#ff4d04' : 'black'}} onClick={(e)=>{handleShop('makanmart')}}>MakanMart</Typography>
                  {/* </Link> */}
                </Grid>
                <Grid item>
                  <Link to={`/about`} style={{ textDecoration: 'none', color: 'inherit' }} >
                    <Typography sx={{fontWeight:'bold' , cursor:'pointer' , color:'black'}}>Catering Menu</Typography>
                  </Link>
                </Grid>
                <Grid item>
                  <Link to={`/about`} style={{ textDecoration: 'none', color: 'inherit' }} >
                    <Typography sx={{fontWeight:'bold' , cursor:'pointer' , color:'black'}}>Panseas Seafood</Typography>
                  </Link>
                </Grid>
                <Grid item>
                <Link to={`/about`} style={{ textDecoration: 'none', color: 'inherit' }} >
                  <Typography sx={{fontWeight:'bold' , cursor:'pointer' , color:'black'}}>Events</Typography>
                </Link>
                </Grid>
      
                <Grid item>
                  <Link to={`/about`} style={{ textDecoration: 'none', color: 'inherit' }} >
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
                      <Badge badgeContent={13}  color="primary">
                        <FavoriteIcon sx={{color:'black',cursor:'pointer'}} onClick={toggleFavoriteSidebar} />
                      </Badge>
                      <FavoriteSidebar isOpen={isFavoriteSidebarOpen} onClose={toggleFavoriteSidebar} />
                    </Grid>
                    <Grid item>
                      <Badge badgeContent={4} color="primary">
                        <ShoppingCartIcon sx={{color:'black',cursor:'pointer' }} onClick={toggleShoppingCartSidebar} />
                      </Badge>
                      <ShoppingCartSidebar isOpen={isShoppingCartSidebarOpen} onClose={toggleShoppingCartSidebar} />
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