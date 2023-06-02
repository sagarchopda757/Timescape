jQuery.validator.setDefaults({
    debug: true,
    success: "valid"
});
$(document).ready(function () {
  // $("#loginbutton").click(function(){
  //   $.ajax({
  //     type: "POST",
  //     url: "/api/login",
  //     data: {
  //       email: $("#email").val(),
  //       password:$("#password").val()
  //   },
  //   }).done(function (data) {
  //     console.log(data);
  //     if (data.sts == false) {
  //       $("#status1").text(data.msg)
  //     } else {
  //       window.location.replace("http://localhost:3001/admin")
  //     }
  //   });
    
  // })
$("#loginform").validate({
  
    rules: {
        email: {
            required: true,
            email: true
        },
        password: {
            required: true,
            minlength: 6
        }
    },
    submitHandler: function(form) {
    form.submit();
   }  
});

$("#displaymessage").delay(3000).fadeOut()

})
  
 