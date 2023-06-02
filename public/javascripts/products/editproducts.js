// $(document).ready(function () {

//     const pathname = window.location.pathname.split('/')
//     const id = Number(pathname[pathname.length - 1])
//     // ______________________________________________________get categories in edit products table
//     $.ajax({
//         type: "GET",
//         url: "/api/getcategoriesdetails",
//     }).done(function (data) {
//         if (data.sts) {
//             //console.log(data);
//             event.preventDefault()
//             tabledata = ' ';
//             for (let i = 0; i < data.data.length; i++) {
//                 tabledata += `<option value="${data.data[i].id}">${data.data[i].cat_name}</option>`

//             }
//             // document.getElementById("")
//             $('#cat_id').html(tabledata)

//         }
//     })
//     // ____________________________________________________get details in edit products table
//     // $.ajax({
//     //     type: "GET",
//     //     url: `/api/editproducts/${id}`
//     // }).done(function (data) {
//     //     console.log(data);
//     //     if (data.sts) {
//     //         prod_name = document.querySelector("#prod_name").value = data.data.prod_name
//     //         prod_price = document.querySelector("#prod_price").value = data.data.prod_price
//     //         prod_brand = document.querySelector("#prod_brand").value = data.data.prod_brand
//     //         prod_description = document.querySelector("#prod_description").value = data.data.prod_description
//     //         cat_id = document.querySelector("#cat_id").value = data.data.cat_id
//     //         prod_status = document.querySelector("#prod_status").value = data.data.prod_status

          

//     //     } else {
//     //         alert('user does not exist')
//     //     }
//     // })
//     // __________________________________________________update edited product detail
//     $("#confirm").click(function () {
//         data={
//             prod_name :$("#prod_name").val() ,
//             prod_price : $("#prod_price").val(),
//             prod_brand : $("#prod_brand").val(),
//             cat_id:$("#cat_id").val(),
//             prod_description : $("#prod_description").val(),
//             prod_status : $("#prod_status").val()
//         }
//         //console.log(data);

//         $.ajax({
//             type: "POST",
//             url: `/api/updateeditproducts/${id}`,
//             data: data,
//         }).done(function (data) {
//             event.preventDefault();
//             console.log(data);
//             if (data.sts) {
//                 window.location.href = "/products"

//             } else {
//                 window.location.reload()
//             }

//         })
//     });
// })