$(document).ready(function(){
    $('.materialboxed').materialbox();
    loadProducts();
  });

  function loadProducts() {
    $(".progress").show(400);
    db.collection("Products").get().then(function(productList) {
      productList.forEach(function(product) {
        appendProduct(product.data());

      });
      $('.materialboxed').materialbox();
      $(".progress").hide(400)
  });
  }

  function appendProduct(product) {
    $("#products_wrapper").append(`
      <a href="#" class="collection-item avatar home-product">
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

          <input id="add_item_quantity" type="number" name="quantity" min="1" max="200" placeholder="Cantidad">
          <label for="add_item_quantity" class="active">` + product.stock + ` en stock</label>
        </div>
        <div class="col s12 m3">
          <button class="waves-effect waves-light blue darken-3 btn right" style="width: 100%;"><i class="material-icons left">add</i>Agregar</button>
        </div>
      </a>
      `);
  }
