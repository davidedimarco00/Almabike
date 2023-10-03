   <!-----<?php /*if(isSet($_GET["formmsg"])): ?>
  <div class="error">
      <h5 class="text-center">Attenzione!</h5>
      <p class="text-center"><?php echo $_GET["formmsg"]; */?></p>
  </div> --->

  
<?php
include 'mapContext.php'; // Include il file HTML private
if(isset($_SESSION["Nome"]) && isset($_SESSION["Cognome"])) {
    include 'privateContext.php'; // Include il file HTML private
    include 'publicContext.php';
    include 'myRoutes.php';
}
else {
   include 'publicContext.php';
}
?>