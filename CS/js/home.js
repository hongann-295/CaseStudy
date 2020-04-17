var home = {} || home;

home.showProduct = function(){
    $.ajax({
        url : " http://localhost:3000/products?categoryId=1",
        method : "GET",
        datatype : "json",
        success : function(data){
            $.each(data, function(i, v){
                $('#products').append(
					'<div class="col-sm-12 col-md-6 col-lg-3 d-flex">' +
						// '<a href="javascript:;" class="portfolio-link" onclick=home.productDetail()></a>'+
						'<div class="product d-flex flex-column">' +
							'<a href="#" class="img-prod"><img class="img-fluid" src="' + v.productimage + '" alt="">' +
								'<div class="overlay"></div>' +
							'</a>' +
							'<div class="text py-3 pb-4 px-3">' +
								'<div class="d-flex">' +
									'<div class="cat">' +
										'<span>Lifestyle</span>' +
									'</div>' +
								'</div>' +
								'<h3>'+ v.productname +'</h3>' +
								'<div class="pricing">' +
									'<p class="price"><span>' + '$' + v.price + '</span></p>' +
								'</div>' +
								'<div class="pricing">' +
									'<p class="price"><span>' + v.size + '</span></p>' +
								'</div>' +
								'<p class="bottom-area d-flex px-3">' +
									// '<a href="#" class="add-to-cart text-center py-2 mr-1"><span>Add to cart <i class="ion-ios-add ml-1"></i></span></a>' +
									// '<a href="#" class="buy-now text-center py-2">Buy now<span><i class="ion-ios-cart ml-1"></i></span></a>' +
								'</p>' +
							'</div>' +
						'</div>' +
    				'</div>'
                );
            });
        }
    })
};

// home.productDetail = function(){

// }

home.init = function(){
    home.showProduct();
};

$(document).ready(function(){
    home.init();
});