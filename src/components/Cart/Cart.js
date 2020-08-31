import React, { Component } from 'react'
import {DataContext} from '../Context'
import Colors from '../Colors/Colors'
import '../Details/Details.css'
import './Cart.css'

export class Cart extends Component {
    static contextType = DataContext;

    componentDidMount(){
        this.context.getTotal();
    }
    
    render() {
        const {cart,increase,reduction,removeProduct,total, cleanCart} = this.context;
        if(cart.length === 0){
            return <h2 style={{textAlign:"center"}}> Your cart is empty</h2>
        }else{
            return (
                <> {
                    cart.map(item =>(
                        <div className="details cart" key={item._id}>
                            <img src={ item.src } alt=""/>
                            <div className="box">
                                <div className="row">
                                    <h2>{item.title}</h2>
                                    <span>${item.price * item.count}</span>
                                </div>
                                <Colors colors={item.colors}/>
                                <p>{item.description}</p>
                                <span> Unit price {item.price} </span>
                                <p>{item.content}</p>
                                <div className="amount">
                                    <button className="count" onClick={() => reduction(item._id)}> - </button>
                                    <span>{item.count}</span>
                                    <button className="count" onClick={() => increase(item._id)}> + </button>
                                </div>
                            </div>
                            <div className="delete" onClick={() => removeProduct(item._id)}>X</div>
                        </div>
                    ))
                }
                    <div className="total">
                        {/* <button className="clear" onClick={() => cleanCart()}> Clean cart </button> */}
                        <h3 >Total: ${total}</h3>
                    </div>
                </>
                )
            }
        }
}

export default Cart
