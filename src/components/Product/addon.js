import React, { useState } from 'react';
import { Checkbox, FormControlLabel, FormGroup, Typography } from '@mui/material';

const AddonComponent = () => {



    const  addonData =  [
        {
          "OrgId": 2,
          "CustomAddOnCode": "ADD2024-00002",
          "Title": "Vegetable/Egg/Bean curd/Finger Food (Main)",
          "Minimum": 6,
          "Limit": 4,
          "IsActive": null,
          "CreatedBy": null,
          "CreatedOn": "0001-01-01T00:00:00",
          "ChangedBy": null,
          "ChangedOn": null,
          "LocationCode": null,
          "CustomAddonHeaderInfo": null,
          "CustomAddonDetail": [
            {
              "OrgId": 2,
              "CustomAddOnCode": "ADD2024-00002",
              "SlNo": 1,
              "ReferenceCode": "ADD2024-00002S1",
              "ProductCode": "DEFAULT",
              "ProductName": "Sauteed Nyonya Chap Chye",
              "Price": 0,
              "CreatedBy": null,
              "CreatedOn": "0001-01-01T00:00:00"
            },
            {
              "OrgId": 2,
              "CustomAddOnCode": "ADD2024-00002",
              "SlNo": 2,
              "ReferenceCode": "ADD2024-00002S2",
              "ProductCode": "DEFAULT",
              "ProductName": "Cabbage with Black Fungus",
              "Price": 0,
              "CreatedBy": null,
              "CreatedOn": "0001-01-01T00:00:00"
            },
            {
              "OrgId": 2,
              "CustomAddOnCode": "ADD2024-00002",
              "SlNo": 3,
              "ReferenceCode": "ADD2024-00002S3",
              "ProductCode": "DEFAULT",
              "ProductName": "Chye Sim with Oyster Sauce",
              "Price": 0,
              "CreatedBy": null,
              "CreatedOn": "0001-01-01T00:00:00"
            },
            {
              "OrgId": 2,
              "CustomAddOnCode": "ADD2024-00002",
              "SlNo": 4,
              "ReferenceCode": "ADD2024-00002S4",
              "ProductCode": "DEFAULT",
              "ProductName": "Kai Lan with Oyster Sauce",
              "Price": 0,
              "CreatedBy": null,
              "CreatedOn": "0001-01-01T00:00:00"
            },
            {
              "OrgId": 2,
              "CustomAddOnCode": "ADD2024-00002",
              "SlNo": 5,
              "ReferenceCode": "ADD2024-00002S5",
              "ProductCode": "DEFAULT",
              "ProductName": "Sambal Long Bean",
              "Price": 0,
              "CreatedBy": null,
              "CreatedOn": "0001-01-01T00:00:00"
            },
            {
              "OrgId": 2,
              "CustomAddOnCode": "ADD2024-00002",
              "SlNo": 6,
              "ReferenceCode": "ADD2024-00002S6",
              "ProductCode": "DEFAULT",
              "ProductName": "Curry Vegetables",
              "Price": 0,
              "CreatedBy": null,
              "CreatedOn": "0001-01-01T00:00:00"
            },
            {
              "OrgId": 2,
              "CustomAddOnCode": "ADD2024-00002",
              "SlNo": 7,
              "ReferenceCode": "ADD2024-00002S7",
              "ProductCode": "DEFAULT",
              "ProductName": "Onion Omellete",
              "Price": 0,
              "CreatedBy": null,
              "CreatedOn": "0001-01-01T00:00:00"
            },
            {
              "OrgId": 2,
              "CustomAddOnCode": "ADD2024-00002",
              "SlNo": 8,
              "ReferenceCode": "ADD2024-00002S8",
              "ProductCode": "DEFAULT",
              "ProductName": " Prawn Omellete",
              "Price": 0,
              "CreatedBy": null,
              "CreatedOn": "0001-01-01T00:00:00"
            },
            {
              "OrgId": 2,
              "CustomAddOnCode": "ADD2024-00002",
              "SlNo": 9,
              "ReferenceCode": "ADD2024-00002S9",
              "ProductCode": "DEFAULT",
              "ProductName": "Chawanmushi Egg",
              "Price": 0,
              "CreatedBy": null,
              "CreatedOn": "0001-01-01T00:00:00"
            },
            {
              "OrgId": 2,
              "CustomAddOnCode": "ADD2024-00002",
              "SlNo": 10,
              "ReferenceCode": "ADD2024-00002S10",
              "ProductCode": "DEFAULT",
              "ProductName": "Sambal Egg",
              "Price": 0,
              "CreatedBy": null,
              "CreatedOn": "0001-01-01T00:00:00"
            },
            {
              "OrgId": 2,
              "CustomAddOnCode": "ADD2024-00002",
              "SlNo": 11,
              "ReferenceCode": "ADD2024-00002S11",
              "ProductCode": "DEFAULT",
              "ProductName": "Fried Beancurd with Fried Shallot",
              "Price": 0,
              "CreatedBy": null,
              "CreatedOn": "0001-01-01T00:00:00"
            },
            {
              "OrgId": 2,
              "CustomAddOnCode": "ADD2024-00002",
              "SlNo": 12,
              "ReferenceCode": "ADD2024-00002S12",
              "ProductCode": "DEFAULT",
              "ProductName": "Ma Po Beancurd",
              "Price": 0,
              "CreatedBy": null,
              "CreatedOn": "0001-01-01T00:00:00"
            },
            {
              "OrgId": 2,
              "CustomAddOnCode": "ADD2024-00002",
              "SlNo": 13,
              "ReferenceCode": "ADD2024-00002S13",
              "ProductCode": "DEFAULT",
              "ProductName": "Deep Fried Beancurd",
              "Price": 0,
              "CreatedBy": null,
              "CreatedOn": "0001-01-01T00:00:00"
            },
            {
              "OrgId": 2,
              "CustomAddOnCode": "ADD2024-00002",
              "SlNo": 14,
              "ReferenceCode": "ADD2024-00002S14",
              "ProductCode": "DEFAULT",
              "ProductName": "Fried Fish Ball",
              "Price": 0,
              "CreatedBy": null,
              "CreatedOn": "0001-01-01T00:00:00"
            },
            {
              "OrgId": 2,
              "CustomAddOnCode": "ADD2024-00002",
              "SlNo": 15,
              "ReferenceCode": "ADD2024-00002S15",
              "ProductCode": "DEFAULT",
              "ProductName": "Vegetable Spring Roll",
              "Price": 0,
              "CreatedBy": null,
              "CreatedOn": "0001-01-01T00:00:00"
            },
            {
              "OrgId": 2,
              "CustomAddOnCode": "ADD2024-00002",
              "SlNo": 16,
              "ReferenceCode": "ADD2024-00002S16",
              "ProductCode": "DEFAULT",
              "ProductName": "Vegetable Curry Samosa",
              "Price": 0,
              "CreatedBy": null,
              "CreatedOn": "0001-01-01T00:00:00"
            },
            {
              "OrgId": 2,
              "CustomAddOnCode": "ADD2024-00002",
              "SlNo": 17,
              "ReferenceCode": "ADD2024-00002S17",
              "ProductCode": "DEFAULT",
              "ProductName": "Fried Sotong Balls",
              "Price": 0,
              "CreatedBy": null,
              "CreatedOn": "0001-01-01T00:00:00"
            },
            {
              "OrgId": 2,
              "CustomAddOnCode": "ADD2024-00002",
              "SlNo": 18,
              "ReferenceCode": "ADD2024-00002S18",
              "ProductCode": "DEFAULT",
              "ProductName": "MM Chicken Gyoza",
              "Price": 0,
              "CreatedBy": null,
              "CreatedOn": "0001-01-01T00:00:00"
            }
          ]
        },
        {
          "OrgId": 2,
          "CustomAddOnCode": "ADD2024-00003",
          "Title": "Chicken / Fish (Main) (Select 1) ",
          "Minimum": 1,
          "Limit": 1,
          "IsActive": null,
          "CreatedBy": null,
          "CreatedOn": "0001-01-01T00:00:00",
          "ChangedBy": null,
          "ChangedOn": null,
          "LocationCode": null,
          "CustomAddonHeaderInfo": null,
          "CustomAddonDetail": [
            {
              "OrgId": 2,
              "CustomAddOnCode": "ADD2024-00003",
              "SlNo": 1,
              "ReferenceCode": "ADD2024-00003S1",
              "ProductCode": "DEFAULT",
              "ProductName": "Chicken with Oyster Sauce",
              "Price": 0,
              "CreatedBy": null,
              "CreatedOn": "0001-01-01T00:00:00"
            },
            {
              "OrgId": 2,
              "CustomAddOnCode": "ADD2024-00003",
              "SlNo": 2,
              "ReferenceCode": "ADD2024-00003S2",
              "ProductCode": "DEFAULT",
              "ProductName": "Sze Chuan Chicken",
              "Price": 0,
              "CreatedBy": null,
              "CreatedOn": "0001-01-01T00:00:00"
            },
            {
              "OrgId": 2,
              "CustomAddOnCode": "ADD2024-00003",
              "SlNo": 3,
              "ReferenceCode": "ADD2024-00003S3",
              "ProductCode": "DEFAULT",
              "ProductName": "Sweet & Sour Chicken",
              "Price": 0,
              "CreatedBy": null,
              "CreatedOn": "0001-01-01T00:00:00"
            },
            {
              "OrgId": 2,
              "CustomAddOnCode": "ADD2024-00003",
              "SlNo": 4,
              "ReferenceCode": "ADD2024-00003S4",
              "ProductCode": "DEFAULT",
              "ProductName": "Honey Glazed Chicken",
              "Price": 0,
              "CreatedBy": null,
              "CreatedOn": "0001-01-01T00:00:00"
            },
            {
              "OrgId": 2,
              "CustomAddOnCode": "ADD2024-00003",
              "SlNo": 5,
              "ReferenceCode": "ADD2024-00003S5",
              "ProductCode": "DEFAULT",
              "ProductName": "Curry Chicken (Popular)",
              "Price": 0,
              "CreatedBy": null,
              "CreatedOn": "0001-01-01T00:00:00"
            },
            {
              "OrgId": 2,
              "CustomAddOnCode": "ADD2024-00003",
              "SlNo": 6,
              "ReferenceCode": "ADD2024-00003S6",
              "ProductCode": "DEFAULT",
              "ProductName": "Rendang Chicken (Popular)",
              "Price": 0,
              "CreatedBy": null,
              "CreatedOn": "0001-01-01T00:00:00"
            },
            {
              "OrgId": 2,
              "CustomAddOnCode": "ADD2024-00003",
              "SlNo": 7,
              "ReferenceCode": "ADD2024-00003S7",
              "ProductCode": "DEFAULT",
              "ProductName": "Grilled Black Pepper Chicken",
              "Price": 0,
              "CreatedBy": null,
              "CreatedOn": "0001-01-01T00:00:00"
            },
            {
              "OrgId": 2,
              "CustomAddOnCode": "ADD2024-00003",
              "SlNo": 8,
              "ReferenceCode": "ADD2024-00003S8",
              "ProductCode": "DEFAULT",
              "ProductName": "Sweet & Sour Fish Fillet",
              "Price": 0,
              "CreatedBy": null,
              "CreatedOn": "0001-01-01T00:00:00"
            },
            {
              "OrgId": 2,
              "CustomAddOnCode": "ADD2024-00003",
              "SlNo": 9,
              "ReferenceCode": "ADD2024-00003S9",
              "ProductCode": "DEFAULT",
              "ProductName": "Sze Chuan Fish Fillet",
              "Price": 0,
              "CreatedBy": null,
              "CreatedOn": "0001-01-01T00:00:00"
            },
            {
              "OrgId": 2,
              "CustomAddOnCode": "ADD2024-00003",
              "SlNo": 10,
              "ReferenceCode": "ADD2024-00003S10",
              "ProductCode": "DEFAULT",
              "ProductName": "Crispy Lemon Drizzled Fish Fillet",
              "Price": 0,
              "CreatedBy": null,
              "CreatedOn": "0001-01-01T00:00:00"
            },
            {
              "OrgId": 2,
              "CustomAddOnCode": "ADD2024-00003",
              "SlNo": 11,
              "ReferenceCode": "ADD2024-00003S11",
              "ProductCode": "DEFAULT",
              "ProductName": "Crispy Breaded Fish Fillet",
              "Price": 0,
              "CreatedBy": null,
              "CreatedOn": "0001-01-01T00:00:00"
            },
            {
              "OrgId": 2,
              "CustomAddOnCode": "ADD2024-00003",
              "SlNo": 12,
              "ReferenceCode": "ADD2024-00003S12",
              "ProductCode": "DEFAULT",
              "ProductName": "Sambal Fish Fillet",
              "Price": 0,
              "CreatedBy": null,
              "CreatedOn": "0001-01-01T00:00:00"
            },
            {
              "OrgId": 2,
              "CustomAddOnCode": "ADD2024-00003",
              "SlNo": 13,
              "ReferenceCode": "ADD2024-00003S13",
              "ProductCode": "DEFAULT",
              "ProductName": "Stir Fried Fish Fillet with Ginger & Spring Onions",
              "Price": 0,
              "CreatedBy": null,
              "CreatedOn": "0001-01-01T00:00:00"
            },
            {
              "OrgId": 2,
              "CustomAddOnCode": "ADD2024-00003",
              "SlNo": 14,
              "ReferenceCode": "ADD2024-00003S14",
              "ProductCode": "DEFAULT",
              "ProductName": "Crispy Tossed Cereal Fish Fillet",
              "Price": 0,
              "CreatedBy": null,
              "CreatedOn": "0001-01-01T00:00:00"
            },
            {
              "OrgId": 2,
              "CustomAddOnCode": "ADD2024-00003",
              "SlNo": 15,
              "ReferenceCode": "ADD2024-00003S15",
              "ProductCode": "DEFAULT",
              "ProductName": "Sambal Cured Squid",
              "Price": 0,
              "CreatedBy": null,
              "CreatedOn": "0001-01-01T00:00:00"
            },
            {
              "OrgId": 2,
              "CustomAddOnCode": "ADD2024-00003",
              "SlNo": 16,
              "ReferenceCode": "ADD2024-00003S16",
              "ProductCode": "DEFAULT",
              "ProductName": "Sauteed Mala Cured Squid",
              "Price": 0,
              "CreatedBy": null,
              "CreatedOn": "0001-01-01T00:00:00"
            },
            {
              "OrgId": 2,
              "CustomAddOnCode": "ADD2024-00003",
              "SlNo": 17,
              "ReferenceCode": "ADD2024-00003S17",
              "ProductCode": "DEFAULT",
              "ProductName": "Sauteed Cured Squid in Spicy Premium Sauce",
              "Price": 0,
              "CreatedBy": null,
              "CreatedOn": "0001-01-01T00:00:00"
            }
          ]
        }
      ];


  const [selectedItems, setSelectedItems] = useState([]);

  const handleCheckboxChange = (event, index) => {
    const selectedItem = event.target.value;
    setSelectedItems(prevSelected => {
      const updatedSelected = [...prevSelected];
      updatedSelected[index] = selectedItem;
      return updatedSelected;
    });
  };

  return (
    <>
      {addonData.map((addon, index) => (
        <div key={addon.CustomAddOnCode}>
          <Typography variant="h6">{addon.Title}</Typography>
          <FormGroup>
            {addon.CustomAddonDetail.map((detail, i) => (
              <FormControlLabel
                key={detail.ReferenceCode}
                control={
                  <Checkbox
                    checked={selectedItems[index] === detail.ProductName}
                    onChange={(event) => handleCheckboxChange(event, index)}
                    value={detail.ProductName}
                  />
                }
                label={detail.ProductName}
              />
            ))}
          </FormGroup>
        </div>
      ))}
    </>
  );
};

export default AddonComponent;
