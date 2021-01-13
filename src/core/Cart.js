import React,{useState,useEffect} from 'react'
import {Form,Button,Alert} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { isauthenticated } from '../authentication/authenticationAPIcall'
import Base from "./Base"
import CreateOrder from "./CreateOrder"

export default function Cart() {

    const [CartProducts, setCartProducts] = useState([])

    const [Address, setAddress] = useState({
      address:"",
      success:""
    })

    const{address,success} = Address


    const ProductsInCart=()=>{
        if(typeof window!== undefined){
            if (localStorage.getItem("cart")) {
                return JSON.parse(localStorage.getItem("cart"));
              }
            }
    }

    useEffect(() => {
        let cart = ProductsInCart();
        setCartProducts(cart)
    }, [])
    
    const removeItemFromCart = (productId) => {
        let cart = []
        if (typeof window !== undefined) {
            if (localStorage.getItem("cart")) {
              cart = JSON.parse(localStorage.getItem("cart"));
            }
            cart.map((product,index) => {
            if(product.p_id === productId){
                cart.splice(index,1)
            }
        });
        localStorage.setItem("cart",JSON.stringify(cart));
        }
        let cartprod = ProductsInCart();
        setCartProducts(cartprod)
    }

    const Price = () => {
        let cart = ProductsInCart();
        if(cart == undefined){
          return 0
        }
        let n = cart.length;
        let amt=0
        for(let i=0;i<n;i++){
            amt = amt + (cart[i].unit_price * cart[i].count)
        }
        if(typeof window !== undefined){
          localStorage.setItem("total_bill",amt)
        }
        return amt
    }

    const SignInMessage = () => {
        return(
            <Alert variant="warning">
                <small><Alert.Heading>Please <Link to="/signin"> sign in </Link> to place the order. Don't have an account?<Link to="/signup">sign up here</Link></Alert.Heading></small>
            </Alert>
        )
    }

    const handleChange = name => event => {
      setAddress({...Address, [name]:event.target.value})
      if(typeof window!==undefined){
        localStorage.setItem("address",JSON.stringify({address}))
      }
  }


    const errorMessage = () =>{
      return(
        <Alert variant="danger">
            <small><Alert.Heading>Please enter the Address</Alert.Heading></small>
        </Alert>
    )
    }

    const successMessage = () => {
      if(success){
        return(
          <Alert variant="success">
              <small><Alert.Heading>Order generated</Alert.Heading></small>
          </Alert>
        )
      }
    }


    return (
       <Base title="Cart" description="Happy Shopping">
          {!isauthenticated() && SignInMessage()}
           <div className="row d-flex justify-content-around">
               <div className="col-xs-12 col-md-6">
                    {!CartProducts && (
                      <h2>No products in the Cart :(</h2>
                    )}
                   {CartProducts && CartProducts.map((product,index)=>{
                       return(
                              <div key={index}>
                              <div className="row mb-4">
                                  <div className="col-md-5 col-lg-3 col-xl-3">
                                    <div className="rounded mb-3 mb-md-0">
                                      <img className="img-fluid w-100" src={product.image} alt="Sample"></img>
                                    </div>
                                  </div>
                                  <div className="col-md-7 col-lg-9 col-xl-9">
                                    <div>
                                      <div className="d-flex justify-content-between">
                                        <div>
                                          <h5>{product.p_name}</h5>
                                          <p className="mb-3 text-muted text-uppercase small">{product.p_name}</p>
                                          <p className="mb-2 text-muted text-uppercase small">Description: {product.description}</p>
                                        </div>
                                        <div>
                                          <div className="mb-0 w-100">
                                            <input className="quantity" min="1" name="quantity" value={product.count} type="number"></input>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                          <button type="btn btn-light" onClick={()=>{
                                              removeItemFromCart(product.p_id)
                                          }}><i className="fa fa-trash mr-1"></i> Remove item </button>
                                        </div>
                                        <p className="mb-0"><span><strong id="summary">₨ {product.unit_price}</strong></span></p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                          </div>
                       )
                   })}
                   
               </div>
               <div className="col-md-4 h-25 jumbotron">
                        {errorMessage()}
                        {successMessage()}
                        <h2>Total Amount: ₨{CartProducts && Price()}</h2>
                       <Form>
                        <Form.Group >
                                <Form.Label>Enter Address</Form.Label>
                                <Form.Control onChange={handleChange("address")} value={address} as="textarea" rows={3} />
                        </Form.Group>
                         {isauthenticated() && (
                           <Link to="/ordergenrated"><Button variant="success" type="submit">Check out</Button></Link>
                         )}
                        </Form>
                       
                </div>
           </div>

       </Base>
    )
}
