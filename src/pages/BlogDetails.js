import React, { PureComponent } from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from '@mui/material';

const BlogDetails = () => {

    const { blogCode } = useParams();


    return(
        <>
            <Grid>
                <Grid container sx={{maxHeight:'500px', overflow:'hidden'}}>
                    <img src="https://makanmate.com/wp-content/uploads/2023/07/collection-of-delicious-assorted-mini-dessert-scaled.jpg" alt="d1" width="100%" />
                </Grid>
            </Grid>
        </>
    )
}

export default BlogDetails;