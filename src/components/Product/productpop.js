// ProductPage.js
import React from 'react';
import { useParams } from 'react-router-dom';

export default function ProductPage() {
  // Using useParams hook to get the "productname" parameter from the URL
  const { productname } = useParams();

  return (
    <>
      <h1>Hello {productname}</h1>
      {/* Additional content for the product page */}
    </>
  );
}
