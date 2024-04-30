import React ,{useContext , useState} from 'react';
import { CartContext } from './cartContext/cartcontext';
import './cart.css';

const Cart = () => { 
  const { cartItems,addToCart, removeItem, clearCart } = useContext(CartContext);
  
  const increasequantity =(index)=>{
    const updatedItem = cartItems[index];
    addToCart(updatedItem,1);
  }
  const decreasequantity = (index)=>{
    
    if(cartItems[index].quantity>1){
      const updatedItem = cartItems[index];
      addToCart(updatedItem,-1);
    }else{
      removeItem(index);
    }
  }
  const totalCost = cartItems.reduce((total, item) => total + item.quantity*item.price, 0);

  return (
    <div style={{margin:'100px 150px'}}>
      <div className="cart-titles">
        <h2>Product</h2>
        <h2>Title</h2>
        <h2>Price</h2>
        <h2>Quantity</h2>
        <h2>Remove</h2>
      </div>
      {cartItems.map((item, index) => (
        <div className="cart-product" key={index}>
          <div className="cart-product-image"><img src={item.image} /></div>
          <p>{item.name}</p>
          <p>$ {item.price}</p>
          <div className="quantity-button">
            <p style={{marginLeft:'12%'}}>{item.quantity}</p>
            <button onClick={() => increasequantity(index)}>+</button>
            <button onClick={() => decreasequantity(index)}>-</button>
          </div>
          <button className="shop-button" onClick={() => removeItem(index)}>Remove</button>
        </div>
      ))}
      <h2 style={{marginTop:'50px'}}>Price: $ {totalCost}</h2>
      <button style ={{width:'130px',marginTop:'50px'}} className='shop-button' onClick={clearCart}>Clear Cart</button>
    </div>
  );
};

export default Cart;
