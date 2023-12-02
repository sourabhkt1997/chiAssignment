// let baseurl="http://127.0.0.1:5000/"
let baseurl="https://chiproject.onrender.com/"

let signupform=document.getElementById("signupform")
signupform.addEventListener("submit",(e)=>{
    e.preventDefault()
    let email=document.getElementById("signup-email").value
    let password=document.getElementById("signup-password").value
    let username=document.getElementById("signup-username").value
    let role="employer"
    
    fetch(`${baseurl}user/register`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({email,password,username,role:role})
    })
    .then((res)=>res.json())
    .then((data)=>{
        console.log(data)
    })
    .catch((error)=>{
        console.log(error)
    })
})