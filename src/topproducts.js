import './topproducts.css'
import { AiOutlineHeart } from "react-icons/ai";
import { BsCart } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { products } from './data';
import { WishContext } from './cartContext/wishContext';
import { CartContext } from './cartContext/cartcontext';
import { useContext, useRef ,useState} from 'react';
import { AiOutlineRight } from "react-icons/ai";
import { AiOutlineLeft } from "react-icons/ai";
import insta1 from './images/insta1.jpg';
import insta2 from './images/insta2.jpg';
import insta3 from './images/insta3.jpg';
import insta4 from './images/insta4.jpg';
import insta5 from './images/insta5.jpg';
import insta6 from './images/insta6.jpg';


const TopProducts = ()=>{
    const topProducts = products.slice(0,4);
    const {addToWish} = useContext(WishContext);
    const {addToCart} = useContext(CartContext);

    const addItemToWish = (item)=>{
        addToWish(item);
    }

    const addItemToCart = (item)=>{
        addToCart(item,1);
    }
       
    return(
        <div style={{margin:'10rem'}}>
            <p className='titles'>Explore Top Products</p>
            <div className="topproducts">
                {
                    topProducts.map((item,index)=>(
                        
                        <div className="top-product" key={item.id}>
                            <div className="top-product-image">
                                <Link to={`/product/${item.id}`}>
                                    <img src={item.image} alt={index} loading="lazy"/>
                                </Link></div>
                             <div className="product-info">
                                <p>{item.name}</p>
                                <p className="product-price">$ {item.price}</p>

                                <div style={{display:'flex',columnGap:'20px'}}>
                                    <button className="product-buttons-button" onClick={()=>addItemToWish(item)}><AiOutlineHeart/></button>
                                    <button className="product-buttons-button" onClick={()=>addItemToCart(item)}><BsCart/></button>
                                </div>
                            </div>
                        </div>
        
                    ))
                }

            </div>
        </div>
    )
}




const NewArrival = ()=>{
    const [scrollPosition, setScrollPosition] = useState(0);

    const handleScroll = (direction) => {
    const productSelect = document.querySelector('.new-product') ;
    const container = document.querySelector('.new-arrival');
    const scrollAmount =  productSelect.offsetWidth + 20; //20=colum-gap;
  
      if (direction === 'left') {
        container.scrollLeft -= scrollAmount;
      } else if (direction === 'right') {
        container.scrollLeft += scrollAmount;
      }
      setScrollPosition(container.scrollLeft);
    };

    return(
        <div className='new-arrival-container' >
            <p className='titles'>New Arrivals</p>
            <div className='new-arrival'>
                {
                    products.slice(0,7).map((item,index)=>(
                        <Link to={`/product/${item.id}`}>
                            <div className="product new-product" key={item.id}>
                            <div className="product-img"><img src={item.image} alt={index} /></div>
                            <div className='product-info'>
                                <p>{item.name}</p>
                                <p className="product-price">$ {item.price}</p>
                            </div>
                            </div>
                        </Link>
                    ))
                }
            </div>
            <button className="scroll-button" onClick={() => handleScroll('left')}><AiOutlineLeft/> </button>
            <button className="scroll-button" onClick={() => handleScroll('right')} style={{right:'50px'}}><AiOutlineRight/></button>
        </div>
    )
}


const Gallery = ()=>{
    const Images = [
        insta1, insta2,insta3, insta4,insta5,  insta6
    ]

    return(
        <div>
            <p className='titles'>Instagram Gallery</p>
            <div className='Gallery' id="Gallery">
            
            <div className='instagram-gallery'>
                {
                    Images.map((image,index)=>(
                        <div className='insta-images'>
                            <img src={image} alt={index} loading="lazy"/>
                        </div>
                    ))
                }
            </div>
            <div className='instagram-gallery'>
                {
                    Images.map((image,index)=>(
                        <div className='insta-images'>
                            <img src={image} alt={index} loading="lazy" />
                        </div>
                    ))
                }
            </div>
        </div>

        </div>
        
    )
}

export  {TopProducts , NewArrival ,Gallery};