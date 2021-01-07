const API="http://localhost:9000/api"


//CATEGORY API CALLS

//CREATE CATEGORY
export const CreateCategoryAPI = (userId,token,category_name) => {
    return fetch(`${API}/category/create/${userId}`,{
        method:"POST",
        headers:{
            Accept:"application-json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
        body: JSON.stringify(category_name)
    })
    .then(response => {
        return response.json();
    })
    .catch(err=>{
        console.log(err);
    })
};

//ALL CATEGORIES
export const AllCategories = () => {
    return fetch(`${API}/category`,{
        method: "GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(err=>{
        console.log(err)
    })
}

//CATEGORY BY ID
export const GetACategory = CategoryId => {
    return fetch(`${API}/category/${CategoryId}`,{
        method:"GET"
    })
    .then(response => {
        return response.json();
    })
    .catch(err=>{
        console.log(err)
    })
}

//UPDATE CATEGORY
export const UpdateCategoryAPI = (userId,token,CategoryId,category_name) => {
    return fetch(`${API}/category/${CategoryId}/${userId}`,{
        method:"PUT",
        headers:{
            Accept:"application-json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
        body: JSON.stringify(category_name)
    })
    .then(response => {
        return response.json();
    })
    .catch(err=>{
        console.log(err);
    })
}

//DELETE CATEGORY
export const DeleteCategory = (userId,token,CategoryId) => {
    return fetch(`${API}/category/${CategoryId}/${userId}`,{
        method:"DELETE",
        headers:{
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        return response.json()
    })
    .catch(err=>{
        console.log(err)
    })
}

//PRODUCT API CALLS

//CREATE
export const CreateProductAPI = (userId,token,product) => {
    return fetch(`${API}/product/create/${userId}`,{
        method:"POST",
        headers:{
            Accept:"application-json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
        body: JSON.stringify(product)
    })
    .then(response => {
        return response.json();
    })
    .catch(err=>{
        console.log(err);
    })
};

//ALL PRODUCTS
export const AllProducts = () => {
    return fetch(`${API}/product`,{
        method: "GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(err=>{
        console.log(err)
    })
}

//GET PRODUCT BY ID
export const GetAProduct = ProductId => {
    return fetch(`${API}/product/${ProductId}`,{
        method:"GET"
    })
    .then(response => {
        return response.json();
    })
    .catch(err=>{
        console.log(err)
    })
}

//UPDATE PRODUCT
export const UpdateProductAPI = (userId,token,ProductId,product) => {
    return fetch(`${API}/product/${ProductId}/${userId}`,{
        method:"PUT",
        headers:{
            Accept:"application-json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
        body: JSON.stringify(product)
    })
    .then(response => {
        return response.json();
    })
    .catch(err=>{
        console.log(err);
    })
}

//DELETE PRODUCT
export const DeleteProduct = (userId,token,ProductId) => {
    return fetch(`${API}/product/${ProductId}/${userId}`,{
        method:"DELETE",
        headers:{
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        return response.json()
    })
    .catch(err=>{
        console.log(err)
    })
}

//Order

//CREATE

//READ
export const AllOrders = (userId,token) => {
    return fetch(`${API}/order/allorders/${userId}`,{
        method:"GET",
        headers:{
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        console.log(response)
        return response.json()
    })
    .catch(err=>{
        console.log(err)
    })
}

//UPDATE
export const UpdateOrderAPI = (userId,token,OrderId,status) => {
    return fetch(`${API}/order/${OrderId}/${userId}`,{
        method:"PUT",
        headers:{
            Accept:"application-json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
        body: JSON.stringify(status)
    })
    .then(response => {
        return response.json();
    })
    .catch(err=>{
        console.log(err);
    })
}


//DELETE
export const DeleteOrder = (userId,token,OrderId) => {
    return fetch(`${API}/order/${OrderId}/${userId}`,{
        method:"DELETE",
        headers:{
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        return response.json()
    })
    .catch(err=>{
        console.log(err)
    })
}