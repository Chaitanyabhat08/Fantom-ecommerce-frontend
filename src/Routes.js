import React from 'react'
import {BrowserRouter,Route} from 'react-router-dom';
import AdminDashboard from './admin/AdminDashboard';
import AdminRoute from './admin/AdminRoute';
import CreateCategory from './admin/CreateCategory';
import Signin from './authentication/Signin';
import Signup from './authentication/Signup';
import Home from "./core/Home";
import ManageCategory from "./admin/ManageCategory";
import CreateProduct from "./admin/CreateProduct";
import ManageProduct from "./admin/ManageProduct";
import ManageOrders from "./admin/ManageOrders"
import UpdateCategory from './admin/UpdateCategory'
import UpdateProduct from './admin/UpdateProduct';
import Cart from './core/Cart';
import CreateOrder from './core/CreateOrder';




export default function Routes() {
    return (
        <BrowserRouter>
            <switch>
                <Route path="/" exact component={Home}/>
                <Route path="/signin" exact component={Signin}/>
                <Route path="/signup" exact component={Signup}/>
                <Route path="/cart" exact component={Cart}/>
                <Route path="/ordergenrated" exact component={CreateOrder}/>

                <AdminRoute path="/admin/create/category" exact component={CreateCategory}/>
                <AdminRoute path="/admin/manage/category" exact component={ManageCategory}/>
                <AdminRoute path="/admin/create/product" exact component={CreateProduct}/>
                <AdminRoute path="/admin/manage/product" exact component={ManageProduct}/>
                <AdminRoute path="/admin/manage/orders" exact component={ManageOrders}/>
                <AdminRoute path="/admin/update/category/:categoryId" exact component={UpdateCategory}/>
                <AdminRoute path="/admin/update/product/:productId" exact component={UpdateProduct}/>
            </switch>   
        </BrowserRouter>
     )
}
