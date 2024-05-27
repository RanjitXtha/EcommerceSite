//import { BiSearch } from "react-icons/bi";
import { BsCart } from "react-icons/bs";
import { BsPerson } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import '../cssFiles/header.css';
import { Link } from "react-router-dom";
import { CartItemContext } from "../cartContext/cartcontext";
import { useContext, useEffect , useState } from "react";
import { WishContext } from "../cartContext/wishContext";
import { UsersContext } from "../cartContext/userContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { PiSignOut } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

const Header = ()=>{
  const navigate = useNavigate();
  const headerButtonRef = useRef(null);

    const {cartItems} = useContext(CartItemContext);
    const {wishItems} = useContext(WishContext);
    const {currentUser} = useContext(UsersContext);
    const [isClicked , setClicked] = useState(false);

    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [isVisible , setVisible] = useState('true');

    useEffect(() => {
        const handleScroll = () => {
          const currentScrollPos = window.pageYOffset;
    
          if (prevScrollPos < currentScrollPos) {
            setVisible('false');
            setClicked(false);
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

  


    const handleRender = ()=>{
        if(currentUser){
        return(
          <div ref={headerButtonRef}>
            <div style={{display:'flex',alignItems:'center',columnGap:'1rem',marginBottom:'2rem'}}>
            <img className="small-pic" src={currentUser.photoURL}/>
            {currentUser.displayName}
            </div>
            
            <div className="profile-nav" onClick={()=>{
              signOut(auth);
              navigate("/home")
            }
              }>
              <div>SignOut<PiSignOut /></div>
            </div>
            <Link to="/insertproduct">Upload product</Link>
        </div>
        );
      }else{
        return(
          <div ref={headerButtonRef} className="profile-nav">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
        )
      }
      }

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (headerButtonRef.current  && !headerButtonRef.current.contains(event.target)) {
          setClicked(false);
 
         }
        
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [headerButtonRef]);

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
                

                  <nav className="user-profile">
                  <BsPerson onClick={()=>setClicked(!isClicked)} />
                  {
                    
                   isClicked?handleRender():null
                   }
                </nav>
                
            </div>
        </header>
    )
}
export default Header;