import React, { useEffect, createContext, useReducer } from 'react';
import { cartReducer } from '../Reducer/cartReducer';

const CartItemContext = createContext();


const CartItemProvider = ({children})=>{
    const [cartItems, dispatch] = useReducer(cartReducer, [], () => {
        const storedCartItems = localStorage.getItem('cartItems');
        return storedCartItems ? JSON.parse(storedCartItems) : [];
      });

      useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
      }, [cartItems]);

      const addToCart = (item, value) => {
        const existingItem = cartItems.find((cartItem) => cartItem.productId === item.productId);
        if (existingItem) {
          const updatedCart = cartItems.map((cartItem) =>
            cartItem.productId === item.productId ? { ...cartItem, quantity: cartItem.quantity + value } : cartItem
          );
          dispatch({ type: 'UPDATE_CART_ITEM', payload: updatedCart });
        } else {
          dispatch({ type: 'ADD_TO_CART', payload: { ...item, quantity: 1 } });
        }
      };
    
      const removeItem = (index) => {
        dispatch({ type: 'REMOVE_ITEM', payload: index });
      };
    
      const clearCart = () => {
        dispatch({ type: 'CLEAR_CART' });
      };

      return (
        <CartItemContext.Provider value={{ cartItems, addToCart, removeItem, clearCart }}>
          {children}
        </CartItemContext.Provider>
      );
}

export { CartItemProvider, CartItemContext };