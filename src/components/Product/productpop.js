// ProductPage.js
import React , { useEffect, useState}from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Typography, Button, Divider } from '@mui/material';
import './product.css';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ReplyIcon from '@mui/icons-material/Reply';
import { toast  } from 'react-toastify';
import { getProductData , addWishlist , removeWishlistData , getWishlistData , getProductAddOnData } from '../../apiCalls';
import { DotLoaderComponent } from '../loader';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { makan } from '../../config';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { getCountValue } from '../../utility';
import AddonComponent from './addon';

export default function ProductPage() {

  const { productcode } = useParams();
  const [loading, setLoading] = useState(true);
  const [count , setCount] = useState(0);
  const [addData , setAddData ] = useState();
  const [addonShow , setAddonShow ] = useState(false);
  const [prodData , setProdData ] = useState([]);
  const [countValue , setCountValue] = useState(1);

  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const [imgPath , setImagePath] = useState('https://makanmate.com/wp-content/uploads/2022/09/logo.png');

  useEffect(() => {
    const interval = setInterval(() => {
      setCountValue(getCountValue());
    }, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup function to clear interval
  }, []);


  useEffect(()=>{
    setCountValue(countValue);
  },[countValue])
  

  useEffect(() => {
    
    const data = {
      OrgId: makan.orgId,
      code:productcode,
    };
    
    getProductData(data)
      .then((data) => {
        if (data.Message === 'Sucess') {
            setProdData(data.Result[0]);
            setLoading(false);
            setImagePath(data.Result[0].ProductImagePath);
            if(data.Result[0].EcommerceGalleryImages && data.Result[0].EcommerceGalleryImages.length){
              setImagePath(data.Result[0].EcommerceGalleryImages[0].ImageFilePath);
            }
          } else {
            toast.error(data.Message + ' in getting product');
          }
      })
      .catch((error) => {
        toast.error(error);
      });
  }, [ productcode , countValue]);


  useEffect(() => {


    // const storedUserId = ((JSON.parse(localStorage.getItem('makanUserToken')) || [])[0] || {}).B2CCustomerId;

    // const storedUser = ((JSON.parse(localStorage.getItem('makanUserToken')) || [])[0] || {});


    // const cartArray = JSON.parse(localStorage.getItem('makanUserCart')) || {};

    // const shopArray = cartArray[storedUserId] ? cartArray[storedUserId]["MATE"] || [] : [];

    // console.log(shopArray , "kkkkkkkkkkkkkkkkkkkkkk")

    const data = {
      OrgId: makan.orgId,
      code:productcode,
    };
    
    getProductAddOnData(data)
      .then((data) => {
        if (data.Message === 'Sucess') {
            if(data.Result && data.Result.length){
              setAddData(data.Result);
              setAddonShow(true)
            }else{
              console.log("No Add on products ")
            }
          } else {
            console.log(data.Message + ' in getting options');
          }
      })
      .catch((error) => {
        toast.error(error);
      });
  }, [ productcode, countValue]);

  
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
  }, [ prodData , countValue]);



  const saveToCart = (data , count) => {

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

    const   OrderHeaderAddOn = [
          {
            OrgId: 2,
            OrderNo: "",
            CustomAddOnCode: "ADD2024-00002",
            Title: "Vegetable/Egg/Bean curd/Finger Food (Main)",
            Minimum: 6,
            Limit: 4,
            IsActive: true,
            CreatedBy: "user",
            CreatedOn: "2024-05-02T11:32:57.870Z",
            ChangedBy: "user",
            ChangedOn: "2024-05-02T11:32:57.870Z",
            OrderDetailAddOn: [
              {
                OrgId: 2,
                OrderNo: "",
                ProductCode: "DEFAULT",
                CustomAddOnCode: "ADD2024-00002",
                Price: 0,
                CreatedBy: "user",
                CreatedOn: "2024-05-02T11:32:57.870Z",
                ProductName: "Sauteed Nyonya Chap Chye"
              }
            ]
          }
    ]


    const existingItemIndex = cartArray[storedUserId][branchCode].findIndex(item => item.Code === data.Code);
    const dataWithCartCount = {
      ...data,
      "CartCount": count,
      "OrderHeaderAddOn": selectedItems
    };
    if (existingItemIndex !== -1) {
      cartArray[storedUserId][branchCode][existingItemIndex] = dataWithCartCount;
      toast.success("Product count is updated")
      setCountValue(countValue + 1)
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
            setCountValue(countValue + 1)
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
            setCountValue(countValue + 1)

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

  const handleCheck = (index , Limit ) => {
    if (selectedCheckboxes.includes(index)) {
      setSelectedCheckboxes(selectedCheckboxes.filter((item) => item !== index));
    } else {
      if (selectedCheckboxes.length < Limit) {
        setSelectedCheckboxes([...selectedCheckboxes, index]);
      }
    }
  };


  // const handleCheckboxChange = (index , Limit , item, data) => {

  //   handleCheck(index , Limit)

  //   const existingIndex = selectedItems.findIndex((selectedItem) => selectedItem.CustomAddOnCode === item.CustomAddOnCode);

  //   // If checkbox is checked
  //   if (existingIndex === -1) {
  //     // Create a new data object
  //     const newData = {
  //       OrgId: 0,
  //       OrderNo: "string",
  //       CustomAddOnCode: item.CustomAddOnCode,
  //       Title: item.Title,
  //       Minimum: item.Minimum,
  //       Limit: item.Limit,
  //       IsActive: true,
  //       CreatedBy: "string",
  //       CreatedOn: "2024-04-15T01:54:32.263Z",
  //       ChangedBy: "string",
  //       ChangedOn: "2024-04-15T01:54:32.263Z",
  //       OrderDetailAddOn: [data] 
  //     };

  //     // Update selectedItems state by adding newData
  //     setSelectedItems([...selectedItems, newData]);
  //   } else {
  //     // If checkbox is unchecked, remove the data
  //     const updatedItems = [...selectedItems];
  //     updatedItems[existingIndex].OrderDetailAddOn = updatedItems[existingIndex].OrderDetailAddOn.filter((item) => item.ReferenceCode !== data.ReferenceCode);
      
  //     // If no data left, remove the item itself
  //     if (updatedItems[existingIndex].OrderDetailAddOn.length === 0) {
  //       updatedItems.splice(existingIndex, 1);
  //     }

  //     // Update selectedItems state
  //     setSelectedItems(updatedItems);
  //   }
  // };
  


  // const handleCheckboxChange = (index, Limit, item, data) => {
    
  //   handleCheck(index, Limit);

  //   const existingIndex = selectedItems.findIndex(
  //     (selectedItem) => selectedItem.CustomAddOnCode === item.CustomAddOnCode
  //   );

  //   // If checkbox is checked
  //   if (existingIndex === -1) {
  //     // Create a new data object
  //     const newData = {
  //       OrgId: makan.orgId,
  //       OrderNo: "",
  //       CustomAddOnCode: item.CustomAddOnCode,
  //       Title: item.Title,
  //       Minimum: item.Minimum,
  //       Limit: item.Limit,
  //       IsActive: true,
  //       CreatedBy: "user",
  //       CreatedOn: new Date(),
  //       ChangedBy: "user",
  //       ChangedOn: new Date(),
  //       OrderDetailAddOn: [data],
  //     };

  //     // Update selectedItems state by adding newData
  //     setSelectedItems([...selectedItems, newData]);
  //   } else {
  //     // If checkbox is unchecked, add data only if arrays are not empty
  //     if (
  //       selectedItems.length > 0 &&
  //       selectedItems[existingIndex].OrderDetailAddOn.length > 0
  //     ) {
  //       // Add data to existing OrderDetailAddOn


  //       const referenceExistsIndex = selectedItems[existingIndex].OrderDetailAddOn.findIndex(
  //         (detail) => detail.ReferenceCode === data.ReferenceCode
  //       );
    
  //       // If ReferenceCode already exists, remove the object
  //       if (referenceExistsIndex !== -1) {
  //         selectedItems[existingIndex].OrderDetailAddOn.splice(referenceExistsIndex, 1);
  //       }else{
  //         selectedItems[existingIndex].OrderDetailAddOn.push(data);
  //       }
        
  //       // Update selectedItems state
  //       setSelectedItems([...selectedItems]);

        

  //     } else {
  //       // If the arrays are empty, replace with new data
  //       selectedItems[existingIndex].OrderDetailAddOn = [data];
  //     }

  //     // Update selectedItems state
  //     setSelectedItems([...selectedItems]);
  //   }
  // };
  

  const handleCheckboxChange = (index, Limit, item, data) => {
    handleCheck(index, Limit);
  
    const existingIndex = selectedItems.findIndex(
      (selectedItem) => selectedItem.CustomAddOnCode === item.CustomAddOnCode
    );
  
    // Format the data object
    const formattedData = {
      OrgId: data.OrgId, // Update with your desired value
      OrderNo: "", // Update with your desired value
      ProductCode: data.ProductCode, // Assuming ProductCode comes from data
      CustomAddOnCode: data.CustomAddOnCode,
      Price: data.Price || 0, // Assuming Price comes from data
      CreatedBy: "user", // Update with your desired value
      CreatedOn: new Date().toISOString(), // Current date and time
      ProductName: data.ProductName // Assuming ProductName comes from data
    };
  
    // If checkbox is checked
    if (existingIndex === -1) {
      // Create a new data object
      const newData = {
        OrgId: makan.orgId,
        OrderNo: "",
        CustomAddOnCode: item.CustomAddOnCode,
        Title: item.Title,
        Minimum: item.Minimum,
        Limit: item.Limit,
        IsActive: true,
        CreatedBy: "user",
        CreatedOn: new Date().toISOString(),
        ChangedBy: "user",
        ChangedOn: new Date().toISOString(),
        OrderDetailAddOn: [formattedData] // Use the formattedData object here
      };
  
      // Update selectedItems state by adding newData
      setSelectedItems([...selectedItems, newData]);
    } else {
      // If checkbox is unchecked, add data only if arrays are not empty
      if (
        selectedItems.length > 0 &&
        selectedItems[existingIndex].OrderDetailAddOn.length > 0
      ) {
        // Add data to existing OrderDetailAddOn
        const referenceExistsIndex = selectedItems[existingIndex].OrderDetailAddOn.findIndex(
          (detail) => detail.ReferenceCode === data.ReferenceCode
        );
  
        // If ReferenceCode already exists, remove the object
        if (referenceExistsIndex !== -1) {
          selectedItems[existingIndex].OrderDetailAddOn.splice(referenceExistsIndex, 1);
        } else {
          selectedItems[existingIndex].OrderDetailAddOn.push(formattedData); // Use the formattedData object here
        }
  
        // Update selectedItems state
        setSelectedItems([...selectedItems]);
      } else {
        // If the arrays are empty, replace with new data
        selectedItems[existingIndex].OrderDetailAddOn = [formattedData]; // Use the formattedData object here
      }
  
      // Update selectedItems state
      setSelectedItems([...selectedItems]);
    }
  };
  



  const handleImage = (path) => {
    setImagePath(path)
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
                              <img key={index} src={image.ImageFilePath || 'https://makanmate.com/wp-content/uploads/2022/09/logo.png'} alt='p1' width='100%' style={{ maxWidth:'200px', maxHeight:'200px'}}  onClick={(e) => handleImage(image.ImageFilePath)}  />
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
                  <img src={imgPath || 'https://makanmate.com/wp-content/uploads/2022/09/logo.png'} alt='p1' width='100%' style={{ maxWidth:'500px', maxHeight:'500px'}} />
              </Grid>
              <div className='mobscroll'>
                    {prodData.EcommerceGalleryImages && prodData.EcommerceGalleryImages.length ? (
                        <>
                          {prodData.EcommerceGalleryImages.map((image, index) => (
                              <img key={index} src={image.ImageFilePath || 'https://makanmate.com/wp-content/uploads/2022/09/logo.png'} alt='p1' width='100%' style={{ maxWidth:'150px', maxHeight:'150px'}}  onClick={(e) => handleImage(image.ImageFilePath)} />
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
                <Grid item PT={2}>
                    {/* <Button className='cartBtn' sx={{marginTop:{xs:'7px',sm:'7px' , md:'0'}}}>Add Options</Button> */}
                    
                    <Typography sx={{fontSize:'1.3rem' , fontWeight:'bold' , display: addonShow ? 'flex' : 'none'}}>Add Options :</Typography>
                    {addData && addData.length && addData.map((item , index)=>(
                      <>
                        <Grid container direction='row' justifyContent='space-between' key={index}>
                          <Grid item md={2.8} sx={{display:'grid' , alignItems:'center'}}>
                              <Divider sx={{border:'2px solid black'}}  />
                          </Grid>
                          <Grid item md={6} sx={{display:'grid' , alignItems:'center'}}>
                            <Typography sx={{textAlign:'center'}}>{item.Title}</Typography>
                          </Grid>
                          <Grid item md={2.8} sx={{display:'grid' , alignItems:'center'}}>
                            <Divider sx={{border:'2px solid black'}} />
                          </Grid>
                        </Grid>
                          {item.CustomAddonDetail && item.CustomAddonDetail && item.CustomAddonDetail.map((data, index) => (
                            <Grid sx={{ width: '100%' }} key={index}>
                              <FormControlLabel
                                value="start"
                                control={
                                  <Checkbox
                                    checked={selectedCheckboxes.includes(data.ReferenceCode)}
                                    onChange={() => handleCheckboxChange(data.ReferenceCode , item.Limit , item , data)}
                                    disabled={selectedCheckboxes.length >= item.Limit && !selectedCheckboxes.includes(data.ReferenceCode)}
                                  />
                                }
                                label={data.ProductName}
                                labelPlacement="end"
                              />
                            </Grid>
                          ))}

                          
                      </>
                    ))}


                </Grid>
              </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container width='90%' sx={{margin:'0 auto' , paddingBottom:'50px'}}>
        {prodData.Description !== "" && (
          <Grid item>
            <Typography className='typo1' pt={4}>Description</Typography>
            <Typography className='typo4' pt={4}>{prodData.Description}</Typography>
          </Grid>
        )}
        <Grid item>
          <Typography className='typo1' pt={8}>Terms & Conditions</Typography>
          <Typography className='typo4' pt={4}>{prodData.TermsAndConditions}</Typography>
        </Grid>
      </Grid>
      <Divider sx={{border:'2px solid grey' , width:'90%' , margin:'0 auto'}} />
    </>
  );
}
