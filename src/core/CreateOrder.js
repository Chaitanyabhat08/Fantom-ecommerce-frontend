import React,{useState,useEffect} from 'react'
import { isauthenticated } from '../authentication/authenticationAPIcall';
import{CreateOrderAPI} from '../admin/APIcalls'
import { Alert } from 'react-bootstrap';
import {Link} from 'react-router-dom'
import Base from './Base';
 

export default function CreateOrder() {

    const [values, setvalues] = useState({
        user_id:"",
        address:"",
        success:"",
        error:""
    });

    const [products, setproducts] = useState([])

    const [total, settotal] = useState("")

    const{user_id,address,success,error} = values;

    const{token} = isauthenticated();
    const userId =isauthenticated().user.user_id;

    const preload = () => {
        if (typeof window !== undefined) {
                setvalues({...values,user_id:userId, address:JSON.parse(localStorage.getItem("address")).address});
                setproducts(JSON.parse(localStorage.getItem("cart")));
                settotal(JSON.parse(localStorage.getItem("total_bill")))
            }
    
    }
    
    useEffect(() => {
        preload();
    }, [])

    const PlaceOrder = () => {
        if(isauthenticated==undefined){
            return
        }
       products.map((product)=>{
            delete product.stock
            delete product.quant_unit
       })
       setvalues({...values, total_bill: total})
       console.log({user_id,products,total,address})
       CreateOrderAPI(userId,token,{user_id,products,total,address})
       .then(data => {
           console.log(data)
           if(data.error){
               setvalues({...values, error:data.error})
           }
           else{
               setvalues({...values,success:true})
           }
       })
       .catch(err=>{
           console.log(err)
       })
       if(typeof window !== undefined){
        localStorage.removeItem("cart")
      }


    }

    const successMessage = () => {
        return(
            <Alert>
                <Alert.Heading>Order placed <Link to="/">Click here to shop more</Link></Alert.Heading>
            </Alert>
        )
    }
   
    

    return (
        <Base title="Check out" description="Happy Shopping">
            <div className="container h-100 d-flex justify-content-center mt-auto mb-auto border border-danger">
            <div>
                    {success ? successMessage() : ""}
                    
                    <h1>Thank you for Ordering. Click here to confirm your order</h1>
                    {success ? "":<button onClick={PlaceOrder} className="btn-lg btn-success">Confirm</button>}
            </div>
        </div>
        </Base>
    )
}
