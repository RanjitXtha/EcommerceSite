import './App.css';
import Header from './header';
import Home from './Home';
import Shop from './Shop';
import ProductPage from './productpage.js'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { CartProvider } from './cartContext/cartcontext.js';
import Cart from './mycart.js';
import { WishProvider } from './cartContext/wishContext.js';
import Wish from './wish.js';
import Footer from './footer.js';
import ScrollToTop from './scrollToTop.js';

function App() {
  return (
    <div className="App">
      <CartProvider>
        <WishProvider>
          <Router>
            <ScrollToTop/>
            <Header />
            <Routes>
              <Route path="/EcommerceSite/" element={<Home />} />
              <Route index element={<Home />} />
              <Route path="/home" element={<Home/>} />
              <Route path="/shop" element={<Shop/>} />
              <Route path="/shop/:id" element={<Shop/>} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/mycart" element={<Cart />}/>
              <Route path="/wishlist" element={<Wish />}/>
          </Routes>
          <Footer/>
          </Router>
          </WishProvider>
      </CartProvider>
    </div>
  );
}

export default App;
