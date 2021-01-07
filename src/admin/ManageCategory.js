import React,{useState,useEffect} from 'react'
import { isauthenticated } from '../authentication/authenticationAPIcall'
import AdminDashboard from './AdminDashboard'
import {AllCategories,DeleteCategory} from "./APIcalls"
import {Link} from "react-router-dom"

export default function ManageCategory() {
    const [Category, setCategory] = useState([])

    const{token}=isauthenticated();
    const user_id = isauthenticated().user.user_id;

    const preload = () => {
        AllCategories()
        .then(data => {
            if(data.error){
                console.log(data.error);
            }
            else{
                setCategory(data);
                console.log(Category)
            }
        })
    }

    useEffect(() => {
        preload();
    }, [])

    const DeleteThisCategory = CategoryId => {
        DeleteCategory(user_id,token,CategoryId)
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
        <AdminDashboard title="Manage Category">
            <h5 className="text-right text-dark my-3">Total Categories: {Object.keys({...Category}).length}</h5>
            {Category.map((category,index)=>(
            <div key={index} className="row text-center p-3 border">
              <div className="col-4">
                <h4 className="text-dark text-center">{category.category_name}</h4>
              </div>
              <div className="col-4">
                <Link
                  className="btn btn-success"
                  to={`/admin/update/category/${category.category_id}`}
                >
                  <span className="">Update</span>
                </Link>
              </div>
              <div className="col-4">
                <button onClick={() => {
                    DeleteThisCategory(category.category_id)
                }} className="btn btn-danger">
                  Delete
                </button>
              </div>
            </div>
            ))}
        </AdminDashboard>
    )
}
