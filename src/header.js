//import { BiSearch } from "react-icons/bi";
import { BsCart } from "react-icons/bs";
import { BsPerson } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import './header.css';
import { Link } from "react-router-dom";
import { CartContext } from "./cartContext/cartcontext";
import { useContext, useEffect , useState } from "react";
import { WishContext } from "./cartContext/wishContext";

const Header = ()=>{
    const {cartItems} = useContext(CartContext);
    const {wishItems} = useContext(WishContext);


    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [isVisible , setVisible] = useState('true');

    useEffect(() => {
        const handleScroll = () => {
          const currentScrollPos = window.pageYOffset;
    
          if (prevScrollPos < currentScrollPos) {
            setVisible('false');
          } else {
            setVisible('true');
          }
    
          setPrevScrollPos(currentScrollPos);
        };
    
        window.addEventListener('scroll', handleScroll);
    
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, [prevScrollPos]);

    const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

    return(
        <header style={isVisible==='true'?null:{top:'-100px'}}>
            <div className="header-logo">Dhoko</div>

            <div className="header-mid">
                <nav><Link to="/home">Home</Link></nav>
                <nav><Link to="/shop">Shop</Link></nav>
                <nav><a href="#footer">Contact</a></nav>
            </div>

            <div className="header-right">
                <nav className="cart-number">
                    <Link to="/wishlist"> <AiOutlineHeart/> </Link>
                    {wishItems.length===0?null:<div>{wishItems.length}</div>}
                </nav>
                <nav className="cart-number">
                    <Link to="/mycart"><BsCart /></Link>
                    {
                        totalQuantity=== 0? null :<div>{totalQuantity}</div>
                        
                    }
                </nav>
                <nav><BsPerson /></nav>
            </div>
        </header>
    )
}
export default Header;