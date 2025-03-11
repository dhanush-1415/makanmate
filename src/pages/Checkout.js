import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { Grid, Typography, Button, Divider } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { getAllAddress , removeAddress, getCurrencyData, getOrgData } from "../apiCalls";
import AddAddress from "../components/accounts/addAddress";
import DeleteIcon from '@mui/icons-material/Delete';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Slide from '@mui/material/Slide';
import DialogTitle from '@mui/material/DialogTitle';
import { makan } from "../config";
import { loadStripe } from '@stripe/stripe-js';
import CircularProgress from '@mui/material/CircularProgress';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const Checkout = () => {

    const stripePromise = loadStripe('pk_test_51HPOEBJ42ylRHBRWbALRWPxpYLXOkmOIZn0tCCQ5gDhtHnqmw3F14GdOeOme1gjPYmINhkDx7pe2KibJEtltGzC400jK7kXbcM'); 


    const { shop } = useParams();   
    
    const [addressData , setAddressData] = useState();  

    const [dialogOpen, setDialogOpen] = useState(false);

    const [open, setOpen] = useState(false);

    const userData = { user: (JSON.parse(localStorage.getItem('makanUserToken')) || []) };

    
    const [ dataArray , setCartArray ] =  useState({});

    const [subTotal , setSubtotal ] = useState(0);

    const [taxValue , setTax] = useState(0);

    const [shipping , setShipping ] = useState(5);

    const [level , setLevel] = useState(1);

    const [selectedDate, setSelectedDate] = useState('');

    const [selectedAddress , setSelectedAddress] = useState();

    const [selectedPayment , setSelectedPayment ] = useState();

    const [boxLoad , setboxload ] = useState(false);

    const [taxPercentage , setTaxPerc] = useState(0);


    useEffect(() => {
        const storedUserId = ((JSON.parse(localStorage.getItem('makanUserToken')) || [])[0] || {}).B2CCustomerId;
    
        const cartArray = JSON.parse(localStorage.getItem('makanUserCart')) || {};
    
        const shopArray = cartArray[storedUserId] ? cartArray[storedUserId][shop] || [] : [];

    
        if (shopArray && shopArray.length) {
            let total = 0; 
            let tax = 0;
    
            shopArray.forEach((item) => {
                const subtotal = item.CartCount * item.SellingCost;
                total += subtotal; 
                const totalTax = (item.TaxPerc) / 100 * (item.SellingCost) * (item.CartCount);
                tax += totalTax;
            });
            setTax(tax);
            setSubtotal(total);

            const tperc = shopArray[0].TaxPerc;

            setTaxPerc(tperc)
        }


    
        setCartArray(shopArray);
    
    }, [shop]);
    


    const handleClose = () => {
        setOpen(false);
    };

    const handleOpenDialog = () => {
      setDialogOpen(true);
    };

    const handleCloseDialog = () => {
      setDialogOpen(false);
    };

    const [data , setData] = useState({
      name:'',
      OrgId:'',
      DeliveryId:'',
      CustomerId:'',
    })
  
    const handleClickOpen = (OrgId, DeliveryId, CustomerId, Name) => {
      setOpen(true);
    
      setData((prevData) => ({
        ...prevData,
        name: Name,
        OrgId: OrgId,
        DeliveryId: DeliveryId,
        CustomerId: CustomerId,
      }));
    };
    
    useEffect(()=>{
        const user = (JSON.parse(localStorage.getItem('makanUserToken')) || []);

      if(user && user.length){
        getAllAddress(user[0])
        .then((data)=>{
          if(data.Data && data.Data.length){
            setAddressData(data.Data);
          }
        })
        .catch((error) => {
          toast.error(error);
        });
      }
    },[ dialogOpen , open]);


    const [orgData , setOrgData] = useState();

    useEffect(()=>{

      getOrgData()
      .then((data)=>{
        if(data.Data && data.Data.length){
          setOrgData(data.Data[0]);
        }
      })
      .catch((error) => {
        toast.error(error);
      });
  
    },[ ]);


    const [CurrencyData , setCurrencyData] = useState();

    useEffect(()=>{

      if(orgData){
        getCurrencyData(orgData.CurrencyId)
        .then((data)=>{

          if(data.Data && data.Data.length){
            setCurrencyData(data.Data[0]);
          }
        })
        .catch((error) => {
          toast.error(error);
        });
      }

  
    },[orgData]);



    const handleRemoveAddress = () => {
        removeAddress(data)
        .then((data)=>{
          if(data.Message === "Sucess"){
            toast.success("Address Removed Successfully");
            handleClose();
          }else{
            toast.error("Address Not Deleted");
          }
        })
        .catch((error)=>{
          toast.error(error)
        })
      }




      const isDateValid = (date) => {
        const today = new Date();
        const selected = new Date(date);
        const tenDaysFromNow = new Date();
        tenDaysFromNow.setDate(today.getDate() + 10);
    
        return selected >= today && selected <= tenDaysFromNow;
      };
    
      const handleDateChange = (event) => {
        const newDate = event.target.value;
    
        if (isDateValid(newDate)) {
          setSelectedDate(newDate);
        } else {
          toast.error('Please select a valid date within the next 10 days.');
        }
      };
    
      const today = new Date().toISOString().split('T')[0];
      const tenDaysFromNow = new Date();
      tenDaysFromNow.setDate(new Date().getDate() + 10);
      const maxDate = tenDaysFromNow.toISOString().split('T')[0];

      const handleAddressSelect = (id) => {
        console.log(id);
        setSelectedAddress(id)
        
      }

      const handlePaymentselect = (id) => {
        setSelectedPayment(id);
      }

      const handleNext = (level) => {
        if(level === 2){
            if(selectedAddress){
                setLevel(2)
            }else{
                toast.error("Please choose any address to continue");
            }
        }else if(level === 3){
            if(selectedDate !== ''){
                setLevel(3)
            }else{
                alert("Please choose delivery date to continue")
            }
        }
      }


      const makePayment = async (preorderData) => {
        setboxload(true);
        const data = [{
          products: preorderData
        }];
      
        try {
          const response = await fetch('https://makanmatepayment.onrender.com/create-checkout-session', {
          // const response = await fetch('http://localhost:3001/create-checkout-session', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });
      
          const session = await response.json();
          
          localStorage.setItem('paymentId', session.id);
      
          const stripe = await stripePromise;

      
          if (session.sessionId) {
            // stripe.redirectToCheckout({ sessionId: session.sessionId });
            window.location.href = session.sessionUrl;
          } else {
            setboxload(false);
            toast.error('Some error occurred, please try again later');
          }
      
        } catch (error) {
          setboxload(false);
          console.error('Error creating Stripe session:', error);
          toast.error("Error creating");
        }
      };


      const handleOrder = () => {

      if(dataArray && dataArray.length){

        if (!selectedAddress || !selectedPayment || !selectedDate) {
            alert("Please choose all steps to continue")
        }else{



            const storedUserId = ((JSON.parse(localStorage.getItem('makanUserToken')) || [])[0] || {}).B2CCustomerId;

            const storedUser = ((JSON.parse(localStorage.getItem('makanUserToken')) || [])[0] || {});

    
            const cartArray = JSON.parse(localStorage.getItem('makanUserCart')) || {};
        
            const shopArray = cartArray[storedUserId] ? cartArray[storedUserId][shop] || [] : [];

            console.log(shopArray , "kkkkkkkkkkkkkkkkkkkkkk")


            let address;

            addressData.forEach((item) => {
                if(item.DeliveryId === selectedAddress){
                    address = item;
                }
                
            });


            const temp = {
                "OrgId": makan.orgId,
                "BrachCode": shop,
                "OrderNo": "",
                "MobileNo": makan.MobileNo,
                "EmailId": makan.EmailId,
                "OrderDate": new Date().toISOString(),
                "CustomerId": storedUserId,
                "CustomerName": storedUser.B2CCustomerName,
                "CustomerAddress": address.AddressLine1 + ' ' + address.FloorNo + ' ' + address.UnitNo + ' ' + address.AddressLine3,
                "PostalCode": address.PostalCode,
                "TaxCode": 1,
                "TaxType": "E",
                "TaxPerc": taxPercentage,
                "CurrencyCode": CurrencyData.Code,
                "CurrencyRate": CurrencyData.CurrencyRate,
                "Total": Number(subTotal.toFixed(2)),
                "BillDiscount": 0,
                "BillDiscountPerc": 0,
                "SubTotal": Number(subTotal.toFixed(2)),
                "Tax": Number(taxValue.toFixed(2)),
                "NetTotal": Number((subTotal + shipping + taxValue).toFixed(2)),
                "PaymentType": 'card',
                "PaidAmount": Number((subTotal + shipping + taxValue).toFixed(2)),
                "Remarks": "",
                "IsActive": true,
                "CreatedBy": "admin",
                "CreatedOn": new Date().toISOString(),
                "ChangedBy": "admin",
                "ChangedOn": new Date().toISOString(),
                "Status": 0,
                "CustomerShipToId": "",
                "CustomerShipToAddress": address.AddressLine1 + ' ' + address.FloorNo + ' ' + address.UnitNo + ' ' + address.AddressLine3,
                "Latitude": 0,
                "Longitude": 0,
                "Signatureimage": "",
                "Cameraimage": "",
                "OrderDateString": new Date().toISOString(),
                "CreatedFrom": "b2c",
                "url":'makanmate',
                "CustomerEmail": makan.EmailId,
                "DeliveryAmount": Number(shipping),
                "OrderDetail":
                    shopArray.map((item, index) => {
                    return {
                      "OrgId": makan.orgId,
                      "OrderNo": "",
                      "SlNo": index + 1,
                      "ProductCode": item.Code,
                      "ProductName": item.ProductName,
                      "Qty": item.CartCount,
                      "Price": Number(item.SellingCost),
                      "Foc": 0,
                      "Total": Number((item.SellingCost * item.CartCount).toFixed(2)),
                      "ItemDiscount": 0,
                      "ItemDiscountPerc": 0,
                      "SubTotal": Number(item.SellingCost * item.CartCount),
                      "Tax": (item.TaxPerc) / 100 * (item.SellingCost) * (item.CartCount),
                      "NetTotal": ((item.TaxPerc) / 100 * (item.SellingCost) * (item.CartCount)) + (item.SellingCost) * item.CartCount,
                      // "Tax": 0,
                      // "NetTotal": Number(item.SellingCost * item.CartCount),
                      "TaxCode": 1,
                      "TaxType": "E",
                      "TaxPerc": item.TaxPerc,
                      // "TaxPerc":0,
                      "Remarks": "",
                      "CreatedBy": "admin",
                      "CreatedOn": new Date(),
                      "ChangedBy": "admin",
                      "ChangedOn": new Date(),
                      "Weight": 0,
                      "OrderHeaderAddOn": (item.OrderHeaderAddOn && item.OrderHeaderAddOn.length) ? item.OrderHeaderAddOn : ""
                    }
                  })        
              }

              // const temp2 =   {
              //     "BillDiscount": 0,
              //     "BillDiscountPerc": 0,
              //     "BrachCode": "MATE",
              //     "CameraImage": "",
              //     "ChangedBy": "admin",
              //     "ChangedOn": "2024-05-02T12:07:50.510Z",
              //     "CreatedBy": "admin",
              //     "CreatedFrom": "b2c",
              //     "CreatedOn": "2024-05-02T12:07:50.510Z",
              //     "CurrencyCode": "SGD",
              //     "CurrencyRate": 1,
              //     "CustomerAddress": "110 JURONG EAST STREET 13 123 12 HAPPY TALENT CHILDCARE CENTRE PTE. LTD., SINGAPORE 600110",
              //     "CustomerId": "0002",
              //     "CustomerName": "Dhanu",
              //     "CustomerShipToAddress": "110 JURONG EAST STREET 13 123 12 HAPPY TALENT CHILDCARE CENTRE PTE. LTD., SINGAPORE 600110",
              //     "CustomerShipToId": "",
              //     "DeliveryAmount": 5,
              //     "IsActive": true,
              //     "Latitude": 0,
              //     "Longitude": 0,
              //     "NetTotal": 22.14,
              //     "OrderDate": "2024-05-02T12:07:50.509Z",
              //     "OrderDateString": "2024-05-02T12:07:50.510Z",
              //     "OrderNo": "",
              //     "OrgId": 2,
              //     "PaidAmount": 22.14,
              //     "PaymentType": "card",
              //     "PostalCode": "600110",
              //     "Remarks": "",
              //     "SignatureImage": "",
              //     "Status": 0,
              //     "SubTotal": 16.8,
              //     "Tax": 0.34,
              //     "TaxCode": 1,
              //     "TaxPerc": 2,
              //     "TaxType": "E",
              //     "Total": 16.8,
              //     "url": "makanmate",
              //     "OrderDetail":[
              //       {
              //         "ChangedBy": "admin",
              //         "ChangedOn": "2024-05-02T12:07:50.510Z",
              //         "CreatedBy": "admin",
              //         "CreatedOn": "2024-05-02T12:07:50.510Z",
              //         "Foc": 0,
              //         "ItemDiscount": 0,
              //         "ItemDiscountPerc": 0,
              //         "NetTotal": 17.136,
              //         "OrderNo": "",
              //         "OrgId": 2,
              //         "Price": 16.8,
              //         "ProductCode": "000001",
              //         "ProductName": "Bento Option B ($16.80 per pax – min 20 pax)",
              //         "Qty": 1,
              //         "Remarks": "",
              //         "SlNo": 1,
              //         "SubTotal": 16.8,
              //         "Tax": 0.336,
              //         "TaxCode": 1,
              //         "TaxPerc": 2,
              //         "TaxType": "E",
              //         "Total": 16.8,
              //         "Weight": 0,
              //         "OrderHeaderAddOn":[
              //           {
              //             "ChangedBy": "user",
              //             "ChangedOn": "2024-05-02T12:07:31.256Z",
              //             "CreatedBy": "user",
              //             "CreatedOn": "2024-05-02T12:07:31.256Z",
              //             "CustomAddOnCode": "ADD2024-00002",
              //             "IsActive": true,
              //             "Limit": 4,
              //             "Minimum": 6,
              //             "OrderNo": "",
              //             "OrgId": 2,
              //             "Title": "Vegetable/Egg/Bean curd/Finger Food (Main)",
              //             "OrderDetailAddOn":[
              //               {
              //                 "CreatedBy": "user",
              //                 "CreatedOn": "2024-05-02T12:07:31.256Z",
              //                 "CustomAddOnCode": "ADD2024-00002",
              //                 "OrderNo": "",
              //                 "OrgId": 2,
              //                 "Price": 0,
              //                 "ProductCode": "DEFAULT",
              //                 "ProductName": "Sauteed Nyonya Chap Chye"
              //               },
              //               {
              //                 "CreatedBy": "user",
              //                 "CreatedOn": "2024-05-02T12:07:31.729Z",
              //                 "CustomAddOnCode": "ADD2024-00002",
              //                 "OrderNo": "",
              //                 "OrgId": 2,
              //                 "Price": 0,
              //                 "ProductCode": "DEFAULT",
              //                 "ProductName": "Cabbage with Black Fungus"
              //               }
                                     
              //             ]
              //           }
              //         ]
              //       }
              //     ]
              // }

              console.log(temp , "lllllllllllllllllll")

              const existingOrderDetails = JSON.parse(localStorage.getItem('orderDetails')) || [];
              existingOrderDetails.length = 0; 
              existingOrderDetails.push(temp);
              localStorage.setItem('orderDetails', JSON.stringify(existingOrderDetails));

              makePayment(temp);
        }

      }else{
        toast.error("No products to checkout")
      }

      }

    return(
        <>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                {"Are you sure to delete the address ?"}
                </DialogTitle>
                <DialogActions>
                <Button onClick={handleRemoveAddress} >Agree</Button>
                <Button onClick={handleClose} >
                    Disagree
                </Button>
                </DialogActions>
            </Dialog>
           <Grid>
                <Grid container justifyContent='space-between' sx={{ width: '90%', margin: '0 auto' , padding:'50px 0px'}}>
                    <Grid item xs={12} sm={12}  md={7.7}>
                        <Accordion expanded={level === 1} onChange={(event, isExpanded) => isExpanded && setLevel(1)}>
                            <AccordionSummary
                            expandIcon={<ArrowDropDownIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                            sx={{minHeight:'120px'}}
                            >
                            <Typography className="typo6">1</Typography>
                            <Typography className="typo7">Delivery Address</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid container justifyContent='space-between' sx={{padding:'20px'}}>
                                    {addressData && addressData.length > 0 && addressData.map((item, index) => (
                                    <>
                                        <Grid key={item.DeliveryId} xs={12} md={5.8} mt={2} sx={{ border: selectedAddress === item.DeliveryId ? '2px solid #ff4d04' : '1px solid grey' }} onClick={(e) => handleAddressSelect(item.DeliveryId)}>
                                        < DeleteIcon 
                                        sx={{float:'right' , marginTop:'-12px' , marginRight:'-12px' , color:'#ff4d04' , cursor:'pointer'}} 
                                        onClick={(e)=> {handleClickOpen(item.OrgId , item.DeliveryId , item.CustomerId , item.Name)}} />
                                        <Grid container direction='row' sx={{padding:'15px'}} >
                                            <Typography>{item.AddressLine1},</Typography>
                                            <Typography>{item.FloorNo},</Typography><Typography>{item.UnitNo}, </Typography>
                                            <Typography>{item.AddressLine3}</Typography>
                                        </Grid>
                                        </Grid>
                                    </>
                                    )) }
                                </Grid>
                                <Grid container justifyContent="space-between" sx={{padding:'20px'}} >
                                    <Button className="combtn3" onClick={handleOpenDialog}>Add New</Button>
                                    <AddAddress open={dialogOpen} handleClose={handleCloseDialog} user={userData} />
                                    <Button className="combtn3" onClick={(e)=>{handleNext(2)}}>Next Step</Button>
                                </Grid>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={level === 2} onChange={(event, isExpanded) => isExpanded && setLevel(2)}>
                            <AccordionSummary
                            expandIcon={<ArrowDropDownIcon />}
                            aria-controls="panel2-content"
                            id="panel2-header"
                            sx={{minHeight:'120px'}}
                            >
                            <Typography className="typo6">2</Typography>
                            <Typography className="typo7">Delivery Date</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className="date-input-container">
                                    <label htmlFor="datePicker">Select Delivery Date:</label>
                                    <input
                                        type="date"
                                        id="datePicker"
                                        value={selectedDate}
                                        onChange={handleDateChange}
                                        min={today}
                                        max={maxDate}
                                    />
                                    </div>
                                <Grid container justifyContent='flex-end' sx={{padding:'20px'}}>
                                    <Button className="combtn3" onClick={(e)=>{handleNext(3)}}>Next Step</Button>
                                </Grid>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={level === 3} onChange={(event, isExpanded) => isExpanded && setLevel(3)}>
                            <AccordionSummary
                            expandIcon={<ArrowDropDownIcon />}
                            aria-controls="panel3-content"
                            id="panel3-header"
                            sx={{minHeight:'120px'}}
                            >
                            <Typography className="typo6">3</Typography>
                            <Typography className="typo7">Payment Option</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid container sx={{width:'80%' , margin:'0 auto'}}>
                                    <Grid item xs={12} sm={12} md={5.7}>
                                        <Grid onClick={(e)=>{handlePaymentselect(121)}} container justifyContent='space-evenly' alignItems='center' direction='column' sx={{minHeight:'150px' , border: selectedPayment === 121 ? '2px solid #ff4d04' :'3px solid #f3f5f9'}}>
                                            <Grid item>
                                                <Typography>Pay via Stripe</Typography>
                                            </Grid>
                                            <Grid item>
                                                <img src="https://www.paypalobjects.com/webstatic/mktg/logo/AM_mc_vs_dc_ae.jpg" alt="pay" width='120px' />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                    <Grid item md={4} className="checkout">
                        <Grid container direction='column' sx={{width:'90%' , margin:'0 auto' }}>
                            <Grid item>
                                <Grid container justifyContent='space-between' sx={{padding:'10px 0px'}}>
                                    <Grid item>
                                        <Typography sx={{fontWeight:'bold'}}>Product</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography sx={{fontWeight:'bold'}}>Subtotal</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {dataArray && dataArray.length && dataArray.map((item, index) => (
                            <Grid item key={index}>
                                <>
                                <Grid container justifyContent='space-between' sx={{padding:'10px 0px'}}>
                                    <Grid item xs={3} sm={3} md={3} sx={{display:'flex' , alignItems:'center' , justifyContent:'flex-start'}}>
                                        <img style={{border:'1px solid grey' , borderRadius:'10px' , maxWidth:'70px'}} src={item.ProductImagePath || 'https://makanmate.com/wp-content/uploads/2022/09/logo.png' } alt='a1' />
                                    </Grid>
                                    <Grid item xs={6} sm={5} md={6.7} sx={{display:'flex' , alignItems:'center' , justifyContent:'flex-start'}}>
                                        <Typography>{item.ProductName}</Typography>
                                    </Grid>
                                    <Grid item xs={3} sm={3} md={2.3} sx={{display:'flex' , alignItems:'center' , justifyContent:'flex-end'}}>
                                        <Typography sx={{ fontWeight: 'bold' }}>S$ {(item.CartCount * item.SellingCost).toFixed(2)}</Typography>
                                    </Grid>
                                </Grid>
                                <Divider sx={{border:'1px solid grey'}} />
        
                                </>
                            </Grid>
                            ))}
                            <Grid item sx={{padding:'10px 0'}}>
                                <Grid container justifyContent='space-between' sx={{padding:'10px 0px'}}>
                                    <Grid item>
                                        <Typography sx={{fontWeight:'bold'}}>Subtotal</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography >S$ {subTotal.toFixed(2)}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Divider sx={{border:'1px solid grey'}} />
                            <Grid item sx={{padding:'10px 0'}}>
                                <Grid container justifyContent='space-between' sx={{padding:'10px 0px'}}>
                                    <Grid item>
                                        <Typography sx={{fontWeight:'bold'}}>Shipping</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography > S$ {shipping.toFixed(2)}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Divider sx={{border:'1px solid grey'}} />
                            <Grid item sx={{padding:'10px 0'}}>
                                <Grid container justifyContent='space-between' sx={{padding:'10px 0px'}}>
                                    <Grid item>
                                        <Typography sx={{fontWeight:'bold'}}>Total</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography sx={{fontWeight:'bold'}} >S$ {(subTotal + shipping).toFixed(2)}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Divider sx={{border:'1px solid grey'}} />
                            <Grid item sx={{padding:'10px 0'}}>
                                <button  className='cartBtn2' onClick={handleOrder} >{boxLoad ? <CircularProgress sx={{color:'white'}} /> : "Order Now"}</button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
           </Grid>
        </>
    )
}

export default Checkout;