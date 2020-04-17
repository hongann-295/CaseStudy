var shop = {} || shop;

shop.showProduct = function (id) {
	$.ajax({
		url: " https://honganstore.herokuapp.com/products/?categoryId=" + id,
		method: "GET",
		datatype: "json",
		success: function (data) {
			$('#products').empty();
			$.each(data, function (i, v) {
				$('#products').append(
					'<div class="col-sm-12 col-md-12 col-lg-4 ">' +
					'<div class="product d-flex flex-column" >' +
					'<a href="javascript:;"  onclick="shop.plusShowProduct(' + v.id + ')" class="img-prod"><img class="img-fluid" src="' + v.productimage + '" alt="" >' +
					'<div class="overlay">' + '</div>' +
					'</a>' +
					'<div class="text py-3 pb-4 px-3">' +

					'<h3><a href="#">' + v.productname + '</a></h3>' +
					'<div class="pricing">' +
					'<p class="price">' + '<span>' + '$' + v.price + '</span>' + '</p>' +
					'<p class="price">' + '<span>' + v.size + '</span>' + '</p>' +
					'<p class="price">' + '<span>' + v.description + '</span>' + '</p>' +
					'</div>' +
					'<p class="bottom-area d-flex px-3">' +
					// '<a href="#" class="add-to-cart text-center py-2 mr-1">' + '<span>' + 'Add to cart ' + '<i class="ion-ios-add ml-1">' + '</i>' + '</span>' + '</a>' +
					// '<a href="#" class="buy-now text-center py-2">Buy now<span>' + '<i class="ion-ios-cart ml-1">' + '</i>' + '</span>' + '</a>' +
					'</p>' +
					'</div>' +
					'</div>' +
					'</div>'
				);
			});
		}
	})
};

shop.plusShowProduct = function (id) {
	$.ajax({
		url: " http://localhost:3000/products/" + id,
		method: "GET",
		datatype: "json",
		success: function (data) {			
				$('#productname').text(data.productname)
				$('#price').text(data.price)
				$('#size').text(data.size)
				$('#description').text(data.description)
				$('#productimage').prop('src', data.productimage);
				$('#plusShowProduct').modal('show');		 
		}
	})
}

shop.initCategory = function(){
	$.ajax({
		url: " http://localhost:3000/categories/?active=true",
		method: "GET",
		datatype: "json",
		success: function (data) {	
				$('#accordion').empty();
				$.each(data, function(i, v){
					$('#accordion').append(
						'<div class="panel panel-default">'+
							'<div class="panel-heading" role="tab" id="headingOne">'+
								'<h4 class="panel-title">'+
									'<a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" '+
									'aria-expanded="true" aria-controls="collapseOne" onclick="shop.showProduct('+ v.id+')">'+ v.name+'</a>'+
								'</h4>'+
							'</div>'+
						'</div>'
					);
				})			 
		}
	})
}
shop.init = function () {
	shop.showProduct(1);
	shop.initCategory();
};

$(document).ready(function () {
	shop.init();
});