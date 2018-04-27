<?php

class Router {

  private $viewsManager;

  function __construct(){
    $this->viewsManager = new ViewsManager();
  }


  function loadView($viewType){
    switch ($viewType) {

      # 1. Registrar el nombre de la URL desde donde se va a acceder

      case "login":
      # 2. Ver ViewsManager.php para el paso 2
      # 3. Llamar método previamente creado en el viewsManager y salir del switch
      $this->viewsManager->loadLoginForm();
      break;

      default:
      $this->viewsManager->loadHomeLayout();
      break;
    }
  }
}
?>
