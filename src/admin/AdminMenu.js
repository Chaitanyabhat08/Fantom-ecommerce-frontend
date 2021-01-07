import React from 'react'
import { ListGroupItem } from 'react-bootstrap'
import {Link, withRouter} from "react-router-dom"
import ListGroup from "react-bootstrap/ListGroup"

const change = () => {
    return "red"
}

const AdminMenu = () => {
    return(
        <ListGroup>
            <Link to="/admin/create/category">
                <ListGroup.Item  variant="dark" action>
                    Create Category
                </ListGroup.Item>
            </Link>
            <Link to="/admin/manage/category" >
                <ListGroup.Item variant="dark" action>
                    Manage Category
                </ListGroup.Item>
            </Link>
            <Link to="/admin/create/product">
                <ListGroup.Item variant="dark" action>
                    Create Product
                </ListGroup.Item>
            </Link>
            <Link to="/admin/manage/product">
                <ListGroup.Item variant="dark" action>
                    Manage Product
                </ListGroup.Item>
            </Link>
            <Link to="/admin/manage/orders">
                <ListGroup.Item variant="dark" action>
                    Manage Orders
                </ListGroup.Item>
            </Link>
        </ListGroup>
    )
}

export default AdminMenu;