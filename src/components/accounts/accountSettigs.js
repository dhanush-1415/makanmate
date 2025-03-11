import React, { useEffect, useState } from 'react';
import { Grid, TextField, Typography, Button } from '@mui/material';
import './common.css';
import {UpdateProfile} from '../../apiCalls';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthCheck from '../Auth/AuthCheck';




function AccountSettings({ user, isLogged }) {
  const [formData, setFormData] = useState({
    "OrgId": "",
    "B2CCustomerId": "",
    "B2CCustomerName": "",
    "AddressLine1": "",
    "AddressLine2": "",
    "AddressLine3": "",
    "CountryId": "",
    "PostalCode": "",
    "MobileNo": "",
    "ChangedBy": "",
    "ChangedOn": new Date(),
    "EmailId" : ""
  });

  const [errors, setErrors] = useState({
    name: '',
    mobile: '',
  });

  useEffect(() => {
    if (user && user.length > 0) {
      const { 
        OrgId,
        ChangedBy,
        CountryId,
        B2CCustomerId,
        B2CCustomerName: userName,
        PostalCode,
        MobileNo: userMobile,
        AddressLine1,
        AddressLine2,
        AddressLine3,
        EmailId,
      } = user[0];
      setFormData({
        B2CCustomerName: userName || '',
        MobileNo: userMobile || '',
        OrgId: OrgId || '',
        ChangedBy: ChangedBy || '',
        B2CCustomerId: B2CCustomerId || '',
        PostalCode: PostalCode || '',
        AddressLine1: AddressLine1 || '',
        AddressLine2: AddressLine2 || '',
        AddressLine3: AddressLine3 || '',
        CountryId: CountryId || '',
        EmailId: EmailId || '',
      });
    }
  }, [user]);
  

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === 'mobile') {
      // Make the "+65 " prefix non-removable
      // if (value.startsWith('+65 ')) {
      //   setFormData((prevFormData) => ({
      //     ...prevFormData,
      //     [name]: value,
      //   }));
      // } else {
      //   // Ensure all characters after "+65 " are numbers
      //   const numericPart = value.replace(/\D/g, '');
      //   setFormData((prevFormData) => ({
      //     ...prevFormData,
      //     [name]: '+65 ' + numericPart,
      //   }));
      // }
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  useEffect(() => {
    const validateInput = (input, regex) => {
      return input.trim() === '' || regex.test(input);
    };
  
    const isValidName = validateInput(
      formData.B2CCustomerName,
      /^[a-zA-Z\s]{5,30}$/,
    );
  
    const isValidMobile = validateInput(
      formData.MobileNo,
      /^\+65\d{8}$/
    );
  
    setErrors((prevErrors) => ({
      ...prevErrors,
      name: isValidName ? '' : 'Name should be between 5 and 30 characters',
      mobile: isValidMobile ? '' : 'Mobile number should be a valid Singapore number (e.g., +6512345678)',
    }));
  }, [formData.B2CCustomerName, formData.MobileNo]);
  

  const handleSubmit = async () => {
    const nameError = errors.name;
    const phoneError = errors.mobile;

    if (nameError || phoneError) {
      return;
    }

    const response = await UpdateProfile(formData);

    if(response.Message ==="Sucess"){
      toast.success("Profile Updated Sucessfully");
    }else{
      toast.error("Profile Not Updated");
    }

    console.log('Form submitted:', formData);
  };

  return (
    <>

    {/* <ToastContainer /> */}
    <AuthCheck />
      <Grid container sx={{ padding: '30px' }}>
        <Typography sx={{ fontWeight: 'bold' }}>Personal Information</Typography>
        <Grid container justifyContent="space-between" sx={{ padding: '10px 0px' }}>
          <Grid xs={12} sm={12} md={3.9} sx={{paddingTop:'20px'}}>
            <TextField fullWidth id="filled-basic" label="Email" variant="filled" name="email" value={formData.EmailId} onChange={handleInputChange} disabled />
          </Grid>
          <Grid xs={12} sm={12} md={3.9} sx={{paddingTop:'20px'}}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Name"
              variant="outlined"
              name="B2CCustomerName"
              value={formData.B2CCustomerName}
              onChange={handleInputChange}
              error={Boolean(errors.name)}
              helperText={errors.name}
            />
          </Grid>
          <Grid xs={12} sm={12} md={3.9} sx={{paddingTop:'20px'}}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Mobile"
              variant="outlined"
              name="MobileNo"
              value={formData.MobileNo}
              onChange={handleInputChange}
              error={Boolean(errors.mobile)}
              helperText={errors.mobile}
            />
          </Grid>
        </Grid>
        <Grid container justifyContent="center">
          <Button className="combtn" onClick={handleSubmit}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default AccountSettings;
