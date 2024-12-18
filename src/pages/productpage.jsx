import { useParams } from "react-router-dom";
import React ,{useContext, useEffect, useState} from 'react';
import '../cssFiles/productpage.css';
import { CartItemContext } from "../cartContext/cartcontext";
import { WishContext } from "../cartContext/wishContext";
import { AiOutlineHeart } from "react-icons/ai";
import { query , collection , where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

const ProductPage = ()=>{
    const {id} = useParams();
    const navigate=useNavigate();
    const {addToCart} = useContext(CartItemContext);
    const {addToWish} = useContext(WishContext);
    const [product , setProduct] = useState({});
    const [currentIndex , setIndex] = useState(0);
    useEffect(()=>{
        const getProduct = async()=>{
            const q =  query(collection(db,"products"),where("productId","==",id));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
            setProduct(doc.data());
            });  
        }
        getProduct();
    })

    if (!product) {
        return <div>Product not found</div>;
      }

      const addItemToWish = ()=>{
        addToWish(product);
    }

      const handleAddToCart = () => {
        addToCart(product,1);
      };
    
    return(
        <div>
            <div className="productpage">
               <button onClick={()=>navigate(`/editproduct/${id}`)} className="shop-button">Edit</button>
                <div className="product-image ">
                {
                    product.photoURLs && <img  style={{objectFit:"contain"}} src={product.photoURLs[currentIndex]} alt={product.name} /> 
                }
                </div>

                <div className="product-info" style={{rowGap:'25px'}}>
                    <h2>{product.name}</h2>
                    <p className="product-price">Price: $ {product.price}</p>
                    <p className="product-description">{product.description}</p>
                    <div style={{display:'flex',columnGap:'30px'}}>
                        <button className="product-buttons-button wish-button" onClick={()=>addItemToWish()}><AiOutlineHeart/></button>
                        <button className="shop-button" onClick={handleAddToCart}>Add to Cart</button>
                    </div>


                    {
                        product.photoURLs && product.photoURLs.map((pic,index)=>(
                            <img src={pic} key={index} alt={index} className="small-pic" 
                            onClick={()=>setIndex(index)} 
                            />
                        ))
                    }
                   
                </div>

                
            </div>
        </div>
    )
}

export default ProductPage;