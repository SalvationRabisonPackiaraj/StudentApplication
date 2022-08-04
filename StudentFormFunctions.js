const url ='http://localhost:8000/api/student';



// Get Data from database

let output = '';
const postList = document.querySelector('.post-list');

const renderPosts = (posts)=>{
    posts.forEach(get =>{
        output +=`
   <table class="table">
    <thead>
      <tr>
        <th scope="col">SNo</th>
        <th scope="col">Student Name</th>
        <th scope="col">DOB</th>
        <th scope="col">Age</th>
        <th scope="col">Student Id</th>
        <th scope="col">Joining Date</th>
        <th scope="col">Created At</th>
        <th scope="col">Updated At</th>
        <th scope="col">Action</th>
      </tr>
    </thead>
    <tbody>
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
fetch(url + "/show")
 .then(res => res.json())
 .then(data =>renderPosts(data))



 // Post Data to Database
 const addPostForm = document.querySelector('.add-post-form');

 // Retrieve the data from form

 const nameData   = document.getElementById("name").value;
 const dobData  = document.getElementById("dob").value;
 const ageData   = document.getElementById("age").value;
 const joiningdatedData  = document.getElementById("joiningdate").value;
 const studentidData  = document.getElementById("studentid").value;
 

 addPostForm.addEventListener('submit',(e)=>{

    e.preventDefault();

    fetch(url + '/saving',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name : nameData,
            dob  : dobData,
            age  : ageData,
            jd   : joiningdatedData,
            studentId: studentidData
        })
    })
    .then (res => res.json())
    .then (data => {
        const dataArr = [];
        dataArr.push(data);
        renderPosts(dataArr);
    })

})