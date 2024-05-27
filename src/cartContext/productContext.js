import {React, createContext } from "react";
import { db } from "../firebase";
import { collection, getDoc,setDoc , getDocs } from "firebase/firestore";
import { useEffect , useReducer ,useState } from 'react';

export const ProductContext = createContext();

export const ProductContextProvider=({children})=>{

    const [products , setProducts] = useState([]);

    useEffect(()=>{
     const getProduct =async()=>{
         try {
             const querySnapshot = await getDocs(collection(db, 'products'));
             const productsList = querySnapshot.docs.map(doc => (doc.data()));
             setProducts(productsList);
           } catch (error) {
             console.error('Error fetching products: ', error);
           }
     }
     getProduct();
    },[])

    return(
        <ProductContext.Provider value={{products}}>
            {children}
        </ProductContext.Provider>
    )
}