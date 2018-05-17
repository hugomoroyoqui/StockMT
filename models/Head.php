<?php /**
* class
*/
class Head {
  // Globar parameters
  //public $root = 'http://localhost:8080/StockMT'; // Ruta de Hugo
  public $root = 'http://localhost/StockMT'; // Ruta de Alex
  //public $root = 'http://stedcode.com/projects/StockMT'; // Ruta de Hugo
  public $title = "Flex StockMT";

  // Constructor takes "title" as parameter
  function __construct()
  {
  }
  function setTitle($title) {
    $this->title = $title;
    $this->build();
  }
  function build() {
    $headCode = '
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <!-- Website configuration -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <!-- External libraries -->
    <script src="https://www.gstatic.com/firebasejs/4.10.1/firebase.js"></script>
    <script src="https://www.gstatic.com/firebasejs/4.10.1/firebase-firestore.js"></script>
    <script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/css/materialize.min.css" media="all">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/js/materialize.min.js"></script>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" media="all">
    <script type="text/javascript" src="http://ajax.aspnetcdn.com/ajax/jquery.validate/1.7/jquery.validate.min.js"></script>
    <script defer src="https://use.fontawesome.com/releases/v5.0.8/js/all.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.21.0/moment.min.js"></script>
    <!-- Local libraries | Title -->
    <title>' . $this->title . '</title>
    <script src="' . $this->root . '/scripts/firebase_init.js"></script>
    <script src="' . $this->root . '/helpers/Schema.js"></script>
    <script src="' . $this->root . '/helpers/Utils.js"></script>

    <link href="' . $this->root . '/res/css/dragula.css" rel="stylesheet" media="all">
    <link href="' . $this->root . '/res/css/custom.css?' . mt_rand() . '" rel="stylesheet" media="all">
    <script>var globalEmail = null;</script>
    </head>
    ';
    echo $headCode;
  }
}
?>
