import React,{useState} from 'react';
import AdminDashboard from './AdminDashboard';
import Form from "react-bootstrap/Form"
import {Button,Alert} from "react-bootstrap"
import { isauthenticated } from '../authentication/authenticationAPIcall';
import {CreateCategoryAPI} from "./APIcalls"




export default function CreateCategory() {

    const [values, setvalues] = useState({
        category_name:"",
        error:"",
        success:false
    })

    const{category_name,error,success} = values

    const{token} = isauthenticated();
    const user_id =isauthenticated().user.user_id

    const handleChange = name => event => {
        setvalues({...values, error:false, [name]:event.target.value})
    }

    const onSubmit = event => {
        event.preventDefault()
        setvalues({...values,error:false})
        CreateCategoryAPI(user_id,token,{category_name})
        .then(data=>{
            if(data.error){
                setvalues({...values,error:data.error});
            }
            else{
                setvalues({...values,error:"",success:true,category_name:""});
            }
        })
    }

    const successMessage = () => {
        return(
            <Alert variant="success" style={{display:success ? "":"none"}}>
                <Alert.Heading>
                    <small>Category created successfully</small>
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


    const CreateCategoryForm = () => {
        return(
            <Form>
                <Form.Group>
                    <Form.Label>Enter a category</Form.Label>
                    <Form.Control value={category_name} onChange={handleChange("category_name")} type="text" placeholder="Ex: Harry Potter" />
                </Form.Group>
                <Form.Row className="d-flex justify-content-end">
                    <Button onClick={onSubmit} variant="success" className="align-self-end m-3">Submit</Button>
                </Form.Row>
            </Form>
        )
    }




    return (
        
        <AdminDashboard title="Create Category">
            {successMessage()}
            {errorMessage()}
            {CreateCategoryForm()}
        </AdminDashboard>
    )
}
