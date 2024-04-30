import { useParams } from "react-router-dom";
import React ,{useContext} from 'react';
import { products } from "./data";
import './productpage.css';
import { CartContext } from "./cartContext/cartcontext";
import { WishContext } from "./cartContext/wishContext";
import { AiOutlineHeart } from "react-icons/ai";
const ProductPage = ()=>{
    const {id} = useParams();
    const {addToCart} = useContext(CartContext);
    const {addToWish} = useContext(WishContext);
    const product = products.find(product => product.id=== parseInt(id));
    //parseint cause id using params returns string

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
                <div className="product-image">
                    <img src={product.image}/>
                    
                </div>

                <div className="product-info" style={{rowGap:'25px'}}>
                    <h2>{product.name}</h2>
                    <p className="product-price">Price: $ {product.price}</p>
                    <p className="product-description">{product.description}</p>
                    <div style={{display:'flex',columnGap:'30px'}}>
                        <button className="product-buttons-button wish-button" onClick={()=>addItemToWish()}><AiOutlineHeart/></button>
                        <button className="shop-button" onClick={handleAddToCart}>Add to Cart</button>
                    </div>
                </div>

                
            </div>
        </div>
    )
}

export default ProductPage;