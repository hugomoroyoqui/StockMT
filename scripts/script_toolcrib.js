function showNotification() {


        var audio = new Audio('res/raw/plucky.mp3');

        audio.play();
}

dragula([document.querySelector('#pending'), document.querySelector('#ready'), document.querySelector('#pickedup')],{
}).on('drop', function (el, container) {
  updateElement(el.id, container.id);
  //showNotification();

  });

  $(document).ready(function(){
    $('.modal').modal();

    loadOrders();
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
         <input type="checkbox" id="check_` + id + `" />
         <label for="check_` + id + `"></label>
       </p>
       </form>
      </div>
      </li>
      `);
    }

    function loadOrders() {
      console.log("1");
      var ref = firebase.database().ref('Orders');
      ref.on('value', function(snapshot) {

          $("#pending").empty();
          $("#pickedup").empty();
          $("#ready").empty();
  snapshot.forEach(function(childSnapshot) {
      appendCard(childSnapshot);
  });
});

function appendCard(order) {
  var key = order.key;
  $("#" + order.val().status).append(`
    <a id=` + order.key + ` class="list-card js-member-droppable ui-droppable card blue-grey darken-2" onclick=openDialog("` + order.key +`")>
      <div class="card-content white-text">
        <p><b>` + generateDescription(order) + `</b></p>
        <span>` + timeago().format(order.val().time) + `</span>
        <span><br>Priority: ` + order.val().priority + `</span>
      </div>
      <div class="card-action white-text">
        <span><b>By Alejandro Ríos:</b> 15304031<br/>Folio: ####</span>
      </div>
    </a>
    `);
}

function generateDescription(order) {
  var description = order.val().products[0].quantity + " " + order.val().products[0].description;
  if(order.val().products.length > 1) {
    for (var i = 1; i < order.val().products.length; i++) {
    description = description + ", " + order.val().products[i].quantity + " " + order.val().products[i].description

  }
}
return description;
}

}

function openDialog(key) {
  var orderRef = firebase.database().ref('Orders/' + key);
  orderRef.once('value', function(snapshot) {
  var order = snapshot.val();
  populateDialog(snapshot.key, order);
});
}

function populateDialog(id, order) {
  $("#toolcrib_wrapper").empty();
  var i = 0;
  $("#cost_center").text(order.cost_center);
  $("#priority").text(order.priority);
  $("#date").text(timeago().format(order.time))
  if(order.information != " ") $("#additional_message").text(order.information);
  else $("#additional_message").hide(200);
  order.products.forEach(function(product){
    i++;
    appendProduct(i, product)
  })
  $('.materialboxed').materialbox();
  $('.modal').modal("open");
  $(".progress").hide(200);
}

function appendProduct(id, product) {
  $("#toolcrib_wrapper").append(`
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

      <div class="col s2">
        <p class="center-align">Location<br>` + product.location + `</p>
      </div>
      <div class="col s12 m3">
      <input type="checkbox" id="check_` + id + `" />
      <label for="check_` + id + `">` + product.quantity + ` requested</label>
      </div>
    </li>
    `);
}
