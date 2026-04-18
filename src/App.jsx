import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetailsPage from './pages/ProductDetailsPage';
import NewArrivalsPage from './pages/NewArrivalsPage';
import CartPage from './pages/CartPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';


import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<ProductDetailsPage />} />
        <Route path="/new-arrivals" element={<NewArrivalsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;