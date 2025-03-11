import React, { useEffect, useState } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Typography , Grid } from '@mui/material';
import { getAllCategories } from '../../apiCalls';
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Link } from 'react-router-dom';
import { makan } from '../../config';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
// import { getShopValue } from '../../utility';


const Category = (shop) => {

  const noimage = 'https://makanmate.com/wp-content/uploads/2022/09/logo.png';

  const [categories , setCategories ] = useState([]);

  const [data , setData] = useState([]);


  useEffect(() => {
    const data = {
      OrgId: makan.orgId,
      shop:shop,
    };

    getAllCategories(data)
      .then((data) => {
        if (data.Message === 'Sucess') {
          if (data.Data && data.Data.length) {
            const filteredCategories = data.Data.filter(category => category.CategoriesByLocation && category.CategoriesByLocation.length > 0);
            setCategories(filteredCategories);

        }        
        } else {
          toast.error(data.Message + ' in Categories');
        }
      })
      .catch((error) => {
        toast.error(error);
      });
  }, [ shop]);

  useEffect(()=>{

    const filteredCategories = categories.filter(category => 
      category.CategoriesByLocation && category.CategoriesByLocation[0] && 
      category.CategoriesByLocation[0].BranchCode === shop.shop
    );
    
    setData(filteredCategories)



  },[categories , shop])

  const handleCategoryClick = (category) => {
    window.location.href = `/Home/${category}/all`;
  }
  


  const [age, setAge] = useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
    window.location.href = `/${event.target.value}`;
  };

  return (
    <>
      <Grid sx={{display:{xs:'none' , sm:'none' , md:'flex'}}}>
          <div class="accordion" id="accordionExample">
            <div class='accordion-item' >
                  <h2 class="accordion-header p-0" id={`heading${92345}`}>
                  {/* <Link to={`/Home/${item.category.Categoryshorturl}/all/list`} style={{ textDecoration: 'none', color: 'black' }}> */}
                    <Link to={`/`} style={{ textDecoration: 'none', color: 'black' }}>
                      <button class="accordion-button collapsed pt-1 pb-1 pl-2 pr-2 " 
                        type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${92345}`} aria-expanded="false" aria-controls={`collapse${92345}`}>
                        <Grid container direction='row'>
                          {/* <Grid item md={4}>
                            <img src={ noimage} alt="e" width='60' height='60' />
                          </Grid> */}
                          <Grid className="cta-names" item md={12} sx={{ display: 'flex', alignItems: 'center' , padding:'15px 20px'}} onclick={(e) => {handleCategoryClick('/')}}>
                              <Typography className="catName" sx={{fontWeight:'bold'}}>All Products</Typography>
                          </Grid>
                        </Grid>
                      </button>
                    </Link>
                  </h2>
                </div>
              {data && data.length > 0 && data.map((item, index) => (
                <div class={`accordion-item ${!item.SubCategoryDetail || item.SubCategoryDetail.length === 0 ? '' : 'no-subcategories'}`} key={index}>
                  <h2 class="accordion-header p-0" id={`heading${index}`}>
                  {/* <Link to={`/Home/${item.category.Categoryshorturl}/all/list`} style={{ textDecoration: 'none', color: 'black' }}> */}
                    <Link to={`/${item.Categoryshorturl}`} style={{ textDecoration: 'none', color: 'black' }}>
                      <button class="accordion-button collapsed pt-1 pb-1 pl-2 pr-2 " 
                        type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`} aria-expanded="false" aria-controls={`collapse${index}`}>
                        <Grid container direction='row'>
                          {/* <Grid item md={4}>
                            <img src={item.IconImageFilePath || noimage} alt="e" width='60' height='60' />
                          </Grid> */}
                          <Grid className="cta-names" item md={12} sx={{ display: 'flex', alignItems: 'center' , padding:'15px 20px' }} onclick={(e) => {handleCategoryClick(item.Categoryshorturl)}}>
                              <Typography className="catName" sx={{fontWeight:'bold'}}>{item.Name}</Typography>
                          </Grid>
                        </Grid>
                      </button>
                    </Link>
                  </h2>
                  
                </div>
              ))}
     </div>
     </Grid>
     <div>
        <FormControl fullWidth sx={{display:{xs:'flex' , sm:'flex' , md:'none'}}}>
          <InputLabel id="demo-simple-select-label">Categories</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="Categories"
            onChange={handleChange}
          >
            {data && data.length > 0 && data.map((item, index) => (
              <MenuItem key={index} value={item.Categoryshorturl}>{item.Name}</MenuItem>
            ))}
          </Select>
        </FormControl>
     </div>
    </>
  );
};

export default Category;
