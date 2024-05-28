import './App.css';
import Header from './components/header';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductPage from './pages/productpage.jsx'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { CartItemProvider } from './cartContext/cartcontext.js';
import Cart from './pages/mycart.jsx';
import { WishProvider } from './cartContext/wishContext.js';
import Wish from './pages/wish.jsx';
import Footer from './components/footer.jsx';
import ScrollToTop from './components/scrollToTop.jsx';
import Register from './pages/register.jsx';
import Login from './pages/login.jsx'; 
import InsertProduct from './pages/insertProduct.jsx';
import EditProduct from './pages/editProduct.jsx';
import { ProductContextProvider } from './cartContext/productContext.js';
import { useContext } from 'react';
import { UsersContext } from './cartContext/userContext.js';

function App() {
  const {currentUser} = useContext(UsersContext);
  //App
  return (
    <div className="App">
      <ProductContextProvider>
      <CartItemProvider>
        <WishProvider>
          <Router>
            <ScrollToTop/>
            <Header />
            <Routes>
              <Route path="/EcommerceSite" element={<Home />} />
              <Route index path="/home" element={<Home />} />
              <Route path="/shop" element={<Shop/>} />
              <Route path="/shop/:id" element={<Shop/>} />
              <Route path="/product/:id" element={<ProductPage />} />
              {
                currentUser?<Route path="/mycart" element={<Cart />}/>:<Login />
              }
              {
                currentUser? <Route path="/wishlist" element={<Wish />}/>:<Login />
              }    
              <Route path="/register" element={<Register />}/>
              <Route path="/login" element={<Login />}/>
              <Route path="/insertproduct" element={<InsertProduct />}/>
              <Route path="/editproduct/:id" element={<EditProduct />}/>
              
          </Routes>
          <Footer/>
          </Router>
          </WishProvider>
      </CartItemProvider>
      </ProductContextProvider>
    </div>
  );
}

export default App;
