

$(document).ready(function () {
    $("#add").click(function () {
        $("#addcategories").show();
        
    });
   
    $("#cancel").click(function () {
        $("#addcategories").hide()
        
    })
 //   const pathname = window.location.pathname.split('/')
   // const id = Number(pathname[pathname.length - 1])
 

// ____________________________________________________________________add new category in categories
    $("#confirm").click(function () {
        var formdata = new FormData()
        formdata.append("categoryname", $("#categoryname").val())
        formdata.append("image", $("#image")[0].files[0])
        formdata.append("categorystatus", $("#categorystatus").val())
        console.log();

        $.ajax({
            type: "POST",
            url: "/api/addcategories",
            contentType: false,
            processData: false,
            data: formdata,
        }).done(function (data) {
            event.preventDefault();
            $("#addcategories").hide();
        })
    });
    




});

