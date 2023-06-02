$(document).ready(function() {


    const pathname = window.location.pathname.split('/')
    const id = Number(pathname[pathname.length - 1])
//____________________________________________get users in users form
$.ajax({
    type:'GET',
    url:'/api/getusers'
}).done(function (data){
    console.log(data);
    if (data.sts) {
       event.preventDefault()
       tabledata=' ';
       for (let i = 0; i < data.data.rows.length; i++) {
        if (data.data.rows[i].user_status == 'active') {
            badge = "badge-success"
        } else {
            badge = "badge-danger"
        }
        tabledata +=`<tr>
        <td>
            ${i+1}
        </td>
        <td>
            <a>
                ${data.data.rows[i].name}
            </a>
            <br />
            <small>
                ${data.data.rows[i].createdAt}
            </small>
        </td>
        <td>
           ${data.data.rows[i].email}
        </td>
        <td>
        ${data.data.rows[i].gender}
        </td>
        <td>
        ${data.data.rows[i].mobileno}
        </td>
       
        <td>
            <a onclick="return confirm('change status');" href="/api/changeuserstatus/${data.data.rows[i].id}" class="badge ${badge}">${data.data.rows[i].user_status}</a>
        </td>
        <td class="project-actions text-right">
            <a class="btn btn-primary btn-sm" href="/userdetails/${data.data.rows[i].id}">
                <i class="fas fa-folder">
                </i>
                View
            </a>
            <a class="btn btn-danger btn-sm" href="/api/deleteusers/${data.data.rows[i].id}">
                <i class="fas fa-trash">
                </i>
                Delete
            </a>
        </td>
    </tr>`
}
$('#tablerow').html(tabledata)

// ___________________________________________________pagination    
let button = Math.ceil(data.data.count / 10)
            
if (Number(data.data.page) <= 1) {
    prevpage = `<li class="page-item disabled">
            <a id="prevpage1" class="page-link"  tabindex="-1">Previous</a>
            </li>`
} else {
    prevpage = `<li class="page-item">
    <a id="prevpage1" class="page-link"  tabindex="-1">Previous</a>
    </li>`   
}

$('#prevpage').html(prevpage)
if (button-1 > id) {
    nextpage = ` <li class="page-item ">
            <a id="nextpage1" class="page-link" >Next</a>
            </li>`
} else {
    nextpage = ` <li class="page-item disabled">
    <a id="nextpage1" class="page-link" >Next</a>
    </li>` 
}

$('#nextpage').html(nextpage)
pagebutton = ''
for (let i = 0; i < button; i++) {
    pagebutton += `<li class="page-item "><a class="page-link" href="/users/${i + 1}">${i + 1}</a></li>`
}
$('#pagination1').html(pagebutton)

document.querySelector('#prevpage1').href = `/users/${Number(data.data.page) - 1}`
document.querySelector('#nextpage1').href = `/users/${Number(data.data.page) + 1}`



    } else {
       alert('something went wrong') 
    }
})

})