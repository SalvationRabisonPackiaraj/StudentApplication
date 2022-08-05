//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
//https://www.w3schools.com/jsref/event_onchange.asp
//https://www.w3schools.com/jsref/event_preventdefault.asp
//https://stackoverflow.com/questions/21814294/what-happens-when-submit-button-is-clicked
// const url ='http://localhost:8000/api/student';
const url = "192.168.0.58:8080/api/rest"

let output = '';
const postList = document.getElementById('table_body');

const clearData = ()=> {
    inputs.forEach(input => input.value = '');
}
const renderPosts = (posts)=>{
    posts.forEach(get =>{
        output +=`   
        <tr>
            <td></td>
            <td>${get.name}</td>
            <td>${get.dob}</td>
            <td>${get.age}</td>
            <td>${get.studentId}</td>
            <td>${get.jd}</td>
            <td>${get.createdAt}</td>
            <td>${get.updatedAt}</td>
            <td></td>
        </tr>
    </tbody>
  </table>
        `;
    } );
    postList.innerHTML = output;
}
// Get Data from database

fetch("http://192.168.0.126:8080/api/rest" + "/get")
 .then(res => res.json())
 .then(data =>renderPosts(data))

 //Post Data to Database
 const addPostForm = document.querySelector('.add-post-form');
 let inputs = document.querySelectorAll('input');
// console.log(addPostForm)
 // Retrieve the data from form

 
     addPostForm.addEventListener('submit',(e) =>{
       
        e.preventDefault();

        
 const nameData   = document.getElementById("exampleInputName1").value;
 const dobData  = document.getElementById("exampleInputDob").value;
 const ageData   = document.getElementById("disabledNumberInput").value;
 const joiningdatedData  = document.getElementById("exampleInputJd").value;
 const studentidData  = document.getElementById("exampleInputStudId").value;
  
 
    fetch("http://192.168.0.126:8080/api/rest" + "/save",{
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