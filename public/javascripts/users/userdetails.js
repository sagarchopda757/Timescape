$(document).ready(function(){
    const pathname = window.location.pathname.split('/')
    const id = Number(pathname[pathname.length - 1])
$.ajax({
    type:'GET',
    url:`/api/getuserdetails/${id}`
}).done(function (data){
    console.log(data);
    if (data.sts) {
        name = document.querySelector("#name").value = data.data[0].name
        email = document.querySelector("#email").value = data.data[0].email
        gender = document.querySelector("#gender").value = data.data[0].gender
        mobileno = document.querySelector("#mobileno").value = data.data[0].mobileno
        user_status = document.querySelector("#user_status").value = data.data[0].user_status
        isverified = document.querySelector("#isverified").value = data.data[0].isverified
        user_last_active = document.querySelector("#user_last_active").value = data.data[0].user_last_active
        
        adderessdata = ''
        for (let i = 0; i < data.data[0].addresses.length; i++) {
        
            adderessdata +=  `<textarea id="addresses${i}" class="form-control" cols="40"
                            rows="2" disabled>${data.data[0].addresses[i].addr_line1},${data.data[0].addresses[i].addr_line2},${data.data[0].addresses[i].city},${data.data[0].addresses[i].state}-${data.data[0].addresses[i].pincode}</textarea>`
            
        }
        $('#address').html(adderessdata)
        tabledata = ''
        console.log(data.data[0].orders.length);
        for (let i = 0; i < data.data[0].orders.length; i++) {
        
        tabledata += `<tr>
        <td>
            ${data.data[0].orders[i].id}
        </td>
        <td>
            <small>
            ${data.data[0].orders[i].address.addr_line1},${data.data[0].orders[i].address.addr_line2},${data.data[0].orders[i].address.city},${data.data[0].orders[i].address.state}-${data.data[0].orders[i].address.pincode} </small>
        </td>
        <td>
        ${data.data[0].orders[i].productdetail.product.prod_name}
        </td>
        <td>
        <div class="list-inline-item table-avatar" style="background-color: #${data.data[0].orders[i].productdetail.color_master.color_code};"> #${data.data[0].orders[i].productdetail.color_master.color_code} </div> 
        </td>
        <td>
            ${data.data[0].orders[i].shippingtype}
        </td>
       
      <!--  <td class="project-actions text-right">
            <a class="btn btn-primary btn-sm" href="#">
                <i class="fas fa-folder">
                </i>
                View
            </a>
            <a class="btn btn-info btn-sm" href="#">
                <i class="fas fa-pencil-alt">
                </i>
                Edit
            </a>
            <a class="btn btn-danger btn-sm" href="#">
                <i class="fas fa-trash">
                </i>
                Delete
            </a>
        </td>-->
    </tr>`
            
        }
        $('#tablerow').html(tabledata)
    

    } else {
        alert(data.msg)
    }
})

})