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
}).on('drop', function (el, container) {
  updateElement(el.id, container.id);
  //showNotification();

  });

  $(document).ready(function(){
    $('.modal').modal();
    loadPendingOrders();
    loadReadyOrders();
    loadPickedUpOrders();
  });

  function updateElement(id, status) {
    realtime.ref("Orders/" + id).update({
      status: status
    })
  }

  function appendProduct(id, product) {
    $("#toolcrib_wrapper").append(`
      <li class="collection-item avatar home-product">
      <div class="col s12 m5">
      <img src="` + Utils.imgThumb(product.picture) + `" height="80" class="materialboxed">
      <span class="description">Product Name</span>
      <p class="part_number">Part Number</p>
      </div>
      <div class="col s2">
      <p class="center-align">Category<br>Location</p>
      </div>
      <div class="col m2 hide-on-small"></div>
      <p class="col s2">4 requested </br> 10 in stock</p>
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

      <li class="collection-item avatar home-product">
      <div class="col s12 m5">
      <img src="` + Utils.imgThumb(product.picture) + `" height="80" class="materialboxed">
      <span class="description">Product Name</span>
      <p class="part_number">Part Number</p>
      </div>
      <div class="col s2">
      <p class="center-align">Category<br>Location</p>
      </div>
      <div class="col m2 hide-on-small"></div>
      <p class="col s2">4 requested </br> 10 in stock</p>
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

    function loadPendingOrders() {
      console.log("1");

      var orders = firebase.database().ref('Orders').orderByChild('status').equalTo('pending');
      orders.on('child_added', function(snapshot) {

        var description = snapshot.val().products[0].quantity + " " + snapshot.val().products[0].description;
        snapshot.val().products.forEach(function(e){description = description + ", " + e.quantity + " " + e.description})
        $("#pending").append(`
          <a id=` + snapshot.key + ` class="list-card js-member-droppable ui-droppable card blue-grey darken-2" style="display: none">
            <div class="card-content white-text">
              <p><b>` + description + `</b></p>
              <span>` + timeago().format(snapshot.val().time) + `</span>
              <span><br>Priority: ` + snapshot.val().priority + `</span>
            </div>
            <div class="card-action white-text">
              <span><b>By Alejandro Ríos:</b> 345351</span>
            </div>
          </a>
          `);
          $(".list-card").show(200);
      });
    }

    function loadReadyOrders() {
      console.log("2");

      var orders = firebase.database().ref('Orders').orderByChild('status').equalTo('ready');
      orders.on('child_added', function(snapshot) {
        var description = snapshot.val().products[0].quantity + " " + snapshot.val().products[0].description;
        snapshot.val().products.forEach(function(e){description = description + ", " + e.quantity + " " + e.description})
        $("#ready").append(`
          <a id=` + snapshot.key + ` class="list-card js-member-droppable ui-droppable card blue-grey darken-2" style="display: none">
            <div class="card-content white-text">
              <p><b>` + description + `</b></p>
              <span>` + timeago().format(snapshot.val().time) + `</span>
              <span><br>Priority: ` + snapshot.val().priority + `</span>
            </div>
            <div class="card-action white-text">
              <span><b>By Alejandro Ríos:</b> 345351</span>
            </div>
          </a>
          `);
          $(".list-card").show(200);
      });
    }

    function loadPickedUpOrders() {
      console.log("3");

      var orders = firebase.database().ref('Orders').orderByChild('status').equalTo('pickedup');
      orders.on('child_added', function(snapshot) {
        var description = snapshot.val().products[0].quantity + " " + snapshot.val().products[0].description;
        snapshot.val().products.forEach(function(e){description = description + ", " + e.quantity + " " + e.description})
        $("#pickedup").append(`
          <a id=` + snapshot.key + ` class="list-card js-member-droppable ui-droppable card blue-grey darken-2" style="display: none">
            <div class="card-content white-text">
              <p><b>` + description + `</b></p>
              <span>` + timeago().format(snapshot.val().time) + `</span>
              <span><br>Priority: ` + snapshot.val().priority + `</span>
            </div>
            <div class="card-action white-text">
              <span><b>By Alejandro Ríos:</b> 345351</span>
            </div>
          </a>
          `);
          $(".list-card").show(200);
      });
    }
