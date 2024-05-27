import React, { useEffect, createContext, useReducer } from 'react';
import { wishReducer } from '../Reducer/wishReducer';

const WishContext = createContext();


const WishProvider = ({children})=>{
    const [wishItems, dispatch] = useReducer(wishReducer, [], () => {
        const storedWishItems = localStorage.getItem('wishItems');
        return storedWishItems ? JSON.parse(storedWishItems) : [];
      });

      useEffect(() => {
        
        localStorage.setItem('wishItems', JSON.stringify(wishItems));
      }, [wishItems]);

      const addToWish = (item) => {
        if(!wishItems.find(e=>e.productId===item.productId)){
            return dispatch({ type: 'ADD_WISH', payload: item });
        }else{
          return null;
        }
        
      };
    
      const removeFromWish = (index) => {
        dispatch({ type: 'REMOVE_WISH', payload: index });
      };
    
      const clearWish = () => {
        dispatch({ type: 'CLEAR_WISH' });
      };

      return (
        <WishContext.Provider value={{ wishItems, addToWish, removeFromWish, clearWish }}>
          {children}
        </WishContext.Provider>
      );
}

export { WishProvider, WishContext };