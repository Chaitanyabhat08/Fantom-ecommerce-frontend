import React,{useState,useEffect} from 'react'
import AdminDashboard from './AdminDashboard'
import {AllProducts,DeleteProduct} from "./APIcalls"
import { isauthenticated } from '../authentication/authenticationAPIcall'
import {Link} from "react-router-dom"

export default function ManageProduct() {

    const [Products, setProducts] = useState([])

    const{token}=isauthenticated();
    const user_id = isauthenticated().user.user_id;

    const preload = () => {
        AllProducts()
        .then(data => {
            if(data.error){
                console.log(data.error);
            }
            else{
                setProducts(data);
            }
        })
    }

    useEffect(() => {
        preload();
    }, [])
    
    const DeleteThisCategory = ProductId => {
      console.log(ProductId)
        DeleteProduct(user_id,token,ProductId)
        .then(data => {
            if(data.error){
                console.log(data.error);
            }
            else{
                preload();
            }
        })
    }



    return (
       <AdminDashboard title="Manage Products">
           <h5 className="text-right text-dark my-3">Total Products: {Object.keys({...Products}).length}</h5>
            {Products.map((product,index)=>(
            <div key={index} className="row text-center p-3 border">
              <div className="col-4">
                <h4 className="text-dark text-center">{product.p_name}</h4>
              </div>
              <div className="col-4">
                <Link
                  className="btn btn-success"
                  to={`/admin/update/product/${product.p_id}`}
                >
                  <span className="">Update</span>
                </Link>
              </div>
              <div className="col-4">
                <button onClick={() => {
                    DeleteThisCategory(product.p_id)
                }} className="btn btn-danger">
                  Delete
                </button>
              </div>
            </div>
            ))}
       </AdminDashboard>
    )
}
