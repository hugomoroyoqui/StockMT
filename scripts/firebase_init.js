
  var config = {
    apiKey: "AIzaSyDbiBkchw3bILEqicQ4wsvZuNe-9hwAcpo",
    authDomain: "flex-stockmt.firebaseapp.com",
    databaseURL: "https://flex-stockmt.firebaseio.com",
    projectId: "flex-stockmt",
    storageBucket: "flex-stockmt.appspot.com",
    messagingSenderId: "848953107089"
  };
  firebase.initializeApp(config);
  var db = firebase.firestore();
  db.enablePersistence()
  .then(function() { })
  .catch(function(err) {
      console.log(err);
  });
