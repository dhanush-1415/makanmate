import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import DoneIcon from '@mui/icons-material/Done';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, styled } from "@mui/material";
import { createCustomerOrder } from "../apiCalls";
import { toast } from "react-toastify";

const StyledTableHead = styled(TableHead)({
    backgroundColor: "#ff4d04",
    color:'white',
    fontWeight:'bold',
  });
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(even)': {
      backgroundColor: theme.palette.mode === "light" ? "#f5f5f5" : "#424242", 
    },
  }));
  
  const StyledTableCell = styled(TableCell)({
    color: 'black',
  });



  // {
  //   "BillDiscount": 0,
  //   "BillDiscountPerc": 0,
  //   "BranchCode": "MATE",
  //   "CameraImage": "",
  //   "ChangedBy": "admin",
  //   "ChangedOn": "2024-05-02T12:07:50.510Z",
  //   "CreatedBy": "admin",
  //   "CreatedFrom": "b2c",
  //   "CreatedOn": "2024-05-02T12:07:50.510Z",
  //   "CurrencyCode": "SGD",
  //   "CurrencyRate": 1,
  //   "CustomerAddress": "110 JURONG EAST STREET 13 123 12 HAPPY TALENT CHILDCARE CENTRE PTE. LTD., SINGAPORE 600110",
  //   "CustomerId": "0002",
  //   "CustomerName": "Dhanu",
  //   "CustomerShipToAddress": "110 JURONG EAST STREET 13 123 12 HAPPY TALENT CHILDCARE CENTRE PTE. LTD., SINGAPORE 600110",
  //   "CustomerShipToId": "",
  //   "DeliveryAmount": 5,
  //   "IsActive": true,
  //   "Latitude": 0,
  //   "Longitude": 0,
  //   "NetTotal": 22.14,
  //   "OrderDate": "2024-05-02T12:07:50.509Z",
  //   "OrderDateString": "2024-05-02T12:07:50.510Z",
  //   "OrderNo": "",
  //   "OrgId": 2,
  //   "PaidAmount": 22.14,
  //   "PaymentType": "card",
  //   "PostalCode": "600110",
  //   "Remarks": "",
  //   "SignatureImage": "",
  //   "Status": 0,
  //   "SubTotal": 16.8,
  //   "Tax": 0.34,
  //   "TaxCode": 1,
  //   "TaxPerc": 2,
  //   "TaxType": "E",
  //   "Total": 16.8,
  //   "url": "makanmate",
  //   "OrderDetail":[
  //     {
  //       "ChangedBy": "admin",
  //       "ChangedOn": "2024-05-02T12:07:50.510Z",
  //       "CreatedBy": "admin",
  //       "CreatedOn": "2024-05-02T12:07:50.510Z",
  //       "Foc": 0,
  //       "ItemDiscount": 0,
  //       "ItemDiscountPerc": 0,
  //       "NetTotal": 17.136,
  //       "OrderNo": "",
  //       "OrgId": 2,
  //       "Price": 16.8,
  //       "ProductCode": "000001",
  //       "ProductName": "Bento Option B ($16.80 per pax – min 20 pax)",
  //       "Qty": 1,
  //       "Remarks": "",
  //       "SlNo": 1,
  //       "SubTotal": 16.8,
  //       "Tax": 0.336,
  //       "TaxCode": 1,
  //       "TaxPerc": 2,
  //       "TaxType": "E",
  //       "Total": 16.8,
  //       "Weight": 0,
  //       "OrderHeaderAddOn":[
  //         {
  //           "ChangedBy": "user",
  //           "ChangedOn": "2024-05-02T12:07:31.256Z",
  //           "CreatedBy": "user",
  //           "CreatedOn": "2024-05-02T12:07:31.256Z",
  //           "CustomAddOnCode": "ADD2024-00002",
  //           "IsActive": true,
  //           "Limit": 4,
  //           "Minimum": 6,
  //           "OrderNo": "",
  //           "OrgId": 2,
  //           "Title": "Vegetable/Egg/Bean curd/Finger Food (Main)",
  //           "OrderDetailAddOn":[
  //             {
  //               "CreatedBy": "user",
  //               "CreatedOn": "2024-05-02T12:07:31.256Z",
  //               "CustomAddOnCode": "ADD2024-00002",
  //               "OrderNo": "",
  //               "OrgId": 2,
  //               "Price": 0,
  //               "ProductCode": "DEFAULT",
  //               "ProductName": "Sauteed Nyonya Chap Chye"
  //             },
  //             {
  //               "CreatedBy": "user",
  //               "CreatedOn": "2024-05-02T12:07:31.729Z",
  //               "CustomAddOnCode": "ADD2024-00002",
  //               "OrderNo": "",
  //               "OrgId": 2,
  //               "Price": 0,
  //               "ProductCode": "DEFAULT",
  //               "ProductName": "Cabbage with Black Fungus"
  //             }
                            
  //           ]
  //         }
  //       ]
  //     }
  //   ]
  // }

  
const Success = () => {

    const [orderData , setOrderData] = useState();

    const [productData , setProducts] = useState();

    const createOrder = (data) => {

        createCustomerOrder(data)
        .then((data)=>{
          if(data.Message === 'Sucess'){
            toast.success("Order placed successfully")
          }else{
            toast.error("Order is not placed !")
          }
        })
        .catch((error) => {
          toast.error(error);
        });
    }

  useEffect(() => {

      const orderDetails = JSON.parse(localStorage.getItem("orderDetails")) || [] ;

      const cartArray = JSON.parse(localStorage.getItem('makanUserCart')) || {};

      const storedUserId = ((JSON.parse(localStorage.getItem('makanUserToken')) || [])[0] || {}).B2CCustomerId;

      if (orderDetails && orderDetails.length) {
        setOrderData(orderDetails);
        createOrder(orderDetails[0]);
        setProducts(orderDetails[0].OrderDetail)
        if(orderDetails[0].BrachCode === "MATE"){
            const mateArray = cartArray[storedUserId]['MATE'];
            mateArray.length = 0 ;
        }else if(orderDetails[0].BrachCode === "MART"){
            const martArray = cartArray[storedUserId]['MART'];
            martArray.length = 0 ;
        }

        localStorage.setItem('makanUserCart', JSON.stringify(cartArray));

      } else {
        console.log("No data found in localStorage");
      }
   
  }, []); 


    const handleHomepage = () => {

        window.location.href='/';
    }  

  return (
    <>
      <Grid sx={{width:'70%' ,margin:'100px auto'}}>
        <Grid item  sx={{margin:'50px 0'}}>
            <Grid container sx={{background:'#f8f9fb' , borderRadius:'5px' , padding:'25px' , border:'1px slid grey'}}>
                <DoneIcon sx={{background:'#02b290' , padding:'5px' , margin:'0px 10px' , borderRadius:'50%' , color:'white'}} /><Typography>Thank you. Your order has been received.</Typography>
            </Grid>
        </Grid>
        <Grid item sx={{margin:'50px 0'}}>
            <Grid >
                <Typography sx={{fontSize:'25px' , fontWeight:'bold' , padding:'20px 0'}}>Order Details</Typography>
            </Grid>
            <Grid container>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <StyledTableHead>
                        <TableRow>
                            <StyledTableCell sx={{color:'white' , fontWeight:'bold'}}>Product</StyledTableCell>
                            <StyledTableCell sx={{color:'white' , fontWeight:'bold'}}>Quantity</StyledTableCell>
                            <StyledTableCell sx={{color:'white' , fontWeight:'bold'}}>Price</StyledTableCell>
                        </TableRow>
                        </StyledTableHead>
                        <TableBody>
                        {productData && productData.length && productData.map((row, index) => (
                            <StyledTableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <StyledTableCell component="th" scope="row">
                                {row.ProductName}
                            </StyledTableCell>
                            <StyledTableCell>{row.Qty}</StyledTableCell>
                            <StyledTableCell>{row.Total}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
        <Grid item>
            <Grid container justifyContent='flex-end' spacing={3}>
                <Grid item>
                    <Typography sx={{padding:'5px 0'}}>Subtotal</Typography>
                    <Typography sx={{padding:'5px 0'}}>Shipping</Typography>
                    <Typography sx={{padding:'5px 0'}}>Total</Typography>
                </Grid>
                <Grid item>
                    <Typography sx={{fontWeight:'bold' , textAlign:'right' , padding:'5px 0'}}>S$ {orderData && orderData.length && orderData[0].SubTotal}</Typography>
                    <Typography sx={{fontWeight:'bold' , textAlign:'right' , padding:'5px 0'}}>S$ {orderData && orderData.length && orderData[0].DeliveryAmount.toFixed(2)}</Typography>
                    <Typography sx={{fontWeight:'bold' , textAlign:'right' , padding:'5px 0'}}>S$ {orderData && orderData.length && orderData[0].NetTotal}</Typography>
                </Grid>
            </Grid>
        </Grid>
        <Grid>
            <button className="combtn" onClick={handleHomepage}>Return to homepage</button>
        </Grid>
      </Grid>
    </>
  );
};

export default Success;
