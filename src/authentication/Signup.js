import React,{useState} from 'react'
import Base from "../core/Base"
import {Link} from "react-router-dom"
import Form from 'react-bootstrap/Form'
import Button from "react-bootstrap/Button"
import Col from 'react-bootstrap/Col'
import { signup } from './authenticationAPIcall'
import Alert from 'react-bootstrap/Alert'


export default function Signup() {

    const[values,setValues] = useState({
        user_name:"",
        email:"",
        password:"",
        mobile_no:"",
        error:"",
        success:false
    });
    
    const{user_name,email,password,mobile_no,error,success} = values;

    const handleChange = name => event => {
        setValues({...values, error:false, [name]:event.target.value})
    }

    const onSubmit = event =>{
        event.preventDefault()
        setValues({...values, error:false})
        signup({user_name,email,password,mobile_no})
        .then(data => {
            console.log("Response", data)
            if(data.error){
                setValues({...values, error:data.error, success:false})
            }
            else{
                setValues({...values, 
                    user_name: "", email: "" , password: "" ,mobile_no: "", error: "", success: true})
            }
        })
        .catch(console.log("ERROR DURING SIGNUP"))
    }

    const successMessage = () => {
        return(
            <Alert variant="success" style={{display:success ? "":"none"}}>
                <Alert.Heading>Sign up successful. Please
                    <Link to="/signin"> login Here</Link>
                </Alert.Heading>
            </Alert>
        )
    }

    const errorMessage = () => {
        return(
            <Alert variant="danger" style={{display:error ? "":"none"}}>
                <Alert.Heading>
                    {error}
                </Alert.Heading>
            </Alert>
        )
    }
    const signUpForm = () => {
        return(
            <Form className="p-5 border border-dark rounded">
            <Form.Group>
                <Form.Label>User name</Form.Label>
                <Form.Control type="text" placeholder="Enter username" value={user_name} onChange={handleChange("user_name")} />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={email} onChange={handleChange("email")} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={handleChange("password")}/>
            </Form.Group>
            <Form.Group controlId="formBasicContact">
                <Form.Label>Phone number</Form.Label>
                <Form.Control type="tel" placeholder="Contact info" value={mobile_no} onChange={handleChange("mobile_no")} />
            </Form.Group>
            <Button onClick={onSubmit} variant="success" type="submit">
                Submit
            </Button>
        </Form>
        
        )
    }

    return (
        <Base title="Sign up" description="Create an account here">
            {successMessage()}
            {errorMessage()}
            {signUpForm()}
        </Base>
    )
}
