var categories = categories || {}

categories.showProduct = function () {
    $.ajax({
        url: "http://localhost:3000/categories",
        method: "GET",
        datatype: "json",
        success: function (data) {
            $('#tbProducts tbody').empty();
            let id = 1;
            $.each(data, function (i, v) {
                $('#tbProducts tbody').append(
                    "<tr>" +
                    "<td>" + (id++) + "</td>" + //data[i].id
                    "<td>" + v.name + "</td>" +
                    "<td>" + v.active + "</td>" +
                    "<td>" +
                    "<a href='javascript:;' onclick='categories.productDetail(" + v.id + ");'><i class='fa fa-edit'></i></a> " +
                    "<a href='javascript:;' onclick='categories.remove(" + v.id + ");'><i class='fa fa-trash'></i></a>" +
                    "</td>" +
                    "</tr>"

                );
            })
        }
    })
};


categories.openModal = function () {
    categories.restForm();
    $('#addEditModal').modal('show');
}

categories.remove = function (id) {
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
                    url: "http://localhost:3000/categories/" + id,
                    method: "DELETE", //"POST"
                    dataType: 'json',
                    success: function (data) {
                        categories.showProduct();
                        bootbox.alert("Product has been deleted successfully");
                    }
                });
            }
        }
    });
}

categories.save = function () {
    if ($('#formAddEditProduct').valid()) {
        if ($('#productId').val() == 0) { 
            var addObj = {};
            addObj.name = $('#Name').val();
            addObj.active = $('#Active').val();

            $.ajax({
                url: "http://localhost:3000/categories",
                method: "POST",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(addObj),
                success: function (data) {
                    $('#addEditModal').modal('hide');
                    categories.showProduct();
                    bootbox.alert("Product has been added successfully");

                }
            })
        }
        else{ 
            var updateObj = {};
            updateObj.name = $('#Name').val();
            updateObj.active = $('#Active').val();
            updateObj.id = $('#productId').val();

            $.ajax({
                url : "http://localhost:3000/categories/" + updateObj.id,
                method : "PUT",
                dataType: "json",
                contentType: "application/json",
                data : JSON.stringify(updateObj),
                success : function(data){
                    $('#addEditModal').modal('hide');
                    categories.showProduct();
                    bootbox.alert("Product has been updated successfully");

                }
            })
        }
    };
}


categories.productDetail = function (id) {
    $.ajax({
        url: "http://localhost:3000/categories/" + id,
        method: "GET",
        dataType: 'json',
        success: function (data) {
            $('#Name').val(data.name);
            $('#Active').val(data.active);
            $('#productId').val(data.id);

            $('#addEditModal').find('.modal-title').text('Update Product');
            $('#btnProduct').text("Update");
            $('#addEditModal').modal('show');
        }
    });

}

categories.restForm = function () {
    $('#Name').val('');
    $('#Active').val('');
    $('#addEditModal').find('.modal-title').text('Create New Product');
    $('#btnProduct').text("Create");
    $('#productId').val('0');
}

categories.init = function () {
    categories.showProduct();
}

$(document).ready(function () {
    categories.init();
})