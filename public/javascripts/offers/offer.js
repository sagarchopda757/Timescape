$(document).ready(function () {
    $("#add").click(function () {
        $("#addoffer").show();
    });
    $("#confirm").click(function () {
        $("#addoffer").hide();
    });
    $('#cancel').click(function () {
        $('#addoffer').hide();
    })
    const pathname = window.location.pathname.split('/')
    const id = Number(pathname[pathname.length - 1])
    // _____________________________________________get offer in offers form
    $.ajax({
        type: 'GET',
        url: '/api/getoffer'
    }).done(function (data) {
        console.log(data);
        if (data.sts) {
            tablebody = ''
            for (let i = 0; i < data.data.rows.length; i++) {

                tablebody += ` <tr>
                <td>
                    ${i + 1}
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
                    ${data.data.rows[i].categories_master.cat_name}
                </td>
                <td>
                    <small>${data.data.rows[i].offer_details}</small>
                </td>
                <td>
                    ${data.data.rows[i].discont_type}
                </td>
                <td>
                ${data.data.rows[i].discount_price}
                </td>
                <td>
                ${data.data.rows[i].offer_order}
                </td>
                <td>
                ${data.data.rows[i].offer_from}
                </td>
                <td>
                ${data.data.rows[i].offer_till}
                </td>
                <td class="project-actions text-right">
                    <a class="btn btn-info btn-sm" href="/editoffer/${data.data.rows[i].id}">
                        <i class="fas fa-pencil-alt">
                        </i>
                        Edit
                    </a>
                    <a class="btn btn-danger btn-sm" href="/api/deleteoffer/${data.data.rows[i].id}">
                        <i class="fas fa-trash">
                        </i>
                        Delete
                    </a>
                </td>
            </tr>`

            }
            $('#tablerow').html(tablebody)

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
            if (button - 1 > id) {
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
                pagebutton += `<li class="page-item "><a class="page-link" href="/offers/${i + 1}">${i + 1}</a></li>`
            }
            $('#pagination1').html(pagebutton)

            document.querySelector('#prevpage1').href = `/offers/${Number(data.data.page) - 1}`
            document.querySelector('#nextpage1').href = `/offers/${Number(data.data.page) + 1}`

        } else {
            alert(data.msg)
        }

    })
    // ____________________________________________get categories in add offers
    $("#add").click(function () {
        $.ajax({
            type: 'GET',
            url: 'api/getcategories'
        }).done(function (data) {
            if (data.sts) {
                console.log(data);
                category = ''
                for (let i = 0; i < data.data.length; i++) {

                    category += `<option value="${data.data[i].id}">${data.data[i].cat_name}</option>`

                }
                $('#cat_id').html(category)
            } else {
                alert(data.msg)
            }
        })

    })
    //___________________________________________________add offers in offer table
    $("#confirm").click(function () {

        data = {
            name: $("#name").val(),
            cat_id: $("#cat_id").val(),
            offer_details: $("#offer_details").val(),
            discont_type: $("#discont_type").val(),
            discount_price: $("#discount_price").val(),
            offer_order: $('#offer_order').val(),
            offer_from: $("#offer_from").val(),
            offer_till: $("#offer_till").val(),
            offer_order: $("#offer_order").val()
        }
        $.ajax({
            type: "POST",
            url: "/api/addoffer",
            data: data,
        }).done(function (data) {
            event.preventDefault();
            //  console.log(data);
            window.location.reload()

        })
    });

});