// let baseurl="http://127.0.0.1:5000/"
let baseurl="https://chiproject.onrender.com/"



// function to toggle Form
function toggleForm(){
    const loginForm = document.querySelector('.login-form');
    const signupForm = document.querySelector('.signup-form');
    const loginstyle = window.getComputedStyle(loginForm);
    const signupstyle = window.getComputedStyle(signupForm);
    if(loginstyle.display=="none"){
        loginForm.classList.remove("nonvisible")
    }
    else{
        loginForm.classList.add("nonvisible")
    }
     
    if(signupstyle.display=="none"){
        signupForm.classList.add("visible")
    }
    else{
        signupForm.classList.remove("visible")
    }
}

let loginform=document.getElementById("loginform")
loginform.addEventListener("submit",(e)=>{
    e.preventDefault()
    let email=document.getElementById("login-email").value
    let password=document.getElementById("login-password").value
    
    fetch(`${baseurl}user/login`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({email,password})
    })
    .then((res)=>{
       if(res.ok){
        return res.json();
       } 
       else{
        throw new Error(`Request failed with status: ${res.status}`);
       }
    })
    .then((data)=>{
        console.log(data.data["role"])
        if(data.data["role"]=="jobseeker"){
          localStorage.setItem("chuserid",data.data["userid"])
          localStorage.setItem("chusername",data.data["user"])
          setTimeout(()=>{
            window.location.href="../jobseekerhome.html"
          },2000)
          
        }
        else if(data.data["role"]=="employer"){
            localStorage.setItem("chuserid",data.data["userid"])
            localStorage.setItem("chusername",data.data["user"])
          setTimeout(()=>{
            window.location.href="../employerhome.html"
          },2000)
          
           
        }
        
    })
    .catch((error)=>{
        console.log(error)
    })
})

let signupform=document.getElementById("signupform")
signupform.addEventListener("submit",(e)=>{
    e.preventDefault()
    let email=document.getElementById("signup-email").value
    let password=document.getElementById("signup-password").value
    let username=document.getElementById("signup-username").value
    let role="jobseeker"
    
    fetch(`${baseurl}user/register`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({email,password,username,role:role})
    })
    .then((res)=>{
        if(res.ok){
            window.location.href="../index.html"
        }
    })
    .then((data)=>{
        console.log(data)
    })
    .catch((error)=>{
        console.log(error)
    })
})



