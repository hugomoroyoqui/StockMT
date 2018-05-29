document.body.style.backgroundImage = "url('res/img/research2.png')";

$(document).ready(function(){
  loadOrders();
})

function loadOrders() {
  var ref = firebase.database().ref('Orders').orderByChild('status').equalTo('ready');
  ref.on('value', function(snapshot) {
      $("#ready_to_pick_up").empty();
      if(snapshot.numChildren() > 0){
        snapshot.forEach(function(childSnapshot) {
          appendCard(childSnapshot);
        });
      } else {
        showNoOrders();
      }

})
}

function showNoOrders() {
  $("#ready_to_pick_up").append(`
    <div class="card grey lighten-4" style="display: none;">
      <div class="card-content black-text">
        <span class="items_title"><i class="material-icons left">update</i>No ready orders yet!</span>
      </div>
    </div>
    `);
    $(".card").show(200);
}

function appendCard(order) {
  $("#ready_to_pick_up").append(`
    <div class="card blue darken-2" style="display: none;">
      <div class="card-content white-text">
        <span class="items_title"><b>` + generateDescription(order) + `</b></span>
        <p></p>
        <p>` + timeago().format(order.val().time) + `</p>
      </div>
      <div class="card-action white-text">
        <span>To: Alejandro Ríos: 345351<br>Folio: ####</span>
      </div>
    </div>
    `);
    $(".card").show(200);
    showNotification();
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

function loadReadyOrders() {
  var orders = firebase.database().ref('Orders').orderByChild('status').equalTo('ready');
  orders.on('child_added', function(snapshot) {
    var description = "";
    snapshot.val().products.forEach(function(e){description = " " + e.quantity + " " + e.description + description + " "});
    console.log("3");
    $("#ready_to_pick_up").append(`
      <div class="card blue darken-2" style="display: none">
        <div class="card-content white-text">
          <span class="items_title"><b>` + description + `</b></span>
          <p></p>
          <p>` + timeago().format(new Date()) + `</p>
        </div>
        <div class="card-action white-text">
          <span>To: Alejandro Ríos: 345351</span>
        </div>
      </div>
      `);
      $(".card").show(200);
      showNotification();
  });
}

$("#btn_signIn").click(function(){
  var employee = $('#txtUserName').val();
  if (employee === "15304025" || employee=== "15304031" || employee==="15304002") { window.location = "?view=home"; }
  else { Materialize.toast("Incorrect Employee", 2000) }
})

if($('#ready_to_pick_up').not(':empty')) {

  } else {
    alert("No content");
  }

function showNotification() {

  var audio = new Audio('res/raw/plucky.mp3');
  audio.play();
}
