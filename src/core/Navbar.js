import React,{Fragment} from 'react'
import {Link, withRouter} from "react-router-dom"
import logo from '../Fantom.png';
import {signout,isauthenticated} from '../authentication/authenticationAPIcall'

const currentTab = (history,path) => {
    if(history.location.pathname ===path){
        return {color:"#000000"}
    }
    else{
        return {color:"#FFFFFF"}
    }
}

const Navbar = ({history}) => {
    return (
        <div className="bg-danger mw-100">
            <ul className="nav nav-tabs">
                <li className="nav-brand">
                   <Link className="nav-link" to="/"> <img src={logo} height="70" width="300"></img></Link>
                </li>
                <li className="nav-item ml-auto">
                    <Link style={currentTab(history,"/")} className="nav-link" to="/">Home</Link>
                </li>
                {isauthenticated() && isauthenticated().user.role==1 && (
                    <li className="nav-item">
                        <Link style={currentTab(history,"/admin/create/category")} className="nav-link" to="/admin/create/category">Dashboard</Link>
                    </li>
                )}
                {!isauthenticated() && <Fragment>
                    <li className="nav-item">
                    <Link style={currentTab(history,"/signin")} className="nav-link " to="/signin">Sign in</Link>
                </li>
                <li className="nav-item">
                    <Link style={currentTab(history,"/signup")} className="nav-link " to="/signup">Sign up</Link>
                </li>
                </Fragment>}
                {isauthenticated() && (<li className="nav-item">
                    <span style={currentTab(history,"signout")} className="nav-link " onClick={() => {
                        signout(() => {
                        history.push("/")
                        })
                    }}>Sign out</span>
                </li>)}
                <li className="nav-item">
                    <Link style={currentTab(history,"/cart")} className="nav-link " to="/cart">Cart</Link>
                </li>
            </ul>
        </div>
    )
}

export default withRouter(Navbar);
