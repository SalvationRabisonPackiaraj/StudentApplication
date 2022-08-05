
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
//https://www.w3schools.com/jsref/event_onchange.asp
//https://www.w3schools.com/jsref/event_preventdefault.asp
//https://stackoverflow.com/questions/21814294/what-happens-when-submit-button-is-clicked
// const url ='http://localhost:8000/api/student/';
const url='http://192.168.0.126:8080/api/rest';
// Get Data from database
let output = '';
const postList = document.getElementById('table_body');

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
fetch(url+'/get')
 .then(res => res.json())
 .then(data =>renderPosts(data))

 //delete and view data to database

 postList.addEventListener('click',(e) =>{
     e.preventDefault();
     let delPress = e.target.id == 'delete-post';
     let viewPress = e.target.id == 'view-post';
     //delete method
let id = e.target.parentElement.dataset.id;
if(delPress){

    fetch(`${url}/dlt/${id}`,{
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


 // Post Data to Database
//  const addPostForm = document.querySelector('.add-post-form');

//  // Retrieve the data from form

// //  const nameData   = document.getElementById("name").value;
// //  const dobData  = document.getElementById("dob").value;
// //  const ageData   = document.getElementById("age").value;
// //  const joiningdatedData  = document.getElementById("joiningdate").value;
// //  const studentidData  = document.getElementById("studentid").value;
 

//  addPostForm.addEventListener('submit',(e)=>{

//     e.preventDefault();

//     const payload = new FormData(addPostForm) ;

//     fetch(url + '/saving',{
//         method: 'POST',
//         body : payload,
//     })
//     .then (res => res.json())
//     .then (data => 
//         {
//         const dataArr = [];
//         dataArr.push(data);
//         renderPosts(dataArr);
//      })

// })
