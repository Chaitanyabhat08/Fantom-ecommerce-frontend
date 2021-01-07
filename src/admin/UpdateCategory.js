import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom'
import Form from "react-bootstrap/Form"
import {Button,Alert,Row,Col} from "react-bootstrap"
import { isauthenticated } from '../authentication/authenticationAPIcall';
import {GetACategory,UpdateCategoryAPI} from "./APIcalls"
import Base from "../core/Base"


export default function UpdateCategory({match}) {

    const [values, setvalues] = useState({
        category_name:"",
        error:"",
        success:false
    })

    const{category_name,error,success} = values

    const{token} = isauthenticated();
    const user_id =isauthenticated().user.user_id

    const preload = categoryId => {
        GetACategory(categoryId)
        .then(data=>{
            console.log(data)
            if(data.error){
                setvalues({...values, error:true})
            }
            else{
                setvalues({...values,category_name: data.category_name})
            }
        })

    }

    useEffect(() => {
        preload(match.params.categoryId);
    }, [])

    const handleChange = name => event => {
        setvalues({...values, error:false, [name]:event.target.value})
    }

    const onSubmit = event => {
        event.preventDefault()
        console.log({category_name})
        setvalues({...values,error:false})
        UpdateCategoryAPI(user_id,token,match.params.categoryId,{category_name})
        .then(data=>{
            console.log(data)
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
                    <small>Updated successfully <Link to="/admin/manage/category">click here</Link></small>
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


    const UpdateCategoryForm = () => {
        return(
            <Form className="mt-auto mb-auto w-100">
                <Form.Group className="p-5">
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
        <Base title="Admin Panel" description="Welcom to Admin Page">
            <Row className="h-100 d-flex justify-content-center border border-danger">
                <Col className=" rounded p-auto  mh-100">
                    <h2 className="bg-danger text-white text-center">Update Category</h2>
                    {successMessage()}
                    {errorMessage()}
                    {UpdateCategoryForm()}
                </Col>
            </Row>
        </Base>
    )
}

