import React , {useState , useEffect } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Grid , Typography } from '@mui/material';
import Category from '../components/homepage/category';
import HomeSlider from '../components/homepage/slider';
import ProductList from '../components/homepage/productlist';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DotLoaderComponent } from '../components/loader';

function Home() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://catchyfiveapi.appxes-erp.in/Product/GetAll?OrganizationId=3&pageNo=1&pageSize=10');
        const result = await response.json();
        setData(result.Result);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []); 


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
    <ToastContainer />
    <HomeSlider />
    <Grid container direction='row' justifyContent="space-between" sx={{paddingTop:'50px' , width:'95%' , margin:'0 auto'}}>
      <Grid item md={2.7}>
        <Category/>
      </Grid>
      <Grid item md={9.2}>
          <Grid container  spacing={1.5}>
          {data && data.length && data.map((item , index) => (
            <ProductList key={index} data={item} />
          ))}
          </Grid>
      </Grid>
    </Grid>
    </>
  );
}

export default Home;
