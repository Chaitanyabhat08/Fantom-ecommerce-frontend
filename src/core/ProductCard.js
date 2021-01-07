import React,{useEffect,useState} from 'react'
import {Card,Col,Row,Button} from 'react-bootstrap'
import {AllProducts} from '../admin/APIcalls'
import { addItemToCart } from './CartFunctions'

export default function ProductCard() {

    const [Products, setProducts] = useState([])

    const preload = () => {
      AllProducts()
      .then(data=>{
        setProducts(data)
      })
      .catch(err=>{
        console.log(err)
      })
    }
    
    useEffect(() => {
      preload();
    }, [])


    const AddToCart =  product => {
      console.log(product)
      let cart = [];
      if(typeof window !==undefined){
        if(localStorage.getItem("cart")){
          cart = JSON.parse(localStorage.getItem("cart"));
          var count = 1
          let n = cart.length;
          let flag =false
          for(let i=0;i<n;i++){
            if(product.p_id == cart[i].p_id){
              cart[i].count += 1
              flag = true
              break;
            }
          }
          if(!flag){
            cart.push({
              ...product,
              count: 1
            })
          }
        }
        
      }
      localStorage.setItem("cart",JSON.stringify(cart));
    }


    return(
        <div className="row d-flex justify-content-between">
        {Products.map((product,index)=>(
        <div key={index} className="col-md-3 m-5">
          <div className="card h-100 d-flex align-content-center" style={{width:"18rem"}}>
              <div className="card-img"><img className="card-img-top img-thumbnail" src={product.image}></img></div>
              <div className="card-body">
                  <h4 className="card-title text-center">{product.p_name}</h4>
                  <p className="card-text text-center">{product.description}</p>
  
              </div>
                <button onClick={() => {
                  AddToCart(product)
                }} className="btn btn-success ml-auto mr-auto mb-3">Add to cart</button>
              
          </div>
        </div>
          ))}
        </div>
    )
}
