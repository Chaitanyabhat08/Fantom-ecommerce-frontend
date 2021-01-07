import React,{useState,useEffect} from 'react'
import AdminDashboard from './AdminDashboard'
import Form from "react-bootstrap/Form"
import {Col,Alert} from "react-bootstrap"
import Button from "react-bootstrap/Button"
import { AllCategories, CreateProductAPI} from './APIcalls'
import { isauthenticated } from '../authentication/authenticationAPIcall';

export default function CreateProduct() {

    const [Category, setCategory] = useState([])

    const [values, setvalues] = useState({
        p_name:"",
        image:"",
        unit_price:"",
        stock:"",
        description:"",
        category_id:"",
        success:"",
        error:""
    });

    const{p_name,image,unit_price,stock,description,category_id,success,error} = values;

    const{token} = isauthenticated();
    const user_id =isauthenticated().user.user_id;

    const preload = () => {
        AllCategories()
        .then(data => {
            if(data.error){
                console.log(data.error);
            }
            else{
                setCategory(data);

            }
        })
    }

    useEffect(() => {
        preload();
    }, [])

    const handleChange = name => event => {
        setvalues({...values, error:false, [name]:event.target.value})
    }


    const onSubmit = event => {
        event.preventDefault()
        setvalues({...values,error:false})
        CreateProductAPI(user_id,token,{p_name,image,unit_price,stock,description,category_id})
        .then(data=>{
            if(data.error){
                setvalues({...values,error:data.error});
            }
            else{
                setvalues({...values,error:"",success:true,p_name:"",
                image:"",
                unit_price:"",
                stock:"",
                description:"",
                quant_unit:0,
                category_id:""});
            }
        })
    }

    const successMessage = () => {
        return(
            <Alert variant="success" style={{display:success ? "":"none"}}>
                <Alert.Heading>
                    <small>Product created successfully</small>
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


    const CreateProductForm = () => {
        return(
            <Form>
        <Form.Label>Image</Form.Label>
        <Form.Control placeholder="URL" onChange={handleChange("image")} value={image} type="text"></Form.Control>
        <Form.Row>
            <Col>
                <Form.Group>
                    <Form.Label>Product name</Form.Label>
                        <Form.Control onChange={handleChange("p_name")} value={p_name} type="text"  placeholder="Enter the name of the Product"></Form.Control>
                </Form.Group>
            </Col>
            <Col>
            <Form.Group>
                    <Form.Label>Price</Form.Label>
                        <Form.Control type="number" onChange={handleChange("unit_price")} value={unit_price} placeholder="Rs"></Form.Control>
                </Form.Group>
            </Col>
        </Form.Row>
    <Form.Group>
        <Form.Label>Description</Form.Label>
        <Form.Control placeholder="Write a description not more than 100 words..." as="textarea" onChange={handleChange("description")} value={description} rows={3}></Form.Control>
    </Form.Group>
    <Form.Row className="align-items-center">
        <Col className="my-1">
            <Form.Label>Stock</Form.Label>
            <Form.Control type="number" placeholder="1" onChange={handleChange("stock")} value={stock}></Form.Control>
        </Col>
        <Col className="my-1">
            <Form.Label>Category</Form.Label>
            <select onChange={handleChange("category_id")} className="form-control" placeholder="Category">
                <option>Select</option>
                {Category &&
                    Category.map((category, index) => (
                        <option key={index} value={category.category_id}>
                            {category.category_name}
                        </option>
                 ))}
             </select>
        </Col>
    </Form.Row>
    <Form.Row className="d-flex justify-content-end">
        <Button variant="success" className="align-self-end m-3" onClick={onSubmit}>Submit</Button>
    </Form.Row>
    
</Form>
        )

    };
    return (
        <AdminDashboard title="Create Product">
            {successMessage()}
            {errorMessage()}
           {CreateProductForm()}
        </AdminDashboard>
    )
}
