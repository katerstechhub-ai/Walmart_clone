import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetailsPage from './pages/ProductDetailsPage';
import NewArrivalsPage from './pages/NewArrivalsPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<ProductDetailsPage />} />
        <Route path="/new-arrivals" element={<NewArrivalsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;