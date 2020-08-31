import React, { Component } from 'react'
import Products from './Products/Products'
import Details from './Details/Details'
import {Route} from "react-router-dom"
import Cart from './Cart/Cart'


export class Section extends Component {
    render() {
        return (
            <section>
                <Route path="/" component={Products} exact />
                <Route path="/product" component={Products} exact />
                <Route path="/product/:id" component={Details} />
                <Route path="/cart" component={Cart} />
            </section>
        )
    }
}

export default Section  
