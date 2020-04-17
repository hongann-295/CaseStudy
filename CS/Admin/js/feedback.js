var feedback = feedback || {}

feedback.showProduct = function () {
    $.ajax({
        url: "https://honganstore.herokuapp.com/feedback",
        method: "GET",
        datatype: "json",
        success: function (data) {
            $('#tbProducts tbody').empty();
            let id = 1;
            $.each(data, function (i, v) {
                $('#tbProducts tbody').append(
                    "<tr>" +
                    "<td>" + (id++) + "</td>" + //data[i].id
                    "<td>" + v.customer + "</td>" +
                    "<td>" + v.gmail + "</td>" +
                    "<td>" + v.phone + "</td>" +
                    "<td>" + v.msg + "</td>" +
                    "<td>" +
                    "<a href='javascript:;' onclick='feedback.remove(" + v.id + ");'><i class='fa fa-trash'></i></a>" +
                    "</td>" +
                    "</tr>"
                );
            })
        }
    })
};

feedback.getCustomer = function () {     
        let cusbObj = {};
        cusbObj.customer = $('#name').val();
        cusbObj.gmail=$('#Email').val();
        cusbObj.phone=$('#Phone').val();
        cusbObj.msg=$('#msg').val();
        $.ajax({
            url: ' https://honganstore.herokuapp.com/feedback',
            method: "POST",
            dataType: "JSON",
            contentType: "application/JSON",
            data : JSON.stringify(cusbObj),
            success : function (data){
                feedback.showProduct();;
            }
        })

        bootbox.alert("Cám ơn bạn đã gửi phản hồi. Hiện tại hệ thống đặt hàng trên web chưa hoàn thiện, nếu bạn muốn đặt hàng. Bạn có thể ghi tên sản phẩm và size tại đây, cửa hàng sẽ note lại và liên lạc với bạn ạ.")
     $('#name').val("");
        $('#Email').val("");
        $('#Phone').val("");
      $('#msg').val("");
 }

 feedback.remove = function (id) {
    bootbox.confirm({
        title: "Remove Product?",
        message: "Do you want to remove this product?",
        buttons: {
            cancel: {
                label: '<i class="fa fa-times"></i> No'
            },
            confirm: {
                label: '<i class="fa fa-check"></i> Yes'
            }
        },
        callback: function (result) {
            if (result) {
                $.ajax({
                    url: " https://honganstore.herokuapp.com/feedback/" + id,
                    method: "DELETE", //"POST"
                    dataType: 'json',
                    success: function (data) {
                        feedback.showProduct();
                        bootbox.alert("Product has been deleted successfully");
                    }
                });
            }
        }
    });
}


feedback.init = function () {
    feedback.showProduct();
}

$(document).ready(function () {
    feedback.init();
})

