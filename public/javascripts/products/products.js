$(document).ready(function () {


    $("#add").click(function () {
        $("#addproduct").show();
    });
    $("#confirm").click(function () {
        $("#addproduct").hide();
    });
    $("#cancel").click(function () {
        $("#addproduct").hide()
    });
    const pathname = window.location.pathname.split('/')
    const id = Number(pathname[pathname.length - 1])
// _____________________________________________get products in product table
    $.ajax({
        type:"GET",
        url:"/api/getproducts",
    }).done(function (data){
        console.log(data.data);
        console.log(data.data.rows.length);
        event.preventDefault();
        if(data.sts){
            tabledata=' ';
            for (let i = 0; i < data.data.rows.length; i++) {
                if (data.data.rows[i].prod_status == 'active') {
                    badge = "badge-success"
                } else {
                    badge = "badge-danger"
                }

                tabledata +=`<tr>
                <td>
                    ${i+1}
                </td>
                <td>
                    ${data.data.rows[i].prod_name}
                </td>
                <td>
                    ${data.data.rows[i].prod_price}
                </td>
                <td>
                    ${data.data.rows[i].prod_brand}
                </td>
                <td>
                    <small>${data.data.rows[i].prod_description}</small>
                </td>
                <td>
                    ${data.data.rows[i].cat_id}
                </td>
                <td class="project-state">
                    <a onclick="return confirm('change status');" href="/api/changeproductstatus/${data.data.rows[i].prod_id}" class="badge ${badge}">${data.data.rows[i].prod_status}</a>
                </td>
                <td class="project-actions text-right">
                    <a class="btn btn-primary btn-sm" href="/productsdetails/${data.data.rows[i].prod_id}/">
                        <i class="fas fa-folder">
                        </i>
                        View
                    </a>
                    <a class="btn btn-info btn-sm" href="/editproducts/${data.data.rows[i].prod_id}">
                        <i class="fas fa-pencil-alt">
                        </i>
                        Edit
                    </a>
                    <a class="btn btn-danger btn-sm" href="/api/deleteproducts/${data.data.rows[i].prod_id}">
                        <i class="fas fa-trash">
                        </i>
                        Delete
                    </a>
                </td>
            </tr>`
            //document.getElementById("tablerow").innerHTML = tabledata
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
                pagebutton += `<li class="page-item "><a class="page-link" href="/products/?page=${i + 1}">${i + 1}</a></li>`
             }
             $('#pagination1').html(pagebutton)
 
            document.querySelector('#prevpage1').href = `/products/?page=${Number(data.data.page) - 1}`
            document.querySelector('#nextpage1').href = `/products/?page=${Number(data.data.page) + 1}`
        }
    }else{
        alert('something went wrong')
    }
})

//___________________________________________________add product in product table
$("#confirm").click(function () {
    // var formdata = new FormData()

    // formdata.append("categoryname", $("#categoryname").val())
    // formdata.append("categoryimage", $("#categoryimage")[0].files[0])
    // formdata.append("categorystatus", $("#categorystatus").val())
    data={
        prod_name: $("#prod_name").val(),
        prod_price: $("#prod_price").val(),
        prod_brand: $("#prod_brand").val(),
        prod_description: $("#prod_description").val(),
        cat_id: $("#cat_id").val(),
        prod_status: $("#prod_status").val() 
    }
    $.ajax({
        type: "POST",
        url: "/api/addproducts",
        data: data, 
    }).done(function (data) {
        event.preventDefault();
        //  console.log(data);
        window.location.reload()
        
    })
}); 
// ____________________________________________________________get categories in add product 
$("#add").click(function () {
    $.ajax({
        type:"GET",
        url:"/api/getcategoriesdetails",
    }).done(function (data){
        if (data.sts) {
            console.log(data);
            event.preventDefault()
            tabledata=' ';
            for (let i = 0; i < data.data.length; i++) {
            tabledata += `<option value="${data.data[i].id}">${data.data[i].cat_name}</option>`
                
            }
           // document.getElementById("")
            $('#cat_id').html(tabledata)
            
        }
    })
});
})