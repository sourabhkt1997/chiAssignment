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

// toggle button
let isToggled = false;

function toggleButton() {
    isToggled = !isToggled;
    if(isToggled){
        fetch(`${baseurl}job/recomentation/${userid}`)
        .then((res)=>{
           return res.json()
        })
        .then((data)=>{
            console.log(data)
            document.getElementById("recmsg").innerText=data.message
            jobrecomentaion(data.data)

        })
    }
    updateSliderPosition();
}


function updateSliderPosition() {
    const slider = document.querySelector('.toggle-slider');
    const containerWidth = document.querySelector('.toggle-container').offsetWidth;

    if (isToggled) {
        slider.style.transform = `translateX(${containerWidth - 30}px)`; // 30 is the width of the slider
    } else {
        slider.style.transform = 'translateX(0)';
    }
}




document.getElementById("bioform").addEventListener("submit",(e)=>{
    e.preventDefault()

    let bio=document.getElementById("bio").value
    let skills=document.getElementById("skill").value.split(",")
    let experience=document.getElementById("experience").value

    console.log(skills,bio,experience)

    fetch(`${baseurl}user/updateprofile/${userid}`,{
        method:"PATCH",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({bio,skills,experience})
    })
    .then((res)=>{
        if(res.ok){
            window.location.reload
            return res.json()
        }
    })
    .then((data)=>{
        console.log(data)
    })
})



// render job recomentation


function jobrecomentaion(data){
  
    let recomentaion=data.map((ele)=>{
        let x="appyjob"
        ele.applicant.forEach((item) => {
            if(item.id==userid){
               x="applied"
            }
        });
        return`
        <div class="jobcard">
          <p class="title">${ele.title}</p>
          <p class="employer">${ele.employer.username}</p>
          <p class="about">${ele.about}</p>
          <p class="skills">${ele.skills.join(",")}</p>
          <p class="status">${ele.status}</p>
          <p class="start_date">${ele.start_date}</p>
          <p class="end_date">${ele.end_date}</p>
          <button class="applybutton" onclick="applyjob('${ele.id}')">${x}</button>
          <p class="msg"></p>
        </div>
        `
    })

    document.getElementById("recomentation").innerHTML=recomentaion.join("")
}

function applyjob(id){
    
    fetch(`${baseurl}job/apply/${id}`,{
        method:"PATCH",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({"user_id":userid})
    })
    .then((res)=>{
        if(res.ok){
            document.querySelector(".applybutton").innerText="applied"
            return res.json()
        }
        else{
            document.querySelector(".msg").innerText='applyed successfully'
        }
    })
    .then((data)=>{
        console.log(data)
    })
}

