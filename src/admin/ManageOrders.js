import React,{useState,useEffect} from 'react'
import AdminDashboard from './AdminDashboard'
import {AllOrders,DeleteOrder, UpdateOrderAPI} from "./APIcalls"
import { isauthenticated } from '../authentication/authenticationAPIcall'
import {Link} from "react-router-dom"

    

export default function ManageOrders() {

    const [Orders, setOrders] = useState([])

    const{token}=isauthenticated();
    const user_id = isauthenticated().user.user_id;

    const preload = () => {
        AllOrders(user_id,token)
        .then(data => {
            if(data.error){
                console.log(data.error);
            }
            else{
                setOrders(data);
                console.log(data)
            }
        })
    }

    useEffect(() => {
        preload();
    }, [])

    
    const DeleteThisOrder = OrderId => {
        DeleteOrder(user_id,token,OrderId)
        .then(data => {
            if(data.error){
                console.log(data.error);
            }
            else{
                preload();
            }
        })
    }

    
    const [Status, setStatus] = useState(" ")

    const [Order_id, setOrder_id] = useState(" ")

    const UpdateThisOrder = (status, OrderId) => {
        UpdateOrderAPI(user_id,token,OrderId,{status})
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
        <AdminDashboard title="Manage Orders">
            <h5 className="text-right text-dark my-3">Total Orders: {Object.keys({...Orders}).length}</h5>
            <table class="table">
                <thead>
                    <tr>
                    <th scope="col">Order ID</th>
                    <th scope="col">Customer Name</th>
                    <th scope="col">Product</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Status</th>
                    <th scope="col">  </th>
                    </tr>
                </thead>
                <tbody>
                    {Orders.map((order,index)=>(
                        <tr key={index}>
                            <th scope="row">{order.order_id}</th>
                            <td> </td>
                            <td>{order.p_name}</td>
                            <td>{order.quantity}</td>
                            <td>
                                <select onChange = {(event)=>{
                                    setStatus(event.target.value)
                                    setOrder_id(order.order_id);
                                    UpdateThisOrder(Status,Order_id);
                                }} className="form-control" placeholder="Status">
                                    <option>{order.status}</option>
                                    <option value="Approved">Approved</option>
                                    <option value="Ready to Dispatch">Ready To Dispatch</option>
                                    <option value="Dispatched">Dispatched</option>
                                    <option value="Shipped">Shipped</option>
                                    <option value="Delivered">Delivered</option>
                                </select>
                            </td>
                            <td><button onClick={() =>{
                                 DeleteThisOrder(order.order_id)
                            }} className="btn btn-danger">
                                Cancel 
                        </button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
        </AdminDashboard>
    )
}
