import '../cssFiles/shop.css';
import { sortReducer } from '../Reducer/categoryReducer.js';
import { useEffect, useReducer, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AiOutlineSearch } from "react-icons/ai";
import { ProductContext } from '../cartContext/productContext.js';
import { useContext } from 'react';

const Shop = () => {  
  const { id } = useParams();
  const { products } = useContext(ProductContext); // Destructure to get products

  const [sortedProducts, dispatch] = useReducer(sortReducer, products);
  const [clickedButton, setButton] = useState(id || 'ALL');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setButton(id || 'ALL');
    if (products.length > 0) {
      dispatch({ type: 'FILTER_BY_CATEGORY', payload: id || 'ALL', products: products });
    }
  }, [id, products]);
 
  const handleSort = (category) => {
    setButton(id || 'ALL');
    dispatch({ type: 'FILTER_BY_CATEGORY', payload: category, products: products });
  };

  const filteredProducts = sortedProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const classes = {
    backgroundColor: 'white',
    color: 'black',
    border: '3px solid black',
    transition: 'all 0.25s ease-in-out',
  };

  return (
    <div className="shop">
      <div className="searchbar">
        <input type="text" value={searchTerm} onChange={handleSearchChange} />
        <AiOutlineSearch />
      </div>

      <div className='category-buttons'>
        <Link to="/shop"><button style={clickedButton === "ALL" ? classes : null} className='category-button' value="ALL" onClick={() => handleSort('ALL')}>ALL</button></Link>
        <Link to="/shop/MEN"><button style={clickedButton === "MEN" ? classes : null} className='category-button' onClick={() => handleSort('MEN')}>MEN'S</button></Link>
        <Link to="/shop/WOMEN"><button style={clickedButton === "WOMEN" ? classes : null} className='category-button' onClick={() => handleSort('WOMEN')}>WOMEN'S</button></Link>
        <Link to="/shop/ACCESSORIES"><button style={clickedButton === "ACCESSORIES" ? classes : null} className='category-button' onClick={() => handleSort('ACCESSORIES')}>ACCESSORIES</button></Link>
      </div>
      <div className="product-section">
        {
          filteredProducts.map((item, index) => (
            <div className="product" key={item.productId}>
              <Link to={`/product/${item.productId}`}>
                <div className="product-img">
                  <img src={item.photoURLs[0]} alt={index} />
                </div>
                <div className='product-info'>
                  <p>{item.name}</p>
                  <p className="product-price">$ {item.price}</p>
                </div>
              </Link>
              <button className='shop-button'>Shop Now</button>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Shop;
