import { Link } from "react-router-dom";
import './footer.css';
 
const Footer = ()=>{
    return(
        <div className="footer" id="footer">
            <div className="header-logo footer-logo">
                DHOKO
            </div>
            <div className="menu">
                <p>Menu</p>
                <Link to="/home"><nav>Home</nav></Link>
                <Link to="/shop"><nav>Shop</nav></Link>
                <Link><nav>About</nav></Link>
                <Link><nav>Contact</nav></Link>
            </div>
            <div>
                <p>Contact</p>
                <nav>12131445</nav>
                <nav>12123-31445</nav>
                <nav>Instagram</nav>
                <nav>Facebook</nav>
                <nav>Twitter</nav>
            </div>

        </div>
    )
}

export default Footer;