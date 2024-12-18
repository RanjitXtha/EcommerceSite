import React ,{useContext} from 'react';
import { WishContext } from '../cartContext/wishContext';

const Cart = () => { 
  const { wishItems, removeFromWish, clearWish} = useContext(WishContext);
  return (
    <div style={{margin:'10rem 15rem',height:'100vh'}}>
      <div className="cart-titles">
        <h2>Product</h2>
        <h2>Title</h2>
        <h2>Price</h2>
        <h2>Remove</h2>
      </div>
      {wishItems.map((item, index) => (
        <div className="cart-product" key={index}>
          <div className='cart-product-image'>
            <img src={item.photoURLs[0]} alt={index}/>
          </div>
          <p>{item.name}</p>
          <p>$ {item.price}</p>
          <button style={{fontSize:'100%'}} className="shop-button" onClick={() => removeFromWish(index)}>Remove</button>
        </div>
      ))}
      <button style ={{width:'13rem',marginTop:'5rem' , fontSize:'100%'}} className='shop-button' onClick={clearWish}>Clear Cart</button>
    </div>
  );
};

export default Cart;
