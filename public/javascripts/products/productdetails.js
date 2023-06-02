$(document).ready(function () {
    $("#add").click(function () {
        $("#addproduct").show();
    });
    $("#confirm").click(function () {
        $("#addproduct").hide();
    });
    $("#cancel1").click(function () {
        $("#addproduct").hide()
    });

    const pathname = window.location.pathname.split('/')
    const id = Number(pathname[pathname.length - 1])
    // ______________________________________________________get product details in  productsdetails table
    $.ajax({
        type: "GET",
        url: `/api/getproductsdetails/${id}`,
    }).done(function (data) {
        if (data.sts) {
            console.log('product details', data);

            event.preventDefault()
            prod_name = document.querySelector("#prod_name").value = data.data.rows[0].prod_name
            prod_price = document.querySelector("#prod_price").value = data.data.rows[0].prod_price
            prod_brand = document.querySelector("#prod_brand").value = data.data.rows[0].prod_brand
            prod_description = document.querySelector("#prod_description").value = data.data.rows[0].prod_description
            cat_id = document.querySelector("#cat_id").value = data.data.rows[0].cat_id
            prod_status = document.querySelector("#prod_status").value = data.data.rows[0].prod_status


            tabledata = ' ';
            // console.log(data.data[0].productdetails.length);
            for (let i = 0; i < data.data.rows[0].productdetails.length; i++) {

                if (data.data.rows[0].productdetails[i].banner == 'yes') {
                    badge = "badge-success"
                } else {
                    badge = "badge-danger"
                }

                tabledata += `<tr>
            <td>
                ${i + 1}
            </td>
           
            <td>
                <div class="list-inline-item table-avatar" style="background-color: ${data.data.rows[0].productdetails[i].color_master.color_code};">${data.data.rows[0].productdetails[i].color_master.color_code} </div>  
            </td>
            <td>
                <li class="list-inline-item">
                    <img alt="product image" class="table-avatar" src="/images/product_images/${data.data.rows[0].productdetails[i].image}">
                </li>
            </td>
            <td>
                <span class="badge ${badge}">${data.data.rows[0].productdetails[i].banner}</span>
            </td>
            
            <td>
               ${data.data.rows[0].productdetails[i].quantity}
            </td>
            
            <td class="project-actions text-right">
                <a class="btn btn-info btn-sm" href="/editproductdetails/${data.data.rows[0].productdetails[i].id}/${data.data.rows[0].productdetails[i].prod_id}">
                    <i class="fas fa-pencil-alt">
                    </i>
                    Edit
                </a>
                <a class="btn btn-danger btn-sm" href="/api/deleteproductsdetails/${data.data.rows[0].productdetails[i].id}/${data.data.rows[0].productdetails[i].prod_id}">
                    <i class="fas fa-trash">
                    </i>
                    Delete
                </a>
            </td>


            </tr>`

            }
            //  document.getElementById("")
            $('#tablerow').html(tabledata)
            const page = Number(pathname[pathname.length - 1])
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
if (button-1 > page) {
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
    pagebutton += `<li class="page-item "><a class="page-link" href="/productsdetails/${id}/${i + 1}">${i + 1}</a></li>`
}
$('#pagination1').html(pagebutton)

document.querySelector('#prevpage1').href = `/productsdetails/${id}/${Number(data.data.page) - 1}`
document.querySelector('#nextpage1').href = `/productsdetails/${id}/${Number(data.data.page) + 1}`


        }else{
           
            alert(data.msg)
        }
    })
    // ________________________________________________get colors from color_master table
    $("#add").click(function () {
        $.ajax({
            type: "GET",
            url: "/api/getcolors",
        }).done(function (data) {
            if (data.sts) {
                console.log(data);
                event.preventDefault()
                tabledata = ' ';
                for (let i = 0; i < data.data.length; i++) {
                    tabledata += `<option value="${data.data[i].color_id}">${data.data[i].color_code}</option>`

                }
                // document.getElementById("")
                $('#color_id').html(tabledata)
            }
        })
    });
    // ______________________________________________add products in product details
    $("#confirm").click(function () {
        var formdata = new FormData()

        formdata.append("color_id", $("#color_id").val())
        formdata.append("image", $("#image")[0].files[0])
        formdata.append("banner", $("#banner").val())
        formdata.append("quantity", $("#quantity").val())
        // console.log(formdata);
        $.ajax({
            type: "POST",
            url: `/api/addproductdetails/${id}`,
            contentType: false,
            processData: false,
            data: formdata
        }).done(function (data) {
            if (data.sts) {
                alert('product details added successfully')
                window.location.reload()
            }else{
                alert('sometihng went wrong')
            }

        })
    })
})