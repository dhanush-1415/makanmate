import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './pages/HomePage';
import About from './pages/About';
import Account from './pages/Account';
import Header from '../src/components/Header/Header';
import Footer from './components/Footer/Footer';
import { AuthProvider } from './components/Auth/AuthContet';
import ProductPage from './components/Product/productpop';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Checkout from './pages/Checkout';
import Success from './pages/success';
import Failed from './pages/failed';
import Contact from './pages/Contact';
import Events from './pages/Events';
import Blog from './pages/Blog';
import BlogDetails from './pages/BlogDetails';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <BrowserRouter basename="/">
      <AuthProvider>
        <Header />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:category" element={<Home />} />
          <Route path="/product/:productcode" element={<ProductPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/order/success" element={<Success />} />
          <Route path="/order/failed" element={<Failed />} />
          <Route path="/checkout/:shop" element={<Checkout />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/events" element={<Events />} />
          <Route path="/blogs" element={<Blog />} />
          <Route path="/blogs/:blogCode" element={<BlogDetails />} />
          <Route path="/my-account/:activepage" element={<Account />} />
          <Route path="*" element={<div>404</div>} />
        </Routes>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
