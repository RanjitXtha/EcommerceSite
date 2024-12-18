import React ,{useContext , useState} from 'react';
import { CartItemContext } from '../cartContext/cartcontext';
import '../cssFiles/cart.css';

const Cart = () => { 
  const { cartItems,addToCart, removeItem, clearCart } = useContext(CartItemContext);
  
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
    <div style={{margin:'10rem 15rem'}}>
      <div className="cart-titles">
        <h2>Product</h2>
        <h2>Title</h2>
        <h2>Price</h2>
        <h2>Quantity</h2>
        <h2>Remove</h2>
      </div>
      {cartItems.map((item, index) => (
        <div className="cart-product" key={index}>
          <div className="cart-product-image"><img src={item.photoURLs[0]} /></div>
          <p>{item.name}</p>
          <p>$ {item.price}</p>
          <div className="quantity-button">
            <p style={{marginLeft:'12%'}}>{item.quantity}</p>
            <button style={{fontSize:'100%'}} onClick={() => increasequantity(index)}>+</button>
            <button style={{fontSize:'100%'}} onClick={() => decreasequantity(index)}>-</button>
          </div>
          <button style={{fontSize:'100%'}} className="shop-button" onClick={() => removeItem(index)}>Remove</button>
        </div>
      ))}
      <h2 style={{marginTop:'5rem'}}>Price: $ {totalCost}</h2>
      <button style ={{width:'13rem',marginTop:'5rem',fontSize:'100%'}} className='shop-button' onClick={clearCart}>Clear Cart</button>
    </div>
  );
};

export default Cart;
