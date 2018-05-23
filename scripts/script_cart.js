var cart;
$(document).ready(function(){
  cart = JSON.parse(window.localStorage.getItem("cart"));
  if(cart && cart.length > 0){
    $(".progress").show(200);
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

  $("#btn_confirm_order").click(function(){
    var cost_center = $("#cost_center").val();
    var area_manager = $("#area_manager").val();
    var priority = $("#priority").val();
    var information = $("#information").val();
    if(cart.length > 0){
      realtime.ref("Orders").push({
        products: cart,
        status: "pending",
        cost_center: cost_center,
        area_manager: area_manager,
        priority: priority,
        information: information,
        time: new Date().getTime()
      }).then(function(){
        Materialize.toast("Your order was sent and it's waiting for approval", 4000);
        setTimeout(function(){
          window.location = "login";
        }, 4000);
      }).catch(function(error){
        console.log(error);
      })
    }
  })

  function writeToRealtime(id) {
    realtime.ref("Orders/" + id).set({
      id: id,
      status: "pending"
    }).then(function(){
      console.log("Succesfully written to Realtime");
    }).catch(function(error){
      console.log(error);
    })
  }
