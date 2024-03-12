import React, {useState, useEffect} from 'react';
import { Grid, Typography, Button, TextField } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { toast } from 'react-toastify';


const Contact = () => {


    const [buttonMsg , SetButtonMsg ] = useState("Submit");
    const [btnDisable , setButtonDisable] = useState(false);
  
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      toast.success("Email sent Sucessfully");
    };
  
  
  
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone: '',
      message: '',
    });
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      // Validate form fields
      if (!formData.name || !formData.email || !formData.phone || !formData.message) {
        // Handle validation error (you can show an error message)
        toast.error('All fields are required');
        return;
      }
  
      // Prepare data for API request
      const requestData = {
        WebSiteUrl: window.location.href,
        FromEmail: 'appxpertmail@gmail.com',
        FromEmailPassword: 'qplldsxjcpqfypjm', 
        CCEmail: '',
        BCCEmail: '',
        EmailSubject: 'Grillchill Customer Query',
        EmailBody: `Message: ${formData.message}  , Email: ${formData.email} , Phone: ${formData.phone}`,
        Name: formData.name,
        ToEmail: 'dhanush.appxperts@gmail.com', 
        Phone: formData.phone,
        CreatedBy: 'User',
        CreatedOn: new Date().toISOString(),
        ChangedBy: 'Admin',
        ChangedOn: new Date().toISOString(),
        IsEmailSent: true,
      };
  
      // Send POST request to the API
  
  
      try {
        SetButtonMsg(<CircularProgress />);
        setButtonDisable(true);
        const response = await fetch('http://154.26.130.251:302/WebSiteSendEmail/SendEmail', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        });
  
        if (response.ok) {
          toast.success("Email sent Sucessfully");
          SetButtonMsg("Submit");
          setButtonDisable(false);
          setFormData({
            name: '',
            email: '',
            phone: '',
            message: '',
          });
        } else {
          toast.error('Failed to send email');
          setButtonDisable(false);
          SetButtonMsg("Submit");
        }
      } catch (error) {
        console.error('Error sending email', error);
        setButtonDisable(false);
        SetButtonMsg("Submit");
      }
    };

    return(
        <>
        
            <Grid sx={{ width:'90%',margin:'100px auto'}}>
                <Grid container direction='column' justifyContent='center' textAlign='center' sx={{padding:'0px 0px 100px 0'}}>
                    <Typography className='typo3'>CONTACT US FOR ANY CORPORATE EVENT AND GET A QUOTE</Typography>
                    <Typography className='typo2'>TEL: (65) 6264 2233 EXT 16-21</Typography>
                </Grid>
                <Grid container spacing={4}>
                    <Grid xs={12} sm={12} md={6} item sx={{display:'flex' , flexDirection:'column', justifyContent:'space-between', textAlign:'center'}}>
                        <Typography className='typo7'>Feel free to tell us your catering preferences!</Typography>
                        <Typography className='typo7'>At Makan Mate, we seek to accomodate your needs and customisations.</Typography>
                        <Typography className='typo7'>Should you be interested to engage our food catering services,</Typography>
                        <Typography className='typo7'>our lines are open for enquiries and ordering.</Typography>
                        <Typography className='typo7'>Mon to Fri from 8.30am – 5.30pm</Typography>
                        <Typography className='typo7'>Saturday from 8:30am – 3:00pm</Typography>
                        <Typography className='typo2'>35-B Fishery Port Road, Jurong Central Fish Market Singapore 619744</Typography>
                    </Grid>
                    <Grid xs={12} sm={12} md={6} item>
                        <form onSubmit={handleSubmit}>
                        <Grid container spacing={2} justifyContent='center'>
                            <Grid item xs={11}>
                            <TextField
                                fullWidth
                                label="Name"
                                variant="outlined"
                                required
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                            </Grid>
                            <Grid item xs={11}>
                            <TextField
                                fullWidth
                                label="Email"
                                type="email"
                                variant="outlined"
                                required
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                            </Grid>
                            <Grid item xs={11}>
                            <TextField
                                fullWidth
                                label="Phone"
                                variant="outlined"
                                required
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                            />
                            </Grid>
                            <Grid item xs={11}>
                            <TextField
                                fullWidth
                                label="Message"
                                multiline
                                rows={4}
                                variant="outlined"
                                required
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                            />
                            </Grid>
                            <Grid item xs={11}>
                            <button className='cartBtn' disabled={btnDisable}>
                                {buttonMsg}
                            </button>
                            </Grid>
                        </Grid>
                        </form>
                    </Grid>
                </Grid>
            </Grid>
        
        </>
    )

}

export default Contact;