import React, { Component } from 'react'

export const DataContext = React.createContext();

export class DataProvider extends Component {

    state = {
        products: [
            {
                "_id": "1",
                "title": "Nike Shoes 01",
                "src": require( "../images/one.jpg" ), 
                "description": "Women's Shoe",
                "content": "Hoops in the park, Sunday BBQs and sunshine. The radiance lives on in the Nike Air Force 1 ’07, the b-ball OG that puts a fresh spin on what you know best: crisp leather, stitched overlays and the perfect amount of flash to make you shine.",
                "price": 23,
                "colors": ["red", "black", "crimson", "teal"],
                "count": 1,
                'inCart': false
            },
            {
                "_id": "2",
                "title": "Nike Shoes 02",
                "src": require( "../images/two.jfif" ), 
                "description": "Men's Shoe",
                "content": "Hoops in the park, Sunday BBQs and sunshine. The radiance lives on in the Nike Air Force 1 ’07, the b-ball OG that puts a fresh spin on what you know best: crisp leather, stitched overlays and the perfect amount of flash to make you shine.",
                "price": 19,
                "colors": ["red", "crimson", "teal"],
                "count": 1,
                'inCart': false
            },
            {
                "_id": "3",
                "title": "Nike Shoes 03",
                "src": require( "../images/three.png" ), 
                "description": "Men's Shoe",
                "content": "Hoops in the park, Sunday BBQs and sunshine. The radiance lives on in the Nike Air Force 1 ’07, the b-ball OG that puts a fresh spin on what you know best: crisp leather, stitched overlays and the perfect amount of flash to make you shine.",
                "price": 50,
                "colors": ["lightblue", "white", "crimson", "teal"],
                "count": 1,
                'inCart': false
            },
            {
                "_id": "4",
                "title": "Nike Shoes 04",
                "src": require( "../images/four.jfif" ), 
                "description": "Men's Shoe",
                "content": "Hoops in the park, Sunday BBQs and sunshine. The radiance lives on in the Nike Air Force 1 ’07, the b-ball OG that puts a fresh spin on what you know best: crisp leather, stitched overlays and the perfect amount of flash to make you shine.",
                "price": 15,
                "colors": ["orange", "black", "crimson", "teal"],
                "count": 1,
                'inCart': false
            },
            {
                "_id": "5",
                "title": "Nike Shoes 05",
                "src": require( "../images/five.jfif" ), 
                "description": "Men's Shoe",
                "content": "Hoops in the park, Sunday BBQs and sunshine. The radiance lives on in the Nike Air Force 1 ’07, the b-ball OG that puts a fresh spin on what you know best: crisp leather, stitched overlays and the perfect amount of flash to make you shine.",
                "price": 15,
                "colors": ["orange", "black", "crimson", "teal"],
                "count": 1,
                'inCart': false
            },
            {
                "_id": "6",
                "title": "Nike Shoes 06",
                "src": require( "../images/five.jfif" ), 
                "description": "Men's Shoe",
                "content": "Hoops in the park, Sunday BBQs and sunshine. The radiance lives on in the Nike Air Force 1 ’07, the b-ball OG that puts a fresh spin on what you know best: crisp leather, stitched overlays and the perfect amount of flash to make you shine.",
                "price": 17,
                "colors": ["orange", "black", "crimson", "teal"],
                "count": 1,
                'inCart': false
            }
        ],
        cart: [],
        total: 0
        
    };

    addCart = (id) =>{
        const {products, cart} = this.state;
        const check = cart.every(item =>{
            return item._id !== id
        })
        if(check){
            const data = products.filter(product =>{
                if(product._id === id){
                    product.inCart = true; 
                    return product._id === id
                }
            });
            this.setState({cart: [...cart,...data]})
        }
    };



    reduction = id =>{
        const { cart } = this.state;
        cart.forEach(item =>{
            if(item._id === id){
                item.count === 1 ? item.count = 1 : item.count -=1;
            }
        })
        this.setState({cart: cart});
        this.getTotal();
    };

    increase = id =>{
        const { cart } = this.state;
        cart.forEach(item =>{
            if(item._id === id){
                item.count += 1;
            }
        })
        this.setState({cart: cart});
        this.getTotal();
    };

    removeProduct = id =>{
        if(window.confirm("Do you want to delete this product?")){
            const { cart } = this.state;
            cart.forEach((item, index) =>{
                if(item._id === id){
                    cart.splice(index, 1)
                }
            })

            this.deleteAddProduct(id);
            this.setState({cart: cart});
            this.getTotal();
        }

       
    };

    cleanCart = () => {
        this.setState({cart: []});
        this.setState(this.state.products);
    }

    deleteAddProduct = id => {
        const { cart, products } = this.state;
        const data = products.filter(product =>{
            const inCart = product.inCart;
            if(product._id === id){
                if(!inCart)
                    product.inCart = true; 
                else 
                    product.inCart = false; 
            }
        });
        this.setState({cart: [...cart,...data]});
    }
     

    getTotal = ()=>{
        const{cart} = this.state;
        const res = cart.reduce((prev, item) => {
            return prev + (item.price * item.count);
        },0)
        this.setState({total: res})
    };
    
    componentDidUpdate(){
        localStorage.setItem('dataCart', JSON.stringify(this.state.cart))
        localStorage.setItem('product', JSON.stringify(this.state.products))
    };

    componentDidMount(){
        const dataCart = JSON.parse(localStorage.getItem('dataCart'));
        if(dataCart !== null){
            this.setState({cart: dataCart});
        }
        const pros = JSON.parse(localStorage.getItem('product'));
        if(pros !== null){
            this.setState({products: pros});
        }
    }
   

    render() {
        const {products, cart,total} = this.state;
        const {addCart,reduction,increase,removeProduct,getTotal, cleanCart} = this;
        return (
            <DataContext.Provider 
            value={{products, addCart, cart, reduction,increase,removeProduct,total,getTotal, cleanCart}}>
                {this.props.children}
            </DataContext.Provider>
        )
    }
}


