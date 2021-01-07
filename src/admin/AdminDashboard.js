import Base from "../core/Base";
import React from 'react'
import{isauthenticated} from "../authentication/authenticationAPIcall"
import {Link} from 'react-router-dom';
import {Col,Tab,Row,ListGroup} from 'react-bootstrap'
import CreateCategory from "./CreateCategory";
import AdminMenu from "./AdminMenu";


export default function AdminDashboard({title="Admin Information",className, children}) {

    const AdminInfo = () => {
      return(
        <div>
          <h4 className="text=left">Name:</h4><span><h6>{isauthenticated().user.user_name}</h6></span>
        </div>

      )
    }

    return (
        <Base title="Admin Panel" description="Welcome to Admin Page">
            <Row className="h-100 d-flex justify-content-center">
                {AdminMenu()}
              <Col sm={8} className="border border-danger rounded p-auto  mh-100">
                <h2 className="bg-danger text-white text-center">{title}</h2>
                <div className={className}>{children}</div>
              </Col>
            </Row>
        </Base>
    )
}
