
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
//https://www.w3schools.com/jsref/event_onchange.asp
//https://www.w3schools.com/jsref/event_preventdefault.asp
//https://stackoverflow.com/questions/21814294/what-happens-when-submit-button-is-clicked
const url ='http://localhost:8000/api/student';

// Get Data from database
let output = '';
const postList = document.getElementById('table_body');

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
fetch(url + "/show")
 .then(res => res.json())
 .then(data =>renderPosts(data))


 // Post Data to Database
 const addPostForm = document.querySelector('.add-post-form');

 // Retrieve the data from form

//  const nameData   = document.getElementById("name").value;
//  const dobData  = document.getElementById("dob").value;
//  const ageData   = document.getElementById("age").value;
//  const joiningdatedData  = document.getElementById("joiningdate").value;
//  const studentidData  = document.getElementById("studentid").value;
 

 addPostForm.addEventListener('submit',(e)=>{

    e.preventDefault();

    const payload = new FormData(addPostForm) ;

    fetch(url + '/saving',{
        method: 'POST',
        body : payload,
    })
    .then (res => res.json())
    .then (data => 
        {
        const dataArr = [];
        dataArr.push(data);
        renderPosts(dataArr);
     })

})
