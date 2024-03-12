import React from "react";
import { Drawer, List, ListItem, Typography, Grid } from '@mui/material';


const OrderDetails = ( {isOpen, onClose}) => {
    return(
        <>

            <Drawer
              anchor="right"
              open={isOpen}
              onClose={onClose}
              PaperProps={{
                style: {
                  width: '30%',
                  background: 'white',
                  '@media (max-width: 600px)': {
                    width: '100%', 
                  },
                },
              }}
            >

                <h1>Gbjshj</h1>
            
            </Drawer>
            
        </>
    )
}

export default OrderDetails;