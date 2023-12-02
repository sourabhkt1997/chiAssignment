// let baseurl="http://127.0.0.1:5000/"
let baseurl="https://chiproject.onrender.com/"
let userid=localStorage.getItem("chuserid")
let username=localStorage.getItem("chusername")
document.getElementById("username").innerText=username
let logout=document.getElementById("logout")
logout.addEventListener("click",()=>{
    localStorage.removeItem("chuserid")
    localStorage.removeItem("chusername")
    setTimeout(()=>{
        window.location.href="../index.html"
    })
})

let jobform=document.getElementById("jobform")
jobform.addEventListener("submit",(e)=>{
    e.preventDefault()
    let title=document.getElementById("title").value
    let about=document.getElementById('about').value
    let status=document.getElementById("status").value
    let end_date=document.getElementById("date").value
    let skills=document.getElementById("skills").value
    let skillsarry=skills.split(",")
    console.log(title,about,skillsarry,end_date,status)
     
    fetch(`${baseurl}job/createjob/${userid}`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({title,about,end_date,status,skills:skillsarry})
    })
    .then((res)=>{
        if(res.ok){
            window.location.reload()
            return res.json()
        }
        else{
            throw new Error(`response failed`);
        }
    })
    .then((data)=>{
        
        console.log(data)
    })
    .catch((error)=>{
        console.log(error)
    })
    
})


fetch(`${baseurl}job/createdjobs/${userid}`)
.then((res)=>res.json())
.then((data)=>{
    console.log(data.data)
    renderjob(data.data)
})
.catch((error)=>{
    console.log(error)
})



function renderjob(data){
    let jobcard=data.map((ele)=>{
        
        return`
        <div class="jobcard">
        <p class="title">${ele.title}</p>
        <p class="about">${ele.about}</p>
        <p class="skills">${ele.skills.join(",")}</p>
        <p class="start_date">${ele.start_date}</p>
        <p class="end_date">${ele.end_date}</p>
        <p class="status">${ele.status}</p>
        <button onclick="viewApplication('${ele.id}')">View Application</button>
        <button onclick="editJob('${ele.id}','${ele.title}','${ele.about}','${ele.status}','${ele.end_date}','${ele.skills}')">edit</button>
        <button onclick="deleteJob('${ele.id}')">delete</button>
      </div>
        `
    })
  
    document.getElementById("jobdiv").innerHTML=jobcard.join("")
}

function deleteJob(id){
    fetch(`${baseurl}job/deletejob/${id}`,{
        method:"DELETE"
    })
    .then((res)=>{
        if(res.ok){
            window.location.reload()
            return res.json()    
        }
    })
    .then((data)=>{
        console.log(data)
        
    })
}

let closeedit=document.getElementById("closeedit")
closeedit.addEventListener("click",()=>{
    let editdiv=document.querySelector(".editdiv")
    editdiv.classList.remove("editdivvisible")

})

function editJob(id,title,about,status,end_date,skills){

    let editdiv=document.querySelector(".editdiv")
    editdiv.classList.add("editdivvisible")
    let edittitle=document.getElementById("edittitle")
    let editabout=document.getElementById('editabout')
    let editstatus=document.getElementById("editstatus")
    let editend_date=document.getElementById("editdate")
    let editskills=document.getElementById("editskills")
    
    
    edittitle.value=title
    editabout.value=about
    editstatus.value=status
    editend_date.value=end_date
    editskills.value=skills
    
    let editform=document.getElementById("editjobform")
    editform.addEventListener('submit',(e)=>{
       e.preventDefault()
       let title=edittitle.value
       let about=editabout.value
       let status=editstatus.value
       let end_date= editend_date.value
       let skills=editskills.value.split(",")
      
       fetch(`${baseurl}job/editjob/${id}`,{
        method:"PATCH",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({title,about,status,end_date,skills})
       })
       .then((res)=>{
        if(res.ok){
          window.location.reload()
         return res.json()
        }
       })
       .then((data)=>{
        console.log(data)
       })
    })
}

document.getElementById("closediv").addEventListener("click",()=>{
    document.querySelector(".applicationdiv").classList.remove("applicationdiv_visible")
})

function viewApplication(id){ 
  document.querySelector(".applicationdiv").classList.add("applicationdiv_visible")

fetch(`${baseurl}job/createdjobs/${userid}`)
.then((res)=>res.json())
.then((data)=>{
    let filtereddata=data.data.filter((ele)=>ele.id==id)
    renderviewapplication(filtereddata)

})
.catch((error)=>{
    console.log(error)
})

}

function renderviewapplication(data){
console.log(data[0].applicant)
let listapplication=data[0].applicant.map((ele)=>{
    console.log(ele,"kk")
    return`
    <div class="cardele">
    <p class="username">${ele.username}</p>
    <p class="bio">${ele.bio}</p>
    <p class="skill">${ele.skills.join(",")}</p>
    <p class="email">${ele.email}</p>
    </div>
    `
  })

  document.getElementById("card").innerHTML=listapplication.join("")
}