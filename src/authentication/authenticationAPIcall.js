const API = "http://localhost:9000/api"

export const signup = user => {
    console.log(user);
    return fetch(`${API}/signup`,{
        method:"POST",
        headers:{
            Accept: "application-json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        console.log("RESPONSE",response)
        return response.json()
    })
    .catch(err=>{
        console.log("ERROR", err);
    })
}

export const signin = user => {
    console.log(user)
    return fetch(`${API}/signin`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-type":"application/json"
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        console.log("RESPONSE",response)
        return response.json()
    })
    .catch(err=>{
        console.log("ERROR", err);
    })
}

export const authenticate = (data, next) => {
    if(typeof window!=="undefined"){
        localStorage.setItem("jwt",JSON.stringify(data))
        next();
    }
};


export const isauthenticated = () => {
    if(typeof window == "undefined"){
        return false;
    }
    if(localStorage.getItem("jwt")){
        return JSON.parse(localStorage.getItem("jwt"));
    }
    else{
        return false;
    }
};

export const signout = next =>{
    if(typeof window!=="undefined"){
        localStorage.removeItem("jwt");
        next();
        return fetch(`${API/signout}`,{
            method:"GET"
        })
        .then(response => console.log("signout success"))
        .catch(err=>console.log(err))
    }
}