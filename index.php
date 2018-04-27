<?php
require 'models/Head.php';
require 'models/Router.php';
require 'models/ViewsManager.php';

$router = new Router();

if(isset($_GET['view'])){
    $router->loadView($_GET['view']);
  } else {
    $router->loadView('');
  }
?>
