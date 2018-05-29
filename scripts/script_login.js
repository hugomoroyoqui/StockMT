document.body.style.backgroundImage = "url('res/img/research2.png')";

$(document).ready(function(){
  loadReadyOrders();
})

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
