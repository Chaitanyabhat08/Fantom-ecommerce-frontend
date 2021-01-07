import React,{useState} from 'react'
import Base from "../core/Base"
import Form from 'react-bootstrap/Form'
import Button from "react-bootstrap/Button"
import {authenticate,signin} from "./authenticationAPIcall"
import Alert from 'react-bootstrap/Alert'
import Spinner from 'react-bootstrap/Spinner'
import {Redirect} from 'react-router-dom'


export default function Signin() {

    const[values,setValues] = useState({
        email:"",
        password:"",
        success:false,
        loading:"",
        error:"",
        didRedirect:false
    })

    const{email,password,success,loading,error} = values;

    const handleChange = name => event => {
        setValues({...values, error:false, [name]:event.target.value})
    }

    const onSubmit = event => {
        event.preventDefault();
        setValues({...values, loading:true})
        signin({email,password})
        .then(data=>{
            console.log(data)
            if(data.error){
                setValues({...values, error:data.error ,loading:false})
                console.log(error)
            }
            else{
               authenticate(data, () => {
                    setValues({...values,didRedirect:true,success:true,loading:true})
               })
            }
        }) 
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

    const successMessage = () =>{
        if(success){
            return(
                <Redirect to="/"></Redirect>
            )
        }
    }



    const signInForm = () => {
        return(
            <Form className="p-5 border border-dark rounded">
                <Form.Group>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={handleChange("email")}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={handleChange("password")} />
                </Form.Group>
                <Button variant="success" type="submit" onClick={onSubmit}>
                    Submit
                </Button>
            </Form>
        )
    }

    return (
        
            <Base title="Sign in" description="Please Sign in here">
                {successMessage()}
                {errorMessage()}
                {signInForm()}
            </Base>

    )
}
