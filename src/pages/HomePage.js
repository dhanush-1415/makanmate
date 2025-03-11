import React , {useState , useEffect, useRef } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Grid  } from '@mui/material';
import Category from '../components/homepage/category';
import HomeSlider from '../components/homepage/slider';
import ProductList from '../components/homepage/productlist';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { DotLoaderComponent, SyncLoaderComponent, } from '../components/loader';
import { getShopValue, getCountValue } from '../utility';
import { useParams } from 'react-router-dom';
import { makan } from '../config';


function Home() {


  const { category } = useParams();   

  const [activeShop , setActivePage ] = useState('MATE');
  const [changeCount , setChangeCount ] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNo, setPageNo] = useState(1);
  const [loader , setLoader] = useState(false);
  const [noData , setNoData ] = useState(false);

  const productContainerRef = useRef(null);




  setInterval(function() {
    setActivePage(getShopValue());
    setChangeCount(getCountValue());
  }, 1000);

  useEffect(() => {

    // localStorage.clear();

    // localStorage.removeItem('makanUserCart');

    const fetchData = async () => {
      try {
        let response;
        if(category){
            if(category === 'All'){
              response = await fetch(`${makan.baseUrl}/Product/GetAllWithImage?OrganizationId=${makan.orgId}&&BranchCode=${activeShop}&pageNo=${pageNo}&pageSize=20`);
            }else{
              response = await fetch(`${makan.baseUrl}/Product/GetAllWithImage?OrganizationId=${makan.orgId}&CategoryShortURL=${category}&BranchCode=${activeShop}&pageNo=${pageNo}&pageSize=20`);
            }
        }else{
           response = await fetch(`${makan.baseUrl}/Product/GetAllWithImage?OrganizationId=${makan.orgId}&&BranchCode=${activeShop}&pageNo=${pageNo}&pageSize=20`);
        }
        const result = await response.json();

        if(data && data.length){
          console.log("11111")
          if(result.Result && result.Result.length){
            console.log("2222")
            if(result.Result[0].BranchCode === data[0].BranchCode){
              console.log("3333")
              if(category){
                console.log("4444")
                if(result.Result[0].CategoryShortUrl === data[0].CategoryShortUrl){
                  console.log("5555")
                  if(result.Result[0].Code === data[0].Code){
                    setData(result.Result);
                  }else{
                    setData((prevData) => [...prevData, ...result.Result]);
                  }
                }else{
                  console.log("6666")
                  setData(result.Result);
                }
              }else{
                    if(result.Result[0].Code === data[0].Code){
                      setData(result.Result);
                    }else{
                      setData((prevData) => [...prevData, ...result.Result]);
                    }
              }
            }else{
              console.log("8888")
              if(result.Result && result.Result.length){
                console.log("89999")
                setData(result.Result);
              }else{
                console.log("1010101")
                setData([]);
              }
            }
          }else{
            console.log("11111111")
            if(!data && !data.length){
              setData([]);
            }
          }
        }else{
          console.log("121212")
          if(result.Result && result.Result.length){
            console.log("131313")
            setData(result.Result);
          }else{
            if(!data && !data.length){
              setData([]);
              console.log("151515")
            }
            console.log("141414")
          }
        }
        setLoading(false);
        setLoader(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
        setLoader(false);
      }
    };
    fetchData();
  }, [pageNo , activeShop , category , changeCount]); 



  const handleScroll = () => {
    const productContainer = productContainerRef.current;
    if (
      productContainer &&
      productContainer.scrollHeight - productContainer.scrollTop <=
        productContainer.clientHeight + 1
    ) {
      setPageNo(pageNo+1);
      setLoader(true);
    }
  };
  


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
    <HomeSlider />
    <Grid container spacing={2} direction='row' justifyContent="space-between" sx={{paddingTop:'50px' , width:'95%' , margin:'0 auto'}}>
      <Grid item md={2.7} sx={{ width:'100%', maxHeight: '1000px', overflow: 'auto', '&::-webkit-scrollbar': { display: 'none' } }}>
        <Category shop={activeShop} />
      </Grid>
      <Grid item md={9.2} ref={productContainerRef} onScroll={handleScroll} id='productContainer' sx={{ maxHeight: '1000px', overflow: 'auto' , scrollbarWidth: 'thin', '&::-webkit-scrollbar': { width: '5px' }  }}>
          {data && data.length ? (
            <Grid container  spacing={1.5}>
              {data && data.length && data.map((item , index) => (
                <ProductList key={index} data={item} shop={activeShop} changeCount={changeCount} />
              ))}
            </Grid>
          ):(
            <Grid>
              <Grid container justifyContent='center' alignItems='center'>
                {/* <img src="https://www.minteventrentals.com/templates/mint/images/noproductfound.png" alt="d1" /> */}
                <img src="https://tampcol.com/public/assets/images/product_not_found2.png" alt="d1" width="50%" />

              </Grid>
            </Grid>
          )}

      </Grid>
      {loader && (
        <Grid container justifyContent='center' sx={{padding:'20px 0'}}>
             <SyncLoaderComponent />
        </Grid>
      )}
    </Grid>
    </>
  );
}

export default Home;
