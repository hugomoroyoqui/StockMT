$(document).ready(function(){
  var cart = JSON.parse(window.localStorage.getItem("cart"));
  if(cart && cart.length > 0){
    var i = 0;
    cart.forEach(function(product){
      appendProduct(i, product);
      i++;
    });
    $('.materialboxed').materialbox();
    $(".progress").hide(200);
  } else {
    $(".progress").hide(200);
  }

})

function appendProduct(id, product) {
  $("#cart_wrapper").append(`
    <li class="collection-item avatar home-product">
    <div class="col s12 m6">
    <img src="` + Utils.imgThumb(product.picture) + `" height="80" class="materialboxed">
    <span class="description">` + product.description + `</span>
    <p class="part_number">` + Utils.priceText(product.cost) +  `</p>
    </div>
    <div class="col s2">
    <p class="center-align">` + product.part_number + `<br>` + product.category + `</p>
    </div>
    <div class="col m1 hide-on-small"></div>
    <div class="col s12 m3">

    </div>
    <span class="col s2">` + product.quantity + ` requested</span>

    </li>
    `);
  }
