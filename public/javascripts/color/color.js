

$(document).ready(function () {
    $("#add").click(function () {
        $("#addcolor").show();
    });
    $("#confirm").click(function () {
        $("#addcolor").hide();
    });
    $('#cancel').click(function () {
        $('#addcolor').hide();
    })
    // _______________________________________________get hex value in input
    $("#click").on("click", () => {

        document.querySelector('#hexcode').value = $('#colorcode').val()
    })

   

    const pathname = window.location.pathname.split('/')
    const id = Number(pathname[pathname.length - 1])
    // ___________________________________________get colors 
    $.ajax({
        type: 'GET',
        url: `/api/getcolor/${id}`,
        
    }).done(function (data) {
        console.log(data);
        if (data.sts) {
            tabledata = ''

            for (let i = 0; i < data.data.rows.length; i++) {
                tabledata += ` <tr>
            <td>
                ${data.data.rows[i].color_id}
            </td>
            
            <td>

           
                <div class="input-group my-colorpicker2" data-colorpicker-id="2">
                <a type="text" class="form-control">${data.data.rows[i].color_code}</a>

                    <div class="input-group-append">
                      <span class="input-group-text"><i class="fas fa-square" style="color: ${data.data.rows[i].color_code}"></i></span>
                    </div>
                  </div>
            </td>


            <td class="project-actions text-right">
                
                <a class="btn btn-info btn-sm" href="#">
                    <i class="fas fa-pencil-alt">
                    </i>
                    Edit
                </a>
                <a class="btn btn-danger btn-sm" href="/api/deletecolor/${data.data.rows[i].color_id}">
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
            if (button-1 >= id) {
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
                pagebutton += `<li class="page-item "><a class="page-link" href="/color/${i + 1}">${i + 1}</a></li>`
            }
            $('#pagination1').html(pagebutton)

            document.querySelector('#prevpage1').href = `/color/${Number(data.data.page) - 1}`
            document.querySelector('#nextpage1').href = `/color/${Number(data.data.page) + 1}`
         
            // _______________________________________sorting 
                                    
            document.querySelector('#colorid').href = `/color/${id}/?sort=color_id&order=asc`
                                   

            if (order === 'asc') {
                document.querySelector('#colorid').href = `/color/${id}/?sort=color_id&order=desc`
            } 
            if(order === 'desc') {
                document.querySelector('#colorid').href = `/color/${id}/?sort=color_id&order=asc`
            }
            

           
        } else {
            alert(data.msg)
        }
    })

    $("#confirm").click(function () {
        data = {
            color_code: $('#hexcode').val()
        }

        $.ajax({
            type: 'POST',
            url: '/api/addcolor',
            data: data
        }).done(function (data) {
            if (data.sts) {
                window.location.reload()
            } else {
                alert(data.msg)
            }
        })
    });


})