import React,{useState,useEffect} from 'react';
import Form from "react-bootstrap/Form"
import {Button,Alert,Row,Col} from "react-bootstrap"
import { isauthenticated } from '../authentication/authenticationAPIcall';
import {GetAProduct,AllCategories,UpdateProductAPI} from "./APIcalls"
import Base from "../core/Base"
import {Link} from 'react-router-dom'

export default function UpdateProduct({match}) {
    const [Category, setCategory] = useState([])

    const [values, setvalues] = useState({
        p_name:"",
        image:"",
        unit_price:"",
        stock:"",
        description:"",
        quant_unit:"",
        category_id:"",
        category_name:"",
        success:false,
        error:""
    })

    const{p_name,image,unit_price,stock,description,quant_unit,category_id,category_name,success,error} = values;

    const{token} = isauthenticated();
    const user_id =isauthenticated().user.user_id;

    const preload = productId => {
        GetAProduct(productId)
        .then(data=>{
            if(data.error){
                setvalues({...values, error:data.error})
            }
            else{
                preloadCategories();
                setvalues({...values,
                    p_name:data.p_name,
                    image:data.image,
                    unit_price:data.unit_price,
                    stock:data.stock,
                    description:data.description,
                    quant_unit:data.quant_unit,
                    category_name:data.category_name,
                    category_id:data.category_id
                })
            }
        })
    }

    const preloadCategories = () => {
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
        preload(match.params.productId);
    }, [])

    const handleChange = name => event => {
        setvalues({...values, error:false, [name]:event.target.value})
    }

    const onSubmit = event => {
        event.preventDefault()
        setvalues({...values,error:false})
        UpdateProductAPI(user_id,token,match.params.productId,{p_name,image,unit_price,stock,description,category_id})
        .then(data=>{
            if(data.error){
                setvalues({...values,error:data.error});
            }
            else{
                setvalues({...values,error:"",success:true,
                p_name:"",
                image:"",
                unit_price:"",
                stock:"",
                description:"",
                quant_unit:0,
                category_id:""});
            }
        })
    }

    const UpdateProductForm = () => {
        return(
            <Form>
         <h5 className="text-right text-dark my-3">Total Orders: {quant_unit}</h5>
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
                <option>{category_name}</option>
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

    const successMessage = () => {
        return(
            <Alert variant="success" style={{display:success ? "":"none"}}>
                <Alert.Heading>
                    <small>Updated successfully <Link to="/admin/manage/product">click here</Link></small>
                </Alert.Heading>
            </Alert>
        )
    }


    return (
        <Base title="Admin Panel" description="Welcom to Admin Page">
            <Row className="h-100 d-flex justify-content-center border border-danger">
                <Col className=" rounded p-auto  mh-100">
                    <h2 className="bg-danger text-white text-center">Update Product</h2>
                    {successMessage()}
                    {UpdateProductForm()}
                </Col>
            </Row>
        </Base>
    )
}
