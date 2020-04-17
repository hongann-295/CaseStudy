var dashboard = dashboard || {}

dashboard.showProduct = function () {
    $.ajax({
        url: "https://honganstore.herokuapp.com/products",
        method: "GET",
        datatype: "json",
        success: function (data) {
            $('#tbProducts tbody').empty();
            let id = 1;
            $.each(data, function (i, v) {
                $('#tbProducts tbody').append(
                    "<tr>" +
                    "<td>" + (id++) + "</td>" + //data[i].id
                    "<td>" + v.productname + "</td>" +
                    // '<td>''<img src="images/noimage.png" width=120px height=150px>'+
                    // '<input type="file" name="upload" id="upload"></input>'+
                    // '</td>'+
                    "<td><img src='" + v.productimage + "' width='120px' height='150px'></td>" +
                    "<td>" + v.price + "</td>" +
                    "<td>" + v.size + "</td>" +
                    "<td>" + v.description + "</td>" +
                    "<td>" +
                    "<a href='javascript:;' onclick='dashboard.productDetail(" + v.id + ");'><i class='fa fa-edit'></i></a> " +
                    "<a href='javascript:;' onclick='dashboard.remove(" + v.id + ");'><i class='fa fa-trash'></i></a>" +
                    "</td>" +
                    "</tr>"

                );
            })
        }
    })
};


dashboard.openModal = function () {
    dashboard.restForm();
    $('#addEditModal').modal('show');
}

dashboard.remove = function (id) {
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
                    url: "https://honganstore.herokuapp.com/products/" + id,
                    method: "DELETE", //"POST"
                    dataType: 'json',
                    success: function (data) {
                        dashboard.showProduct();
                        bootbox.alert("Product has been deleted successfully");
                    }
                });
            }
        }
    });
}

dashboard.save = function () {
    if ($('#formAddEditProduct').valid()) {
        if ($('#productId').val() == 0) {
            var addObj = {};
            addObj.productname = $('#ProductName').val();
            addObj.productimage = $('#ProductImage').val();
            addObj.price = $('#Price').val();
            addObj.size = $('#Size').val();
            addObj.description = $('#Description').val();
            addObj.categoryId = $('#Category').val();

            $.ajax({
                url: "https://honganstore.herokuapp.com/products",
                method: "POST",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(addObj),
                success: function (data) {
                    $('#addEditModal').modal('hide');
                    dashboard.showProduct();
                    bootbox.alert("Product has been added successfully");

                }
            })
        }
        else {
            var updateObj = {};
            updateObj.productname = $('#ProductName').val();
            updateObj.productimage = $('#ProductImage').val();
            updateObj.price = $('#Price').val();
            updateObj.size = $('#Size').val();
            updateObj.description = $('#Description').val();
            updateObj.id = $('#productId').val();
            updateObj.categoryId = $('#Category').val();

            $.ajax({
                url: "https://honganstore.herokuapp.com/products/" + updateObj.id,
                method: "PUT",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(updateObj),
                success: function (data) {
                    $('#addEditModal').modal('hide');
                    dashboard.showProduct();
                    bootbox.alert("Product has been updated successfully");

                }
            })
        }
    };
}


dashboard.productDetail = function (id) {
    $.ajax({
        url: "https://honganstore.herokuapp.com/products/" + id,
        method: "GET",
        dataType: 'json',
        success: function (data) {
            $('#ProductName').val(data.productname);
            $('#ProductImage').val(data.productimage);
            $('#Price').val(data.price);
            $('#Size').val(data.size);
            $('#Description').val(data.description);
            $('#productId').val(data.id);
            $('#Category').val(data.categoryId);

            $('#addEditModal').find('.modal-title').text('Update Product');
            $('#btnProduct').text("Update");
            $('#addEditModal').modal('show');
        }
    });

}

dashboard.restForm = function () {
    $('#ProductName').val('');
    $('#ProductImage').val('');
    $('#Price').val('');
    $('#addEditModal').find('.modal-title').text('Create New Product');
    $('#btnProduct').text("Create");
    $('#Size').val('');
    $('#Description').val('');
    $('#productId').val('0');
    $('#Category').val('1');
}

dashboard.initCategory = function () {
    $.ajax({
        url: "https://honganstore.herokuapp.com/categories/?active=true",
        method: "GET",
        datatype: "json",
        success: function (data) {
            $('#Category').empty();
            $.each(data, function (i, v) {
                $('#Category').append(
                    '<option value="' + v.id + '">' + v.name + '</option>'
                );
            })
        }
    })
}


filterSelectionall = function () {
    dashboard.showProduct();
}
filterSelectionClothing1 = function () {
    $.ajax({
        url: "https://honganstore.herokuapp.com/products",
        method: "GET",
        datatype: "json",
        success: function (data) {
            $('#tbProducts tbody').empty();
            let id = 1;
            $.each(data, function (i, v) {
                if (v.categoryId==='1') {
                    $('#tbProducts tbody').append(
                        "<tr>" +
                        "<td>" + (id++) + "</td>" +
                        "<td>" + v.productname + "</td>" +
                        "<td><img src='" + v.productimage + "' width='120px' height='150px'></td>" +
                        "<td>" + v.price + "</td>" +
                        "<td>" + v.size + "</td>" +
                        "<td>" + v.description + "</td>" +
                        "<td>" +
                        "<a href='javascript:;' onclick='dashboard.productDetail(" + v.id + ");'><i class='fa fa-edit'></i></a> " +
                        "<a href='javascript:;' onclick='dashboard.remove(" + v.id + ");'><i class='fa fa-trash'></i></a>" +
                        "</td>" +
                        "</tr>"

                    );
                }
            })
        }
    })
}

filterSelectionShoes2 = function(){
    $.ajax({
        url: "https://honganstore.herokuapp.com/products",
        method: "GET",
        datatype: "json",
        success: function (data) {
            $('#tbProducts tbody').empty();
            let id = 1;
            $.each(data, function (i, v) {
                if (v.categoryId==='2') {
                    $('#tbProducts tbody').append(
                        "<tr>" +
                        "<td>" + (id++) + "</td>" +
                        "<td>" + v.productname + "</td>" +
                        "<td><img src='" + v.productimage + "' width='120px' height='150px'></td>" +
                        "<td>" + v.price + "</td>" +
                        "<td>" + v.size + "</td>" +
                        "<td>" + v.description + "</td>" +
                        "<td>" +
                        "<a href='javascript:;' onclick='dashboard.productDetail(" + v.id + ");'><i class='fa fa-edit'></i></a> " +
                        "<a href='javascript:;' onclick='dashboard.remove(" + v.id + ");'><i class='fa fa-trash'></i></a>" +
                        "</td>" +
                        "</tr>"

                    );
                }
            })
        }
    })
}

filterSelectionAccessories3 = function(){
    $.ajax({
        url: "https://honganstore.herokuapp.com/products",
        method: "GET",
        datatype: "json",
        success: function (data) {
            $('#tbProducts tbody').empty();
            let id = 1;
            $.each(data, function (i, v) {
                if (v.categoryId==='3') {
                    $('#tbProducts tbody').append(
                        "<tr>" +
                        "<td>" + (id++) + "</td>" +
                        "<td>" + v.productname + "</td>" +
                        "<td><img src='" + v.productimage + "' width='120px' height='150px'></td>" +
                        "<td>" + v.price + "</td>" +
                        "<td>" + v.size + "</td>" +
                        "<td>" + v.description + "</td>" +
                        "<td>" +
                        "<a href='javascript:;' onclick='dashboard.productDetail(" + v.id + ");'><i class='fa fa-edit'></i></a> " +
                        "<a href='javascript:;' onclick='dashboard.remove(" + v.id + ");'><i class='fa fa-trash'></i></a>" +
                        "</td>" +
                        "</tr>"

                    );
                }
            })
        }
    })
}

filterSelectionDecor4 = function(){
    $.ajax({
        url: "https://honganstore.herokuapp.com/products",
        method: "GET",
        datatype: "json",
        success: function (data) {
            $('#tbProducts tbody').empty();
            let id = 1;
            $.each(data, function (i, v) {
                if (v.categoryId==='4') {
                    $('#tbProducts tbody').append(
                        "<tr>" +
                        "<td>" + (id++) + "</td>" +
                        "<td>" + v.productname + "</td>" +
                        "<td><img src='" + v.productimage + "' width='120px' height='150px'></td>" +
                        "<td>" + v.price + "</td>" +
                        "<td>" + v.size + "</td>" +
                        "<td>" + v.description + "</td>" +
                        "<td>" +
                        "<a href='javascript:;' onclick='dashboard.productDetail(" + v.id + ");'><i class='fa fa-edit'></i></a> " +
                        "<a href='javascript:;' onclick='dashboard.remove(" + v.id + ");'><i class='fa fa-trash'></i></a>" +
                        "</td>" +
                        "</tr>"

                    );
                }
            })
        }
    })
}

filterSelectionBag6 = function(){
    $.ajax({
        url: "https://honganstore.herokuapp.com/products",
        method: "GET",
        datatype: "json",
        success: function (data) {
            $('#tbProducts tbody').empty();
            let id = 1;
            $.each(data, function (i, v) {
                if (v.categoryId==='6') {
                    $('#tbProducts tbody').append(
                        "<tr>" +
                        "<td>" + (id++) + "</td>" +
                        "<td>" + v.productname + "</td>" +
                        "<td><img src='" + v.productimage + "' width='120px' height='150px'></td>" +
                        "<td>" + v.price + "</td>" +
                        "<td>" + v.size + "</td>" +
                        "<td>" + v.description + "</td>" +
                        "<td>" +
                        "<a href='javascript:;' onclick='dashboard.productDetail(" + v.id + ");'><i class='fa fa-edit'></i></a> " +
                        "<a href='javascript:;' onclick='dashboard.remove(" + v.id + ");'><i class='fa fa-trash'></i></a>" +
                        "</td>" +
                        "</tr>"

                    );
                }
            })
        }
    })
}

dashboard.init = function () {
    dashboard.showProduct();
    dashboard.initCategory();
}

$(document).ready(function () {
    dashboard.init();
})