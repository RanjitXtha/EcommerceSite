import React ,{useContext} from 'react';
import { WishContext } from './cartContext/wishContext';

const Cart = () => { 
  const { wishItems, removeFromWish, clearWish} = useContext(WishContext);
  return (
    <div style={{margin:'100px 150px'}}>
      <div className="cart-titles">
        <h2>Product</h2>
        <h2>Title</h2>
        <h2>Price</h2>
        <h2>Remove</h2>
      </div>
      {wishItems.map((item, index) => (
        <div className="cart-product" key={index}>
          <div className='cart-product-image'>
            <img src={item.image} alt={index}/>
          </div>
          <p>{item.name}</p>
          <p>$ {item.price}</p>
          <button className="shop-button" onClick={() => removeFromWish(index)}>Remove</button>
        </div>
      ))}
      <button style ={{width:'130px',marginTop:'50px'}} className='shop-button' onClick={clearWish}>Clear Cart</button>
    </div>
  );
};

export default Cart;
