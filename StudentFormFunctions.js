//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
//https://www.w3schools.com/jsref/event_onchange.asp
//https://www.w3schools.com/jsref/event_preventdefault.asp
//https://stackoverflow.com/questions/21814294/what-happens-when-submit-button-is-clicked

let output = '';
const postList = document.getElementById('table_body');

const clearData = ()=> {
    inputs.forEach(input => input.value = '');
}
const renderPosts = (posts)=>{
    var count=1;
    posts.forEach(get =>{
        output +=`   
        <tr data-id="${get.id}">
            <td class="sno">${count++}</td>
            <td >${get.name}</td>
            <td>${get.dob}</td>
            <td >${get.age}</td>
            <td >${get.studentId}</td>
            <td >${get.jd}</td>
            <td >${get.createdAt}</td>
            <td >${get.updatedAt}</td>
            <td><button class="viewbtn" id="view-post">View</button></td> 
            <td><button class="deletebtn" id="delete-post">Delete</button></td> 
        </tr>
    </tbody>
  </table>
        `;
    } );
    postList.innerHTML = output;
}
// Get Data from database
 fetch("http://localhost:8000/api/student/show")
//fetch("http://192.168.0.126:8080/api/rest" + "/get")
 .then(res => res.json())
 .then(data =>renderPosts(data))

 //delete and view data to database

 postList.addEventListener('click',(e) =>{
     e.preventDefault();
     let delPress = e.target.id == 'delete-post';
     console.log(delPress);
     let viewPress = e.target.id == 'view-post';
     //delete method
let id = e.target.parentElement.dataset.id;
if(delPress){
     fetch(`http://localhost:8000/api/student/delete"/${id}`,{
   // fetch(`http://192.168.0.126:8080/api/rest/dlt/${id}`,{
        method: 'DELETE',
    })
    .then(res => res.json())
    .then(() => location.reload())
}

if(viewPress){
    const parent=e.target.parentElement;
    let sno = parent.querySelector("sno").textContent;
    let name = parent.querySelector("name").textContent;
    let dob = parent.querySelector("dob").textContent;
    let age = parent.querySelector("age").textContent;
    let sid = parent.querySelector("sid").textContent;
    let jd = parent.querySelector("jd").textContent;
    let createdAt = parent.querySelector("createdAt").textContent;
    let updatedAt = parent.querySelector("updatedAt").textContent;
    snoValue.value=sno;
    nameValue.value=name;
    dobValue.value=dob;
    ageValue.value=age;
    sidValue.value=sid;
    jdValue.value=jd;
    createdAtValue.value=createdAt;
    updatedAtValue.value=updatedAt;
    postList.addEventListener('click',(e) =>{
    e.preventDefault()
        fetch(`${url}/save/${id}`,{
            method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    sno: snoValue.value,
                    name: nameValue.value,
                    dob: dobValue.value,
                    age: ageValue.value,
                    sid:sidValue.value,
                    jd:jdValue.value,
                    createdAt:createdAtValue.value,
                    updatedAt:updatedAtValue.value,
                })
            })
        .then(res=>res.json())
        .then(() => location.reload())
   })
}
});

// if(viewPress) {
//     let parent = e.target.parentElement;
//     const sname=parent.querySelector('.sname').textContent;
//     console.log(sname);
// }
//  })





 //Post Data to Database
 const addPostForm = document.querySelector('.add-post-form');
 let inputs = document.querySelectorAll('input');

      addPostForm.addEventListener('submit',(e) =>{       
       e.preventDefault();
   
 const nameData   = document.getElementById("exampleInputName1").value;
 const dobData  = document.getElementById("exampleInputDob").value;
 const ageData   = document.getElementById("disabledNumberInput").value;
 const joiningdatedData  = document.getElementById("exampleInputJd").value;
 const studentidData  = document.getElementById("exampleInputStudId").value;
  
 fetch("http://localhost:8000/api/student/saving",{
   // fetch("http://192.168.0.126:8080/api/rest" + "/save",{
        method: 'POST',
        headers:{
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            name : nameData,
            age : ageData,
            dob : dobData,
            jd : joiningdatedData,
            studentId : studentidData
        })
    })
    .then (res => res.json())
    .then (data =>
        {
        const dataArr = [];
        dataArr.push(data);
        renderPosts(dataArr);
        clearData();
     })

})


///------------Find Age----------///


function findAge(){
    var day = document.getElementById("exampleInputDob").value;
    var DOB = new Date(day);
    var today = new Date();
    var age = today.getTime()-DOB.getTime();
    age = Math.floor(age/(1000*60*60*24*365.24));
    document.getElementById("disabledNumberInput").value = age
}


////-----------swith ui--------------////



function createClick() {
    document.getElementById("formfield").style.display = "inline";
    document.getElementById("tablefield").style.display = "none";
}

function listClick() {
    document.getElementById("formfield").style.display = "none";
    document.getElementById("tablefield").style.display = "inline";
}


////----------All fields are filled or Not ----------////

function isEmpty(){
    let nameDataa   = document.getElementById("exampleInputName1").value;
 let dobDataa  = document.getElementById("exampleInputDob").value;
 let ageDataa   = document.getElementById("disabledNumberInput").value;
 let joiningdatedDataa  = document.getElementById("exampleInputJd").value;
 let studentidDataa  = document.getElementById("exampleInputStudId").value;

    if(nameDataa !== "" && dobDataa !== "" &&  ageDataa !== "" && joiningdatedDataa !== "" ){
        document.getElementById("btn").removeAttribute("disabled");
    }
}