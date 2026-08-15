import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetailsPage from './pages/ProductDetailsPage';
import NewArrivalsPage from './pages/NewArrivalsPage';
import CartPage from './pages/CartPage';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import MerchantSignIn from './pages/admin/MerchantSignIn';
import MerchantSignUp from './pages/admin/MerchantSignUp';
import AdminDashboard from './pages/admin/AdminDashboard';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Customer Routes */}
        <Route path="/" element={<Home />} />
       <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/new-arrivals" element={<NewArrivalsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />

        {/* Admin/Merchant Routes */}
        <Route path="/admin/signin" element={<MerchantSignIn />} />
        <Route path="/admin/signup" element={<MerchantSignUp />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;