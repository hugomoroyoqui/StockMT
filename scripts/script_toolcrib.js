function showNotification() {

    if (Notification.permission !== "granted")
        Notification.requestPermission();
      else {
        var audio = new Audio('res/raw/plucky.mp3');

        var notification = new Notification('Notificación de prueba', {
          icon: 'res/img/flexLogo2.png',
          body: "¡Moviste una tarjeta!"
        });
        audio.play();
setTimeout(notification.close(), 500)
      }
}

dragula([document.querySelector('#pending'), document.querySelector('#ready'), document.querySelector('#pickedup')],{
}).on('drop', function (el) {
  showNotification();
  });

  $(document).ready(function(){
    $('.modal').modal();
  });

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
    $("#toolcrib_wrapper").append(`
      <li class="collection-item avatar home-product">
      <div class="col s12 m5">
      <img src="` + Utils.imgThumb(product.picture) + `" height="80" class="materialboxed">
      <span class="description">` + product.description + `</span>
      <p class="part_number">` + product.part_number +  `</p>
      </div>
      <div class="col s2">
      <p class="center-align">` + product.category + `<br> ` + product.location + `</p>
      </div>
      <div class="col m2 hide-on-small"></div>
      <p class="col s2">` + product.quantity + ` requested </br> ` + product.stock + ` in stock</p>
      <div class="col m2 hide-on-small"></div>
      <div class="col s12 m1">
      <form action="#">
       <p>
         <input type="checkbox" id="test5" />
         <label for="test5"></label>
       </p>
       </form>
      </div>
      </li>

      <li class="collection-item avatar home-product">
      <div class="col s12 m5">
      <img src="` + Utils.imgThumb(product.picture) + `" height="80" class="materialboxed">
      <span class="description">` + product.description + `</span>
      <p class="part_number">` + product.part_number +  `</p>
      </div>
      <div class="col s2">
      <p class="center-align">` + product.category + `<br> ` + product.location + `</p>
      </div>
      <div class="col m2 hide-on-small"></div>
      <p class="col s2">` + product.quantity + ` requested </br> ` + product.stock + ` in stock</p>
      <div class="col m2 hide-on-small"></div>
      <div class="col s12 m1">
      <form action="#">
       <p>
         <input type="checkbox" id="test6" />
         <label for="test6"></label>
       </p>
       </form>
      </div>
      </li>
      `);
    }
