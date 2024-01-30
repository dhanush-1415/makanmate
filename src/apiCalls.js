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
    const url = `${makan.baseUrl}/B2CCustomerRegister/GetbyEmail?OrganizationId=${data.orgID}&EmailId=${data.email}`;
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
    const url = `${makan.baseUrl}/B2CCustomerRegister/Getbycode?OrganizationId=${data[0].OrgId}&B2CCustomerId=${data[0].B2CCustomerId}`;
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
    const url = `${makan.baseUrl}/SendOTP/SendOTP?OrganizationId=${data.orgID}&Email=${data.email}`;
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
    const url = `${makan.baseUrl}/B2CCustomerDeliveryAddress/GetAll?OrganizationId=${data.OrgId}&CustomerId=${data.B2CCustomerId}`;
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
    const url = `${makan.baseUrl}/B2CCustomerDeliveryAddress/Remove?OrganizationId=${data.OrgId}&CustomerId=${data.CustomerId}&DeliveryId=${data.DeliveryId}&UserName=${data.name}`;
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
    const url = `${makan.baseUrl}/Category/GetAllWithSubcategory?OrganizationId=${data.OrgId}`;
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
