
var cart_products = [];
var all_products = [];

$(document).ready(function(){
    $('.materialboxed').materialbox();
    loadProducts();
    updateCart();
  });

  function loadProducts() {
    $(".progress").show(400);
    db.collection("Products").get().then(function(productList) {
      var i = 0;
      productList.forEach(function(product) {
        appendProduct(i, product.data());
        i++;
        var current_product = product.data();
        all_products.push(current_product);
      });
      $('.materialboxed').materialbox();
      $(".progress").hide(400)
  });
  }

  function appendProduct(id, product) {
    $("#products_wrapper").append(`
      <li class="collection-item avatar home-product">
        <div class="col s12 m4">
          <img src="` + Utils.imgThumb(product.picture) + `" height="80" class="materialboxed">
          <span class="description">` + product.description + `</span>
          <p class="part_number">` + Utils.priceText(product.cost) +  `</p>
        </div>
        <div class="col s2">
          <p class="center-align">` + product.part_number + `<br>` + product.category + `</p>
        </div>
        <div class="col m1 hide-on-small"></div>

        <div id="quantity_wrapper" class="col s2 input-field">

          <input id="add_item_quantity" class="quantity_` + id + `" type="number" name="quantity" min="1" max="200" placeholder="Cantidad">
          <label id="stock_for_` + id + `" for="add_item_quantity" class="active">` + product.stock + ` in stock</label>
        </div>
        <div class="col s12 m3">
          <button onclick="addProduct(` + id + `)" class="waves-effect waves-light blue darken-3 btn right" style="width: 100%;"><i class="material-icons left">add</i>Agregar</button>
        </div>
      </li>
      `);
  }

function addProduct(id) {
  var quantity = parseInt($(".quantity_" + id).val());
  var product = all_products[id];
  if(quantity > product.stock) {
    Materialize.toast("You can't request more than item stock", 3000)
  } else if (quantity > 0) {
    product.quantity = quantity;
    var stock = product.stock - quantity;
    $("#stock_for_" + id).text(stock + " in stock (" + quantity + " on hold)");
    cart_products.push(product);
      Materialize.toast(quantity + " " + product.description + ' added to your cart', 2000, 'rounded')
    $(".quantity_" + id).val("");
    updateCart();
  } else {
    Materialize.toast("Invalid selection", 3000)
  }
}

function updateCart() {
  if(cart_products.length > 0) {
    $("#cart_items_quantity").text(cart_products.length);
    $("#cart_items_quantity").show(400);
    window.localStorage.setItem("cart", JSON.stringify(cart_products));
    console.log(JSON.stringify(cart_products));
  } else {
    $("#cart_items_quantity").hide(400);
    window.localStorage.setItem("cart", "");
  }
}
