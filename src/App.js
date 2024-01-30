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
import './App.css';

function App() {
  return (
    <BrowserRouter basename="/">
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rt" element={<Home />} />
          <Route path="/product/:productname" element={<ProductPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/my-account/:activepage" element={<Account />} />
          <Route path="*" element={<div>404</div>} />
        </Routes>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
