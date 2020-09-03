import React, { Component } from 'react'
import Menu from '../svg/bars-solid.svg'
import Close from '../svg/times-solid.svg'
import CartIcon from '../svg/shopping-cart-solid.svg'
import {Link} from 'react-router-dom'
import './Header.css'
import {DataContext} from '../Context'



export class Header extends Component {
    static contextType = DataContext;

    state = {
        toggle: false
    }

    menuToggle = () =>{
        this.setState({toggle: !this.state.toggle})
    }


    render() {
        const {toggle} = this.state;
        const {cart} = this.context;
        const cartCount = cart.length;
        return (
            <header>
                <div className="menu" onClick={this.menuToggle}>
                    <img src={Menu} alt="" width="20"/>
                </div>
                <div className="logo">
                    <h1><Link to="/">Nike</Link></h1>
                </div>
                <nav>
                    <ul className={toggle ? "toggle" : ""}>
                        <li><Link to="/"  onClick={this.menuToggle} >Home</Link></li>
                        <li><Link to="/product"  onClick={this.menuToggle} >Products</Link></li>                   
                        <li className="close" onClick={this.menuToggle}>
                            <img src={Close} alt="" width="20"/>
                        </li>
                        {/* <li>
                            <Link className="counter" to="/cart"  onClick={this.menuToggle}>
                                <b> Cart {cartCount > 0 ? cartCount : ""}  </b>
                            </Link>
                        </li> */}
                    </ul>

                    <div className="nav-cart">
                        <Link className="counter" to="/cart">
                            <img src={CartIcon} alt="" width="20" /> {cartCount > 0 ? cartCount : ""} 
                        </Link>
                    </div>
                </nav>
            </header>
        )
    }
}

export default Header
