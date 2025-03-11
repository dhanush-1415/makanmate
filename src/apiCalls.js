import { makan } from "./config";


export const getPostalAddress = async (postalCode) => {
  const url = `https://www.onemap.gov.sg/api/common/elastic/search?searchVal=${postalCode}&returnGeom=N&getAddrDetails=Y&pageNum=1`;

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error fetching data: ${error.message}`);
  }
};




export const UserbyEmail = async (data) => {
    const url = `${makan.baseUrl}/B2CCustomerRegister/GetbyEmail?OrganizationId=${makan.orgId}&EmailId=${data.email}`;
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    };
  
    return fetch(url, options).then(
      (response) => {
        return response.json();
      },
      (error) => {
        return error;
      }
    );
  };


  export const UserbyCode = async (data) => {
    const url = `${makan.baseUrl}/B2CCustomerRegister/Getbycode?OrganizationId=${makan.orgId}&B2CCustomerId=${data[0].B2CCustomerId}`;
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
  
    const response = await fetch(url, options);
  
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  
    return response.json();
  };

  export const UpdateProfile = async (data) => {
    const url = `${makan.baseUrl}/B2CCustomerRegister/EditProfile`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
  
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error('Failed to verify OTP');
      }
      return response.json();
    } catch (error) {
      console.error('Error Verifying OTP:', error);
      throw error;
    }
  };

export const sendOTP = async (data) => {
    const url = `${makan.baseUrl}/SendOTP/SendOTP?OrganizationId=${makan.orgId}&Email=${data.email}`;
    const options = {
      method: 'POST',
    };

    return fetch(url, options).then(
      (response) => {
        return response.json();
      },
      (error) => {
        return error;
      }
    );
  };

  export const verifyEmailOtp = async (data) => {
    const url = `${makan.baseUrl}/SendOTP/VerifyOTP`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
  
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error('Failed to verify OTP');
      }
      return response.json();
    } catch (error) {
      console.error('Error Verifying OTP:', error);
      throw error;
    }
  };
  

export const registerUser = async (data) => {
    const url = `${makan.baseUrl}/B2CCustomerRegister/Create`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error('Failed to verify OTP');
      }
      return response.json();
    } catch (error) {
      console.error('Error Verifying OTP:', error);
      throw error;
    }
  };


  export const UserLogin = async (data) => {
    const url = `${makan.baseUrl}/B2CCustomerRegister/CustomerLogin`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error('Failed to verify OTP');
      }
      return response.json();
    } catch (error) {
      console.error('Error Verifying OTP:', error);
      throw error;
    }
  };


  export const saveNewAddress = async (data) => {
    const url = `${makan.baseUrl}/B2CCustomerDeliveryAddress/Create`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error('Failed to verify OTP');
      }
      return response.json();
    } catch (error) {
      console.error('Error Verifying OTP:', error);
      throw error;
    }
  };


  export const getAllAddress = async (data) => {
    const url = `${makan.baseUrl}/B2CCustomerDeliveryAddress/GetAll?OrganizationId=${makan.orgId}&CustomerId=${data.B2CCustomerId}`;
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    };
  
    return fetch(url, options).then(
      (response) => {
        return response.json();
      },
      (error) => {
        return error;
      }
    );
  };


  export const removeAddress = async (data) => {
    const url = `${makan.baseUrl}/B2CCustomerDeliveryAddress/Remove?OrganizationId=${makan.orgId}&CustomerId=${data.CustomerId}&DeliveryId=${data.DeliveryId}&UserName=${data.name}`;
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    };
  
    return fetch(url, options).then(
      (response) => {
        return response.json();
      },
      (error) => {
        return error;
      }
    );
  };


  export const changePassword = async (data) => {
    const url = `${makan.baseUrl}/B2CCustomerRegister/EditProfilePassword`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error('Failed to verify OTP');
      }
      return response.json();
    } catch (error) {
      console.error('Error Verifying OTP:', error);
      throw error;
    }
  };


  export const getAllCategories = async (data) => {

    const url = `${makan.baseUrl}/Category/GetAll?OrganizationId=${makan.orgId}`;
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    };
  
    return fetch(url, options).then(
      (response) => {
        return response.json();
      },
      (error) => {
        return error;
      }
    );
  };



  export const getProductData = async (data) => {

    const url = `${makan.baseUrl}/Product/GetAllWithImage?OrganizationId=${makan.orgId}&ProductCode=${data.code}`;
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    };
  
    return fetch(url, options).then(
      (response) => {
        return response.json();
      },
      (error) => {
        return error;
      }
    );
  };



  export const addWishlist = async (data) => {
    const url = `${makan.baseUrl}/B2CCustomerWishList/Create`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error('Failed to verify OTP');
      }
      return response.json();
    } catch (error) {
      console.error('Error Verifying OTP:', error);
      throw error;
    }
  };


  
  export const getWishlistData = async (data) => {

    const url = `${makan.baseUrl}/B2CCustomerWishList/GetByCustomer?OrganizationId=${makan.orgId}&CustomerId=${data.code}`;
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    };
  
    return fetch(url, options).then(
      (response) => {
        return response.json();
      },
      (error) => {
        return error;
      }
    );
  };


  export const removeWishlistData = async (data) => {

    const url = `${makan.baseUrl}/B2CCustomerWishList/Remove?OrganizationId=${makan.orgId}&CustomerId=${data.code}&ProductCode=${data.pcode}&UserName=User`;

    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    };
  
    return fetch(url, options).then(
      (response) => {
        return response.json();
      },
      (error) => {
        return error;
      }
    );
  };


  export const createCustomerOrder = async (data) => {
    const url = `${makan.baseUrl}/B2CCustomerOrder/SaveOrderWithAddOn`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error('Failed to make order');
      }
      return response.json();
    } catch (error) {
      console.error('Error making order:', error);
      throw error;
    }
  };



  export const getAllOrders = async (data) => {
    const url = `${makan.baseUrl}/B2CCustomerOrder/GetHeaderSearch?searchModel.organisationId=${makan.orgId}&searchModel.customerCode=${data.B2CCustomerId}`;
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    };
  
    return fetch(url, options).then(
      (response) => {
        return response.json();
      },
      (error) => {
        return error;
      }
    );
  };


  export const getProductAddOnData = async (data) => {

    const url = `${makan.baseUrl}/ProductCustomAddOn/GetByCode?OrganizationId=${makan.orgId}&ProductCode=${data.code}`;
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    };
  
    return fetch(url, options).then(
      (response) => {
        return response.json();
      },
      (error) => {
        return error;
      }
    );
  };


  export const getAllBanners = async (data) => {
    const url = `${makan.baseUrl}/B2CBannerImage/GetAll?OrganizationId=${makan.orgId}`;
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    };
  
    return fetch(url, options).then(
      (response) => {
        return response.json();
      },
      (error) => {
        return error;
      }
    );
  };


  export const getCurrencyData = async (data) => {

    const url = `${makan.baseUrl}/Currency/GetAll?OrganizationId=${makan.orgId}&CurrencyCode=${data}`;

    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    };
  
    return fetch(url, options).then(
      (response) => {
        return response.json();
      },
      (error) => {
        return error;
      }
    );
  };

  export const getOrgData = async (data) => {

    const url = `${makan.baseUrl}/Organization/GetOrganizationbycode?OrganizationId=${makan.orgId}`;
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    };
  
    return fetch(url, options).then(
      (response) => {
        return response.json();
      },
      (error) => {
        return error;
      }
    );
  };