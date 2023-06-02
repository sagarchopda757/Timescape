

$(document).ready(function () {

    const pathname = window.location.pathname.split('/')
    const id = Number(pathname[pathname.length - 1])

// __________________________get categories in edit offer 
$.ajax({
    type:'GET',
    url:'/api/getcategories'
}).done(function (data){
    if (data.sts) {
        console.log(data);
        category =''
        for (let i = 0; i < data.data.length; i++) {
            
            category += `<option value="${data.data[i].id}">${data.data[i].cat_name}</option>`
            
        }
        $('#cat_id').html(category)
    } else {
        alert(data.msg)
    }
})
//________________________________________get edit offer details
$.ajax({
    type:'GET',
    url:`/api/geteditoffer/${id}`
}).done(function (data){
    console.log(data);
    if (data.sts) {
        console.log(data.data.cat_id);
        name = document.querySelector("#name").value = data.data.name
        cat_id = document.querySelector("#cat_id").value = data.data.cat_id
        offer_details = document.querySelector("#offer_details").value = data.data.offer_details
        discont_type = document.querySelector("#discont_type").value = data.data.discont_type
        discount_price = document.querySelector("#discount_price").value = data.data.discount_price
        offer_order = document.querySelector("#offer_order").value = data.data.offer_order
        offer_from = document.querySelector("#offer_from").value = data.data.offer_from.slice(0, 19) 
        offer_till = document.querySelector("#offer_till").value = data.data.offer_till.slice(0, 19)

     

    } else {
        alert(data.msg)
    }
})
//______________________________________update edit offer
$('#confirm').click(function(){
    data={
        name: $("#name").val(),
        cat_id: $("#cat_id").val(),
        offer_details: $("#offer_details").val(),
        discont_type: $("#discont_type").val(),
        discount_price: $("#discount_price").val(),
        offer_order:$('#offer_order').val(),
        offer_from: $("#offer_from").val() ,
        offer_till: $("#offer_till").val() ,
        offer_order: $("#offer_order").val()      
    }
    $.ajax({
        type:'POST',
        url:`/api/updateeditoffer/${id}`,
        data:data
    }).done(function(data){
        if (data.sts) {
            window.location.href = '/offers'
        } else {
            alert(data.msg)
        }
    })
})

})