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

function showNotification() {

    if (Notification.permission !== "granted")
        Notification.requestPermission();
      else {
        var audio = new Audio('res/raw/plucky.mp3');

        var notification = new Notification('Available orders', {
          icon: 'res/img/flexLogo2.png',
          body: "¡New orders are available!"
        });
        audio.play();
setTimeout(notification.close(), 500)
      }
}
