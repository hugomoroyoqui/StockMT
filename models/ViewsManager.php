<?php

/**
*
*/
class ViewsManager
{

  private $head;
  private $fileName;

  function __construct()
  {
    $this->head = new Head();
  }

  function setFileName($fileName) {
    $this->fileName = $fileName;
    if($fileName == "layout_login.html") {
      $this->generateSignupBody();
    } else {
      $this->generateHomeBody();
    }

  }

  function generateSignupBody(){
    echo '<body>';
    echo '<div class="container">';
    echo '<div class="row">';
    echo '<div id="main_container" class="col s12">';
    include './views/' . $this->fileName;
    echo '</div>';
    echo '</div>';
    echo '</div>';
    echo '</body>';
    echo '</html>';
  }

  function generateHomeBody() {
    echo '<body style="background-color: #EEEEEE;">';
    echo '<header>';
    include './views/layout_menu.html';
    echo '</header>';
    echo '<main style="background-color: #EEEEEE; ">';
    echo '<div class="container">';
    echo '<div class="row nobottommargin">';
    echo '<div id="main_container" class="col s12">';
    include './views/' . $this->fileName;
    echo '</div>';
    echo '</div>';
    echo '</div>';
    echo '</main>';
    include './views/layout_footer.html';
    echo '<script src="scripts/script_head.js"></script>';
    echo '</body>';
    echo '</html>';
  }

  # 2. Crear método con nombre loadNombreDeVista
  function loadLoginForm() {
    // Asignar el título del encabezado
    $this->head->setTitle("Login");
    // Asignar el nombre de la vista
    $this->setFileName('layout_login.html');
  }

  function loadHomeLayout()
  {
    $this->head->setTitle("Inicio");
    $this->setFileName("layout_home.html");
  }
}
?>
