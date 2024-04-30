import './Home.css';
import summer1 from './images/summerpic1.jpg';
import summer2 from './images/summerpic2.png';
import summer3 from './images/summer3.png';
import summer4 from './images/summer4.png';
import { RiCustomerService2Fill } from "react-icons/ri";
import { TbTruckDelivery } from "react-icons/tb";
import { RiSecurePaymentFill } from "react-icons/ri";
import men from './images/men.png';
import women from './images/women.jpg';
import accessories from './images/accesories.jpg';
import deals from './images/deals.jpg';
import {TopProducts , NewArrival ,Gallery} from './topproducts';
import { Link } from 'react-router-dom';

const Home = ()=>{

    return(
        <div>
            <div className="top-section">
                <div>
                    <picture>
                        <source media="(max-width: 650px)" srcSet={summer4}/>
                        <source media="(max-width: 1350px)" srcSet={summer3}/>
                        <img  src={summer2}/>
                    </picture>
                </div>
                
                <div className='top-info'>
                    <div>Get up to 30% off</div>
                    <p>SUMMER</p>
                    <p>LOOK 2024</p>
                    <Link to="/shop"><button className='shop-button'>Shop Now</button></Link>
                </div>
            </div>

            <div className="services">
                <div>
                    <span><RiCustomerService2Fill/></span>
                    <div>
                        <p>Support 24/7</p>
                        <p>Contact us 12345</p>
                    </div>
                </div>

              

                <div>
                    <span><RiSecurePaymentFill/></span>
                    <div>
                        <p>Secure payment</p>
                        <p>services</p>
                    </div>
                </div>


                <div>
                    <span><TbTruckDelivery/></span>
                    <div>
                        <p>Free and Fast</p>
                        <p>Shipping</p>
                    </div>
                </div>
            </div>

            <div className="categories">
                <Link to="/shop/MEN">
                    <div className="categories-types">
                    <img src={men} alt="men" loading="lazy"/>
                    <div className="categories-names">
                            <p>MEN</p>
                        </div>
                    </div>
                </Link>

                <Link to="/shop/WOMEN">
                    <div className="categories-types">
                        <img src={women} alt="women" loading="lazy"/>
                        <div className="categories-names">
                            <p>WOMEN</p>
                        </div>
                        
                    </div>
                </Link>

                <Link to="/shop/ACCESSORIES">
                    <div className="categories-types">
                        <img src={accessories} alt="accesories" loading="lazy"/>
                        <div className="categories-names">
                            <p>ACCESSORIES</p>
                        </div>
                    </div>
                </Link>
            </div>

            <TopProducts />
            
            <div className='deals'>
                <img src={deals} alt="deals"/>
                <div>
                    <p>Check out our deals</p>
                    <Link to="/shop"><button className='shop-button'>View Collection</button></Link>
                </div>
            </div>

            <NewArrival />
            <Gallery />

            
        </div>
    )
}

export default Home;