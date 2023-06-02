$(document).ready(function () {
    const getpath = window.location.pathname
    const pathname = window.location.pathname.split('/')
    const id = Number(pathname[pathname.length - 1])
    
   
   
    $('#cancel').click(function(){
       window.location.href = `/productsdetails/${id}`
    })
    

    // _________________________________get colors in editproduct details
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

    //________________________________get details in edit product details forms
    const edit_prod_path= Number(pathname[pathname.length - 2])
    $.ajax({
        type:"GET",
        url:`/api/geteditproductsdetails/${edit_prod_path}`
    }).done(function (data){
        if (data.sts) {
            console.log(data);
            document.querySelector('#color_id').value = data.data.color_id
            document.querySelector('#banner').value = data.data.banner
            document.querySelector('#image').src = "/images/product_images/"+data.data.image
            document.querySelector('#quantity').value = data.data.quantity
        }else{
            alert(data.msg)
        }

    })
    // ________________________________________________update editproductdetails
    $('#confirm').click(function(){
        var formdata = new FormData()
        
        formdata.append("color_id", $("#color_id").val())
        formdata.append("image", $("#image1")[0].files[0])
        formdata.append("banner", $("#banner").val())
        formdata.append("quantity", $("#quantity").val())
       $.ajax({
        type:"POST",
        url:`/api/updateeditproductsdetails/${edit_prod_path}`,
        contentType: false,
        processData: false,
        data:formdata
       }).done((data)=>{
        if (data.sts) {
        alert(data.msg)
        window.location.href = `/productsdetails/${id}/`
            
        } else {
         alert(data.msg)   
        }
       })

    })


})