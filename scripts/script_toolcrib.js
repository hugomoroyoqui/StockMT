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
